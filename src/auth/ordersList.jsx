export default function OrderList({ orders }) {
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

              <button>Order Details</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
