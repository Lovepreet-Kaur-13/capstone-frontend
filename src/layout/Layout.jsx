import { Outlet } from "react-router";
import Cart from "../Cart/Cart";

import Navbar from "./Navbar";

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
