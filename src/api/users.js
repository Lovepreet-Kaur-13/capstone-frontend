const API = import.meta.env.VITE_API;

export async function getUser(token) {
  try {
    const response = await fetch(API + "/users/profile", {
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
