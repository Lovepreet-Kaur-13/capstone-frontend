const API = import.meta.env.VITE_API;

/* Fetch orders for login user */
export async function getOrdersByUserId(token) {
  try {
    const response = await fetch(API + "/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/* Fetch specific order by orderId */
export async function getOrderByOrderId(orderId, token) {
  try {
    const response = await fetch(API + "/orders/" + orderId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/* Fetch products list by orderId */
export async function getProductsByOrderId(orderId, token) {
  try {
    const response = await fetch(API + "/orders/" + orderId + "/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
const API = import.meta.env.VITE_API;

/** Fetches the logged-in user's orders */
export async function getOrders(token) {
  const response = await fetch(API + "/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw Error(await response.text());
  return await response.json();
}

/** Creates a new order for the logged-in user */
export async function createOrder(token, order) {
  const response = await fetch(API + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw Error(await response.text());
  return await response.json();
}

/** Adds a product to an existing order */
export async function addProductToOrder(token, orderId, productId, quantity) {
  const response = await fetch(API + `/orders/${orderId}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) throw Error(await response.text());
  return await response.json();
}