import { Link } from "react-router";
import CartItem from "./CartItem";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();

  // Check whether the user is currently on the checkout page.
  const isCheckout = location.pathname === "/checkout";

  const items = cart?.items || [];

  return (
    <section className="cart">
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
          <h3>Total: ${(total / 100).toFixed(2)}</h3>

          {/* Show the Complete Order link only when the user is NOT on the checkout page */}
          {!isCheckout && <Link to="/checkout">Complete Order</Link>}
        </>
      )}
    </section>
  );
}
