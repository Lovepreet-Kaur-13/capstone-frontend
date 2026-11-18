import CartItem from "./CartItem";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, total, updateQuantity, removeFromCart, completeOrder } =
    useCart();

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  const items = cart.items || [];

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

          <h3>Total: ${Number(total).toFixed(2)}</h3>

          <button onClick={completeOrder}>Complete Order</button>
        </>
      )}
    </section>
  );
}
