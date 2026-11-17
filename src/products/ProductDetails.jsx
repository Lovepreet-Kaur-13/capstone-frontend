import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import { useCart } from "../Cart/CartContext";
import Cart from "../Cart/Cart";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p className="p-8">Loading...</p>;

  return (
    <>
      <article className="product">
        <figure>
          <img src={product.image_url} alt={`image of ${product.title}`} />
        </figure>
        <section>
          <h1>{product.title}</h1>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <p>{product.stock_quantity}</p>
        </section>

        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </article>
      <Cart />
    </>
  );
}
