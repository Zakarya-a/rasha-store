// lib/shopify/getCollectionProducts.ts
import { shopifyFetch } from "@/lib/shopify";
const query = `
  query CollectionProducts($handle: String!) {
    collection(handle: $handle) {
      title
      handle
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCollectionProducts(handle: string) {
  const data: any = await shopifyFetch({
    query,
    variables: { handle },
  });

  if (!data.collection) return null;

  return {
    title: data.collection.title,
    handle: data.collection.handle,
    products: data.collection.products.edges.map((edge: any) => edge.node),
  };
}
