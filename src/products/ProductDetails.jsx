import { useParams } from "react-router";
import { getProduct } from "../api/products";

import { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import Cart from "../Cart/Cart";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const syncProduct = async (id) => {
    try {
      const data = await getProduct(id);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    syncProduct(id);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <article className="bg-white rounded-xl shadow-md p-4">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-58 object-contain rounded-lg"
          />

          <section className="space-y-2">
            <h2 className="text-2xl font-bold">{product.title}</h2>

            <p className="text-xl font-semibold text-teal-800">
              ${(product.price_cents / 100).toFixed(2)}
            </p>

            <p className="text-gray-600">{product.description}</p>

            <p>
              <strong>Size:</strong> {product.size}
            </p>

            <p
              className={
                product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {product.stock_quantity > 0
                ? `Stock: ${product.stock_quantity}`
                : "Out of Stock"}
            </p>

            <button
              disabled={product.stock_quantity === 0}
              onClick={() => addToCart(product)}
              className={`w-full py-2 rounded text-white ${
                product.stock_quantity === 0 ? "bg-red-500" : "bg-teal-800"
              }`}
            >
              {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </section>
        </div>
      </article>

      <Cart />
    </div>
  );
}
