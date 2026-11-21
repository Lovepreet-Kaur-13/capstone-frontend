import { Link } from "react-router";

import { useCart } from "../Cart/CartContext";

export default function ProductsList({ products }) {
  const { addToCart } = useCart();

  return (
    <ul className="products">
      {products.map((product) => (
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
              <Link to={`/products/${product.id}`}> {product.title}</Link>
            </h2>
            <p>${(product.price_cents / 100).toFixed(2)}</p>

            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
