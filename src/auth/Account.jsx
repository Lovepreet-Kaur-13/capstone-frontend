import { useEffect, useState } from "react";
import { getUser } from "../api/users";
import { useAuth } from "./AuthContext";
import { getOrdersByUserId } from "../api/orders";
import OrderList from "../orders/OrdersList";

export default function Account() {
  const { token } = useAuth();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load the current user's profile.
  const syncUser = async (token) => {
    const data = await getUser(token);
    setUser(data);
  };

  // Load the current user's orders.
  const syncOrders = async (token) => {
    const data = await getOrdersByUserId(token);
    setOrders(data);
  };

  useEffect(() => {
    if (token) {
      syncUser(token);
      syncOrders(token);
    }
  }, [token]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {user.first_name} {user.last_name}
        </h1>

        <p className="text-gray-600">@{user.username}</p>

        <p>{user.email}</p>

        {/* Show the user's account role. */}
        <p className="mt-2 text-sm">Role: {user.is_admin ? "Admin" : "User"}</p>
      </div>

      <OrderList orders={orders} token={token} />
    </section>
  );
}
