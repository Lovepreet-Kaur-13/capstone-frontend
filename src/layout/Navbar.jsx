import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>Frontend Template</p>
      </NavLink>
      <nav>
        <>
          <NavLink to="/account/profile">Account</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
