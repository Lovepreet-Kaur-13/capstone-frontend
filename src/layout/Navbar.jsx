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

    // Load the current user's profile.
    const syncUser = async () => {
      const data = await getUser(token);
      setUser(data);
    };

    syncUser();
  }, [token]);

  return (
    <header id="navbar" className="flex justify-between p-4">
      <NavLink id="brand" to="/">
        Frontend Template
      </NavLink>

      <nav className="flex items-center gap-4">
        <NavLink to="/products">Products</NavLink>

        {/* Show admin tools only to administrators. */}
        {user?.is_admin && <NavLink to="/admin">Admin</NavLink>}

        {token ? (
          <>
            {/* Show the cart only to regular users. */}
            {!user?.is_admin && <NavLink to="/cart">Cart</NavLink>}

            <NavLink to="/account/profile">Account</NavLink>

            {/* Sign out the current user. */}
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <NavLink to="/login">Log In</NavLink>
        )}
      </nav>
    </header>
  );
}
