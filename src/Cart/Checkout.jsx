import { useState } from "react";
import { useCart } from "./CartContext";
import Cart from "./Cart";
import Payments from "./Payments";

export default function Checkout() {
  const { total, completeOrder } = useCart();

  const [error, setError] = useState(null);

  // Saved before checkout, because the cart resets to $0 afterwards
  const [paidTotal, setPaidTotal] = useState(null);

  // Handles checkout form submission
  const placeOrder = async () => {
    setError(null);

    try {
      setPaidTotal(total);
      await completeOrder();
    } catch (err) {
      setError(err.message);
    }
  };

  if (paidTotal !== null) {
    return (
      <section>
        <h1>Thank You For Your Order!</h1>
        <p>Your payment has been processed successfully.</p>
        <p>Your order is now being prepared.</p>
        <h3>Total Paid: ${(paidTotal / 100).toFixed(2)}</h3>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
      {/* Checkout Card */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

        <form action={placeOrder} className="space-y-4">
          <label className="block">
            Shipping Address
            <input
              type="text"
              name="shippingAddress"
              required
              className="w-full border rounded p-2"
            />
          </label>

          <label className="block">
            Discount Code
            <input
              type="text"
              name="discountCode"
              className="w-full border rounded p-2"
            />
          </label>

          <Payments />

          <h3 className="text-lg font-semibold">
            Order Total: ${(total / 100).toFixed(2)}
          </h3>

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded"
          >
            Place Order
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </section>

      {/* Cart Card */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        <Cart />
      </section>
    </div>
  );
}
