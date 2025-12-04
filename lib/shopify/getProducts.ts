// lib/shopify/getProducts.ts

import { shopifyFetch } from "../shopify";
import { GET_ALL_PRODUCTS } from "../queries";

export async function getAllProducts(limit: number = 20) {
  const data = await shopifyFetch<{
    products: { edges: { node: any }[] }
  }>({
    query: GET_ALL_PRODUCTS,
    variables: {
      first: limit,
    },
  });

  const products = data.products.edges.map((edge: any) => ({
    ...edge.node,
  }));

  return products;
}

