const API = import.meta.env.VITE_API;

/** The logged-in user's profile (GET /users/profile) */
export async function getUser(token) {
  const response = await fetch(API + "/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // The backend sends errors as plain text (e.g. "Invalid token.")
  if (!response.ok) {
    throw Error((await response.text()) || "Could not load user.");
  }

  return response.json();
}
