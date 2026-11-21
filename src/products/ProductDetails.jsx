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
    <>
      <article className="product">
        <figure>
          <img src={product.image_url} alt={`image of ${product.title}`} />
        </figure>
        <section>
          <h1>{product.title}</h1>
          <p>${product.price_cents}</p>
          <p>{product.description}</p>
          <p>{product.stock_quantity}</p>
        </section>

        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </article>
      <Cart />
    </>
  );
}
