const API = import.meta.env.VITE_API;

/** Fetch all product from API */
export async function getProducts() {
  try {
    const response = await fetch(API + "/products");
    if (!response.ok) throw Error(await response.text());
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

/** Fetches a single product by its ID. */
export async function getProduct(id) {
  const response = await fetch(API + "/products/" + id);
  // Errors come back as plain text (e.g. "Product not found")
  if (!response.ok) throw Error(await response.text());
  return response.json();
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
