import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getUser } from "../api/users";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/deckMart.png";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

useEffect(() => {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}, [dark]);

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

  const navStyle = ({ isActive }) =>
    isActive
      ? "p-2 text-teal-700 border-b-2 border-teal-700 font-semibold"
      : "p-2 hover:text-teal-700";

  return (
    <header className="flex flex-col md:flex-row md:justify-between items-center gap-3 p-2">
      <div className="flex items-center font-bold text-lg shrink-0">
        <img
          src={logo}
          alt="DeckMart Logo"
          className="h-12 w-auto rounded-lg object-contain"
        />

        <NavLink to="/">
          Deck<span className="text-red-600">Mart</span>
        </NavLink>
      </div>

      <nav className="flex flex-wrap items-center gap-2">
        <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
          <i className={dark ? "fi fi-rr-sun" : "fi fi-rr-moon"}></i>{" "}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        <NavLink to="/products" className={navStyle}>
          Products
        </NavLink>

        {/* Show admin tools only to administrators. */}
        {user?.is_admin && (
          <NavLink to="/admin" className={navStyle}>
            Admin
          </NavLink>
        )}

        {token ? (
          <>
            {/* Show the cart only to regular users. */}
            {!user?.is_admin && (
              <NavLink to="/cart" className={navStyle}>
                Cart
              </NavLink>
            )}

            <NavLink to="/account/profile" className={navStyle}>
              Account
            </NavLink>

            {/* Sign out the current user. */}
            <button onClick={logout} className={navStyle}>
              Log Out
            </button>
          </>
        ) : (
          <NavLink to="/login" className={navStyle}>
            Log In
          </NavLink>
        )}
      </nav>
    </header>
  );
}
