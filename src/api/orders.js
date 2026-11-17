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
