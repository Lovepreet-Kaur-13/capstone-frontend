import { useState } from "react";
import { useCart } from "./CartContext";
import Cart from "./Cart";
import Payments from "./Payments";

export default function Checkout() {
  // Cart state and checkout logic from context
  const { total, completeOrder } = useCart();

  // Success, error, and completion state
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);

  // Handles checkout form submission
  const placeOrder = async (formData) => {
    setMessage(null);
    setError(null);

    try {
      const shippingAddress = formData.get("shippingAddress");
      const discountCode = formData.get("discountCode");
      const paymentMethod = formData.get("paymentMethod");
      const cardType = formData.get("cardType");
      const cardholderName = formData.get("cardholderName");
      const cardNumber = formData.get("cardNumber");
      const expirationDate = formData.get("expirationDate");
      const cvv = formData.get("cvv");

      if (cardNumber.length < 16) {
        setError("Card number must contain at least 16 digits.");
        return;
      }

      if (cvv.length < 3) {
        setError("Please enter a valid CVV.");
        return;
      }

      console.log({
        shippingAddress,
        discountCode,
        paymentMethod,
        cardType,
        cardholderName,
        cardNumber,
        expirationDate,
        cvv,
      });

      await completeOrder();

      setOrderComplete(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (orderComplete) {
    return (
      <section className="thank-you">
        <h1>Thank You For Your Order!</h1>

        <p>Your payment has been processed successfully.</p>

        <p>Your order is now being prepared.</p>

        <h3>Total Paid: ${Number(total).toFixed(2)}</h3>
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

            <h3>Order Total: ${Number(total).toFixed(2)}</h3>

            <button type="submit">Place Order</button>

            {message && <p className="success">{message}</p>}

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
