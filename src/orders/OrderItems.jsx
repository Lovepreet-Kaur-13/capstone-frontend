import { useEffect, useState } from "react";
import { getProductsByOrderId } from "../api/orders";

export default function OrderItems({ orderId, token, setOrderId }) {
  const [products, setProducts] = useState([]);

  // Load the products for the selected order.
  const syncProducts = async (orderId, token) => {
    const data = await getProductsByOrderId(orderId, token);
    setProducts(data);
  };

  useEffect(() => {
    if (token) {
      syncProducts(orderId, token);
    }
  }, [orderId, token]);

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-xl font-semibold">Ordered Product History</h3>

        {/* Return to the orders list. */}
        <button
          onClick={() => setOrderId(null)}
          className="text-sm text-white-600"
        >
          ← Back to Orders
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2 text-left">Product</th>
              <th className="border px-3 py-2 text-left">Price</th>
              <th className="border px-3 py-2 text-left">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-3 py-2">{product.title}</td>
                <td className="border px-3 py-2">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="border px-3 py-2">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
