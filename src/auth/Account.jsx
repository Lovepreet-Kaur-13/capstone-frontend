import { useEffect, useState } from "react";
import { getUser } from "../api/users";
import { useAuth } from "./AuthContext";

export default function Accounts() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  const syncUsers = async (token) => {
    const data = await getUser(token);
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    syncUsers(token);
  }, [token]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{user.username} profile</h1>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
    </>
  );
}
