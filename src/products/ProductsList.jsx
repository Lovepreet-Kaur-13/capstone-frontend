import { Link } from "react-router";
import { useCart } from "../Cart/CartContext";

export default function ProductsList({ products }) {
  const { cart, addToCart } = useCart();

  return (
    <ul>
      {products.map((product) => {
        const cartItem = cart?.items?.find((item) => item.id === product.id);

        return (
          <li key={product.id}>
            <figure>
              <img
                src={product.image_url}
                alt={`Image of ${product.title}`}
                width={100}
              />
            </figure>

            <section>
              <h2>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </h2>

              <p>
                {product.stock_quantity > 0
                  ? `Available: ${product.stock_quantity}`
                  : "Out of Stock"}
              </p>

              <p>${(product.price_cents / 100).toFixed(2)}</p>

              <button
                className={
                  product.stock_quantity === 0
                    ? "bg-red-500 text-white"
                    : "bg-teal-800 text-white hover:bg-green-800"
                }
                disabled={
                  (cartItem?.quantity || 0) >= product.stock_quantity ||
                  product.stock_quantity === 0
                }
                onClick={() => addToCart(product)}
              >
                {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </section>
          </li>
        );
      })}
    </ul>
  );
}
