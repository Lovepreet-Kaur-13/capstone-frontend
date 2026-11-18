import { useEffect, useState } from "react";
import { deleteOrder, getAllOrders } from "../api/orders";
import { useAuth } from "../auth/AuthContext";

const isCanceled = (order) => order.canceled === true;

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderError, setOrderError] = useState(null);
  const [message, setMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const syncOrders = async () => {
    try {
      const data = await getAllOrders(token);
      setOrders(data);
    } catch (e) {
      setOrderError(e.message);
    }
  };

  useEffect(() => {
    if (!token) return;
    syncOrders();
  }, [token]);

  const onDeleteOrder = async (order) => {
    if (!window.confirm(`Delete order #${order.id}? This can't be undone.`)) {
      return;
    }

    setOrderError(null);
    setMessage(null);
    setDeletingId(order.id);
    try {
      await deleteOrder(token, order.id);
      setOrders((current) => current.filter((o) => o.id !== order.id));
      setMessage(`Deleted order #${order.id}`);
    } catch (e) {
      setOrderError(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <h2>Orders ({orders.length})</h2>
      {message && <p>{message}</p>}
      {orderError && <p>{orderError}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Shipping address</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Completed</th>
            <th>Canceled</th>
            <th>Actions</th>
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
              <td>{isCanceled(order) ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={() => onDeleteOrder(order)}
                  disabled={deletingId === order.id}
                >
                  {deletingId === order.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
