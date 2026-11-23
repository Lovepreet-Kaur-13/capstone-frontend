import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router";
import { getUser } from "../api/users";
import { useAuth } from "../auth/AuthContext";

export default function Admin() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (!token) return;
    const syncUser = async () => {
      try {
        const data = await getUser(token);
        setUser(data);
      } catch (e) {
        setUserError(e.message);
      }
    };
    syncUser();
  }, [token]);

  // Not logged in → send to login
  if (!token) return <Navigate to="/login" replace />;

  // Couldn't load the user
  if (userError) return <p>Could not load your account: {userError}</p>;

  // Logged in, user still loading
  if (!user) return <p>Loading...</p>;

  // Logged in but not an admin → send home
  if (!user.is_admin) return <Navigate to="/" replace />;

  return (
    <section className="w-full p-8">
      <h1>Admin Dashboard</h1>
      <p>Signed in as {user.username}</p>

      <nav>
        <NavLink to="/admin" end>
          Products
        </NavLink>{" "}
        | <NavLink to="/admin/orders">Orders</NavLink>
      </nav>

      {/* The current admin page (products or orders) renders here */}
      <Outlet />
    </section>
  );
}
