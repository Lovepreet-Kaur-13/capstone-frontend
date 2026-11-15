import { useParams } from "react-router";
import { getProducts } from "../api/products";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  //const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts(id)
      .then(setProduct)
      .catch((e) => setError(e.message));
  }, [id]);

  if (!product) return error ? <p role="alert">{error}</p> : <p>Loading...</p>;

  return (
    <article className="product">
      <h1>{product.title}</h1>
      <p>{product.price}</p>
      <p>{product.image_url}</p>
      <p>{product.description}</p>
      <p>{product.stock}</p>
      <p>{product.quantity}</p>
      {token ? <button>Add to Cart</button> : <p></p>}
      {error && <p role="alert">{error}</p>}
    </article>
  );
}
