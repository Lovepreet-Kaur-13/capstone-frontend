import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");

    try {
      await register({ firstName, lastName, username, password, email });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className=" flex justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6 text-teal-800">
          Register to DeckMart
        </h1>

        <form action={onRegister} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <label>
              First name
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                className="w-full"
              />
            </label>

            <label>
              Last name
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                className="w-full"
              />
            </label>
          </div>

          <label className="block">
            Username
            <input
              type="text"
              name="username"
              required
              placeholder="Enter username"
              className="w-full"
            />
          </label>

          <label className="block">
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email address"
              className="w-full"
            />
          </label>

          <label className="block">
            Password
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              className="w-full"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            Register
          </button>

          {error && (
            <output className="text-red-600 text-center block">{error}</output>
          )}
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600">
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}
