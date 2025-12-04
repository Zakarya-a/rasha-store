import { shopifyFetch } from "../shopify";
import { GET_PRODUCT_BY_HANDLE } from "../queries";

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ product: any }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  if (!data.product) return null;

  return {
    ...data.product,
    images: data.product.images,      // KEEP edges structure
    variants: data.product.variants,  // KEEP edges structure
  };
}

