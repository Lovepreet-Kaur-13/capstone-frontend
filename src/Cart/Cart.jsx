import { Link } from "react-router";
import CartItem from "./CartItem";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();

  // Check whether the user is currently on the checkout page.
  const isCheckout = location.pathname === "/checkout";

  const items = cart?.items || [];

  return (
    <section className="w-full lg:w-72 bg-white rounded-xl shadow-lg h-fit">
      <h2 className="text-xl font-bold text-center p-4">
        <i className="fi fi-rr-shopping-cart"></i> Shopping Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 p-4">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 p-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>

          <div className="border-t p-4 space-y-3">
            <h3 className="text-xl font-bold text-center">
              Total: ${(total / 100).toFixed(2)}
            </h3>

            {/* Show the Complete Order link only when the user is NOT on the checkout page */}
            {!isCheckout && (
              <Link
                to="/checkout"
                className="block w-full text-center bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-900"
              >
                Checkout
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}
