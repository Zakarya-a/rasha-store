import { getCollectionProducts } from "@/lib/shopify/getCollectionProducts";

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const handle = params.handle;

  const data = await getCollectionProducts(handle);

  // If no collection or no products → return something safe
  if (!data || !data.products || !Array.isArray(data.products)) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold mb-2">Collection Not Found</h1>
        <p className="text-gray-600">This collection does not exist or has no products.</p>
      </div>
    );
  }

  const products = data.products;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">{data.title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <a
            key={product.id}
            href={`/products/${product.handle}`}
            className="border p-4 rounded hover:shadow"
          >
            <img
              src={product.images.edges[0]?.node.url}
              alt={product.title}
              className="mb-3"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600">
              {product.priceRange.minVariantPrice.amount}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}


