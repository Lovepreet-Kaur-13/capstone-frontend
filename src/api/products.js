const API = import.meta.env.VITE_API;

/** Fetch all product from API */
export async function getProducts() {
  try {
    const response = await fetch(API + "/products");
    console.log(response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
