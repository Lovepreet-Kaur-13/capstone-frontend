import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Products from "./products/Products";
import Error404 from "./Error404";
import Account from "./auth/Account";
import ProductDetails from "./products/ProductDetails";
import Admin from "./admin/admin";
import Cart from "./Cart/Cart";
import Checkout from "./Cart/Checkout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/profile" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
