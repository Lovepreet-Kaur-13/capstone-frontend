import { useState } from "react";
import { useCart } from "./CartContext";
import Cart from "./Cart";

export default function Checkout() {
  // Get cart information and checkout logic from context
  const { total, completeOrder } = useCart();

  // UI messages
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handles checkout form submission
   */
  const placeOrder = async (formData) => {
    setMessage(null);
    setError(null);

    try {
      // Optional for future use
      const shippingAddress = formData.get("shippingAddress");

      const discountCode = formData.get("discountCode");

      // Complete the user's active cart
      await completeOrder();

      setMessage("Order placed successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="checkout">
      {/* LEFT COLUMN */}
      <div className="checkout-form">
        <h2>Checkout</h2>

        <form action={placeOrder}>
          <label>
            Shipping Address
            <input type="text" name="shippingAddress" required />
          </label>

          <label>
            Discount Code
            <input type="text" name="discountCode" />
          </label>

          <h3>Total: ${Number(total).toFixed(2)}</h3>

          {/* Actual checkout action */}
          <button type="submit">Place Order</button>

          {message && <p className="success">{message}</p>}

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {/* RIGHT COLUMN */}
      <div className="checkout-cart">
        <Cart />
      </div>
    </section>
  );
}
