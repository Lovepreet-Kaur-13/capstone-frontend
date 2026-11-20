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
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${(order.total_cents / 100).toFixed(2)}</td>
                <td>
                  <button onClick={() => setOrderId(order.id)}>
                    Order Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
