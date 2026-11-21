const API = import.meta.env.VITE_API;

/** Fetches the logged-in user's own orders. */
export async function getOrders(token) {
  const response = await fetch(API + "/orders", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // The backend sends errors as plain text (e.g. "Invalid token.")
  if (!response.ok)
    throw Error((await response.text()) || "Could not load orders.");
  return response.json();
}

/** Fetches the logged-in user's orders. */
export async function getOrdersByUserId(token) {
  return getOrders(token);
}

/** Fetches every order. Requires an admin token. */
export async function getAllOrders(token) {
  const response = await fetch(API + "/orders/all", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw Error(await response.text());
  return response.json();
}

/** Fetches the products in an order. */
export async function getProductsByOrderId(orderId, token) {
  const response = await fetch(API + "/orders/" + orderId + "/products", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error(await response.text());
  return response.json();
}

/** Deletes a canceled order. Requires an admin token. */
export async function deleteOrder(token, id) {
  const response = await fetch(API + "/orders/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error(await response.text());
}
