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
