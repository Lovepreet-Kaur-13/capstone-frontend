import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";

export default function AdminOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    if (!token) return;
    const syncOrders = async () => {
      try {
        const data = await getOrders(token);
        setOrders(data);
      } catch (e) {
        setOrderError(e.message);
      }
    };
    syncOrders();
  }, [token]);

  return (
    <>
      <h2>Orders ({orders.length})</h2>
      {orderError && <p>Could not load orders: {orderError}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Shipping address</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.shipping_address}</td>
              <td>{order.discount_code ?? "-"}</td>
              <td>${Number(order.total).toFixed(2)}</td>
              <td>{order.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
