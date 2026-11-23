import { Link } from "react-router";
import { useCart } from "../Cart/CartContext";

export default function ProductsList({ products }) {
  const { cart, addToCart } = useCart();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const cartItem = cart?.items?.find((item) => item.id === product.id);

        return (
          <li
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 text-center"
          >
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-40 object-contain rounded-lg mb-3"
            />

            <h3 className="font-semibold text-lg">
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </h3>

            <p
              className={
                product.stock_quantity > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {product.stock_quantity > 0
                ? `Stock: ${product.stock_quantity}`
                : "Out of Stock"}
            </p>

            <p className="font-medium mb-3">
              ${(product.price_cents / 100).toFixed(2)}
            </p>

            <button
              disabled={
                (cartItem?.quantity || 0) >= product.stock_quantity ||
                product.stock_quantity === 0
              }
              onClick={() => addToCart(product)}
              className={`w-full py-2 rounded-md text-white ${
                product.stock_quantity === 0 ? "bg-red-500" : "bg-teal-800"
              }`}
            >
              {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
