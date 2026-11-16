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

/** Fetches a single book by its ID. */
export async function getProduct(id) {
  const response = await fetch(API + "/products/" + id);
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}
/** Creates a new product. Requires an admin token. */
export async function createProduct(token, product) {
  const response = await fetch(API + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw Error(await response.text());
  return await response.json();
}