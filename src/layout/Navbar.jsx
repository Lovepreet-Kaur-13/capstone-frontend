import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getUser } from "../api/users";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    const syncUser = async () => {
      const data = await getUser(token);
      setUser(data);
    };
    syncUser();
  }, [token]);

  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>Frontend Template</p>
      </NavLink>
      <nav>
        <>
          <NavLink to="/products">Products</NavLink>
          {user?.is_admin && <NavLink to="/admin">Admin</NavLink>}
        </>
        {token ? (
          <>
            {/* changed this line */}
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/account/profile">Account</NavLink>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
