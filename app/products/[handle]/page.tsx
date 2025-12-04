import { getProductByHandle } from "@/lib/shopify/getProductByHandle";
import Image from "next/image";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const firstImage = product.images?.edges?.[0]?.node;

  return (
    <div className="max-w-5xl mx-auto p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Product Image */}
        {firstImage && (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            width={800}
            height={800}
            className="rounded-lg"
          />
        )}

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-semibold mb-4">{product.title}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mt-6 flex flex-col gap-3">
            {product.variants.edges.map((variant: any) => (
              <button
                key={variant.node.id}
                className="border p-3 rounded-lg hover:bg-black hover:text-white transition"
              >
                {variant.node.title} — €{variant.node.price.amount}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





