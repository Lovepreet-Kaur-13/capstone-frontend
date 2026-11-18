// Base URL of your backend. Change this line to match how your other
// api files define it.
const API = import.meta.env.VITE_API;

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// The backend sends errors as plain text, e.g. res.status(400).send("...")
async function handleError(response, fallback) {
  const text = await response.text();
  throw Error(text || fallback);
}

/** The logged-in user's own orders (GET /orders) */
export async function getOrders(token) {
  const response = await fetch(`${API}/orders`, {
    headers: authHeaders(token),
  });
  if (!response.ok) await handleError(response, "Could not load orders.");
  return response.json();
}

/**
 * The logged-in user's own orders (GET /orders), used by Account.jsx.
 * The backend works out the user from the token, so only the token is sent.
 * Works whether it's called as getOrdersByUserId(token)
 * or getOrdersByUserId(userId, token): the token is the last argument.
 */
export async function getOrdersByUserId(...args) {
  const token = args[args.length - 1];
  return getOrders(token);
}

/** Admin: every order (GET /orders/all) */
export async function getAllOrders(token) {
  const response = await fetch(`${API}/orders/all`, {
    headers: authHeaders(token),
  });
  if (!response.ok) await handleError(response, "Could not load orders.");
  return response.json();
}

/** Create an order (POST /orders) */
export async function createOrder(token, order) {
  const response = await fetch(`${API}/orders`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(order),
  });
  if (!response.ok) await handleError(response, "Could not create order.");
  return response.json();
}

/** Add a product to an order (POST /orders/:id/products) */
export async function addProductToOrder(token, orderId, productId, quantity) {
  const response = await fetch(`${API}/orders/${orderId}/products`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) await handleError(response, "Could not add product.");
  return response.json();
}

/** Products in an order (GET /orders/:id/products) */
export async function getProductsByOrderId(orderId, token) {
  const response = await fetch(`${API}/orders/${orderId}/products`, {
    headers: authHeaders(token),
  });
  if (!response.ok) await handleError(response, "Could not load products.");
  return response.json();
}

/** Admin: delete a canceled order (DELETE /orders/:id) */
export async function deleteOrder(token, id) {
  const response = await fetch(`${API}/orders/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!response.ok) await handleError(response, "Could not delete order.");
}
