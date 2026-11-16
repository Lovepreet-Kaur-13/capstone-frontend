import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../auth/AuthContext";

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
    <article className="mx-auto my-8 grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
      <figure className="m-0 flex items-center justify-center rounded-lg bg-gray-100 p-6">
        <img
          src={product.image_url}
          alt={`Image of ${product.title}`}
          className="h-auto max-w-full"
        />
      </figure>

      <section>
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          {product.title}
        </h1>

        <p className="mb-4 text-3xl font-bold text-slate-900">
          ${Number(product.price).toFixed(2)}
        </p>

        <p className="mb-4 leading-relaxed text-slate-700">
          {product.description}
        </p>

        <p className="mb-4">
          <span className="font-semibold text-green-700">In Stock:</span>{" "}
          {product.stock}
        </p>

        <div className="mb-6 flex items-center gap-3 font-semibold">
          <span>Qty:</span>
          <div className="flex items-center overflow-hidden rounded-md border border-slate-300">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="h-9 w-9 bg-white text-lg hover:bg-slate-100"
            >
              −
            </button>
            <span className="w-10 border-x border-slate-300 text-center leading-9">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="h-9 w-9 bg-white text-lg hover:bg-slate-100"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => (token ? addToCart(product, qty) : navigate("/login"))}
          className="mb-3 w-full rounded-md bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Add to Cart
        </button>

        <button className="w-full rounded-md border border-blue-700 bg-white py-3 font-semibold text-slate-900 hover:bg-blue-50">
          ♡ Add to Wishlist
        </button>
      </section>
    </article>
  );
}
