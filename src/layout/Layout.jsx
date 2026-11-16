import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Cart from "../Cart/Cart";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Cart />
    </>
  );
}
