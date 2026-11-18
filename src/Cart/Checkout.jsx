import { useState } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "../auth/AuthContext";
import { createOrder, addProductToOrder } from "../api/orders";

export default function Checkout() {
  // Get cart data and helper functions from context
  const { cart, total, clearCart } = useCart();

  // Logged-in user's token
  const { token } = useAuth();

  // State for success and error messages
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  /**
   * Create an order and attach every cart item to it
   */
  const submitOrder = async (formData) => {
    // Clear previous messages
    setError(null);
    setMessage(null);

    try {
      // Build order object from form data
      const order = {
        date: new Date().toISOString().split("T")[0],
        shippingAddress: formData.get("shippingAddress"),
        discountCode: formData.get("discountCode") || null,
        total,
        completed: true,
      };

      // Create order in database
      const createdOrder = await createOrder(token, order);

      /**
       * DSA: Array Traversal
       *
       * Visit every item in the cart once.
       *
       * Time Complexity:
       * O(n)
       * where n = number of cart items
       */
      for (let i = 0; i < cart.length; i++) {
        await addProductToOrder(
          token,
          createdOrder.id,
          cart[i].id,
          cart[i].quantity
        );
      }

      // Empty cart after successful order
      clearCart();

      // Success message
      setMessage(`Order #${createdOrder.id} completed`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Nothing to checkout
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <>
      <h2>Checkout</h2>

      {/* 
        DSA: Array Traversal
        Render every cart item once
        O(n)
      */}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} x {item.quantity}
          </li>
        ))}
      </ul>

      <h3>Total: ${Number(total).toFixed(2)}</h3>

      <form action={submitOrder}>
        <label>
          Shipping Address
          <input
            type="text"
            name="shippingAddress"
            required
          />
        </label>

        <label>
          Discount Code
          <input
            type="text"
            name="discountCode"
          />
        </label>

        <button>Place Order</button>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
    </>
  );
}