import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getUser } from "../api/users";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/deckMart.png";

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
    <header className="flex justify-between p-2 ">
      <div className="flex items-center font-bold text-lg">
        <img
          src={logo}
          alt="DeckMart Logo"
          className="h-12 w-auto rounded-lg object-contain"
        />

        <NavLink to="/">
          Deck<span className="text-red-600">Mart</span>
        </NavLink>
      </div>

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
