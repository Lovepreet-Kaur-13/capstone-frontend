import { useEffect, useState } from "react";
import { getProductsByOrderId } from "../api/orders";

export default function OrderItems({ orderId, token, setOrderId }) {
  const [products, setProducts] = useState([]);

  const syncProducts = async (orderId, token) => {
    const data = await getProductsByOrderId(orderId, token);
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    if (token) {
      syncProducts(orderId, token);
    }
  }, [orderId, token]);

  return (
    <>
      <h3>Products</h3>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>{product.title}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setOrderId(null)}>Clear Order Details</button>
    </>
  );
}
