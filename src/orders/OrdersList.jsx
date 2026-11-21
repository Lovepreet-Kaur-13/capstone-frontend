import { useState } from "react";
import OrderItems from "./OrderItems";

export default function OrderList({ orders, token }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Show only completed orders.
  const completedOrders = orders.filter((order) => order.completed);

  // Show the selected order's products.
  if (selectedOrderId) {
    return (
      <OrderItems
        orderId={selectedOrderId}
        token={token}
        setOrderId={setSelectedOrderId}
      />
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>

      {completedOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Order #</th>
              <th className="border px-3 py-2 text-left">Total</th>
              <th className="border px-3 py-2 text-left">Details</th>
            </tr>
          </thead>

          <tbody>
            {completedOrders.map((order) => (
              <tr key={order.id}>
                <td className="border px-3 py-2">{order.id}</td>

                <td className="border px-3 py-2">
                  ${(order.total_cents / 100).toFixed(2)}
                </td>

                <td className="border px-3 py-2">
                  {/* View the products in this order. */}
                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="text-white-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
