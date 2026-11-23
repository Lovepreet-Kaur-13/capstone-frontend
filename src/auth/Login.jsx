import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="flex justify-center px-4 pt-10">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-teal-800">
          Login to DeckMart
        </h1>

        <form action={onLogin} className="space-y-3">
          <label className="block">
            Username
            <input type="text" name="username" required className="w-full" />
          </label>

          <label className="block">
            Password
            <input
              type="password"
              name="password"
              required
              className="w-full"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            Login
          </button>

          {error && (
            <output className="text-red-600 text-center block">{error}</output>
          )}
        </form>

        <p className="text-center mt-4">
          Need an account?{" "}
          <Link to="/register" className="text-teal-600">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
