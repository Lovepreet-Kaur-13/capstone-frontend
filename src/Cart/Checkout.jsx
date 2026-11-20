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
  const placeOrder = async (formData) => {
    setError(null);

    const cardNumber = formData.get("cardNumber");
    const cvv = formData.get("cvv");

    if (cardNumber.length < 16) {
      setError("Card number must contain at least 16 digits.");
      return;
    }

    if (cvv.length < 3) {
      setError("Please enter a valid CVV.");
      return;
    }

    try {
      const orderTotal = total;
      await completeOrder();
      setPaidTotal(orderTotal);
    } catch (err) {
      setError(err.message);
    }
  };

  if (paidTotal !== null) {
    return (
      <section className="thank-you">
        <h1>Thank You For Your Order!</h1>
        <p>Your payment has been processed successfully.</p>
        <p>Your order is now being prepared.</p>
        <h3>Total Paid: ${(paidTotal / 100).toFixed(2)}</h3>
      </section>
    );
  }

  return (
    <>
      <section className="checkout">
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

            <Payments />

            <h3>Order Total: ${(total / 100).toFixed(2)}</h3>

            <button type="submit">Place Order</button>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </section>

      <div className="checkout-cart">
        <Cart />
      </div>
    </>
  );
}
