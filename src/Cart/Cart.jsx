import { useNavigate } from "react-router";
import CartItem from "./CartItem";
import { useCart } from "./CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, total, addToCart, removeFromCart } = useCart();

  // true when viewing /checkout
  const isCheckout = location.pathname === "/checkout";

  return (
    <section className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
          <h3>Total: ${Number(total).toFixed(2)}</h3>
          {/* <button onClick={completeOrder}>Complete Order</button>*/}
          {/* Go to checkout page */}
          {!isCheckout && (
            <button onClick={() => navigate("/checkout")}>
              Complete Order
            </button>
          )}
        </>
      )}
    </section>
  );
}
