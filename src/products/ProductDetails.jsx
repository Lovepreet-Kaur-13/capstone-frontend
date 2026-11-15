import { useParams } from "react-router";
import { getProduct } from "../api/products";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const { token } = useAuth();

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
    <article className="product">
      <h1>{product.title}</h1>
      <p>{product.price}</p>
      <p>{product.image_url}</p>
      <p>{product.description}</p>
      <p>{product.stock}</p>
      <p>{product.quantity}</p>
      {token ? <button>Add to Cart</button> : <p></p>}
    </article>
  );
}
