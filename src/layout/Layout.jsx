import { Outlet } from "react-router";

import Navbar from "./Navbar";
import { useCart } from "../Cart/CartContext";
import Cart from "../Cart/Cart";

export default function Layout() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </main>
    </>
  );
}
