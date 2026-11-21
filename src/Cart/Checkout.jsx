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
    <>
      <section>
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

          <Payments />

          <h3>Order Total: ${(total / 100).toFixed(2)}</h3>

          <button type="submit">Place Order</button>

          {error && <p>{error}</p>}
        </form>
      </section>

      <div>
        <Cart />
      </div>
    </>
  );
}
