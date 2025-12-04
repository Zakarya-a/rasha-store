// lib/shopify.ts

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-07/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error("Shopify API Errors:", json.errors);
    throw new Error("Shopify API Error");
  }

  return json.data;
}
console.log("ENV CHECK → DOMAIN:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log("ENV CHECK → TOKEN:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);


