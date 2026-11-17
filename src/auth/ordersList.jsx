import { useState } from "react";
import OrderItems from "./OrderItems";

export default function OrderList({ orders, token }) {
  const [orderId, setOrderId] = useState(null);

  if (orderId) {
    return (
      <OrderItems orderId={orderId} token={token} setOrderId={setOrderId} />
    );
  }

  return (
    <>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order #{order.id}</p>
              <p>Total: ${order.total}</p>

              <button onClick={() => setOrderId(order.id)}>
                Order Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
