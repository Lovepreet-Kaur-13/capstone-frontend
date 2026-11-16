import { Link } from "react-router";
export default function ProductsList({ products }) {
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
            <p> {product.price}</p>
            <button>Add to Cart</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
