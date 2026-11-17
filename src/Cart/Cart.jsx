import CartItem from "./CartItem";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, total, addToCart, removeFromCart } = useCart();

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
        </>
      )}
    </section>
  );
}
