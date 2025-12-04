// lib/shopify/getCollections.ts
import { shopifyFetch } from "@/lib/shopify";

const query = `
  {
    collections(first: 20) {
      edges {
        node {
          id
          handle
          title
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export async function getCollections() {
  const data = await shopifyFetch<{ collections: any }>({ query });
  return data.collections.edges.map((edge: any) => edge.node);
}

