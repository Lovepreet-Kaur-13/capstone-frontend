import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getUser } from "../api/users";
import { createProduct, getProducts } from "../api/products";
import { useAuth } from "../auth/AuthContext";

export default function Admin() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const syncUser = async (token) => {
    const data = await getUser(token);
    setUser(data);
  };
// syncOrders not syncProducts
  const syncProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    if (!token) return;
    syncUser(token);
    syncProducts();
  }, [token]);

  const onCreateProduct = async (formData) => {
    setError(null);
    setMessage(null);
        const product = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      brand: formData.get("brand"),
      imageUrl: formData.get("imageUrl"),
      price: Number(formData.get("price")),
      stockQuantity: Number(formData.get("stockQuantity")),
    };
    try {
      const created = await createProduct(token, product);
      setMessage(`Added "${created.title}"`);
      syncProducts();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) {
    return (
      <p>
        You must <Link to="/login">log in</Link> to view this page.
      </p>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!user.is_admin) {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <>
      <h1>Admin Dashboard</h1>
      <p>Signed in as {user.username}</p>

      <h2>Add a product</h2>
      <form action={onCreateProduct}>
        <label>
          Title
          <input type="text" name="title" required />
        </label>
        <label>
          Description
          <textarea name="description" required />
        </label>
        <label>
          Category
          <input type="text" name="category" required />
        </label>
        <label>
          Brand
          <input type="text" name="brand" required />
        </label>

        <label>
          Image URL
          <input type="url" name="imageUrl" />
        </label>
        <label>
          Price
          <input type="number" name="price" min="0" step="0.01" required />
        </label>
        <label>
          Stock quantity
          <input type="number" name="stockQuantity" min="0" defaultValue="0" />
        </label>
        <button>Add product</button>
        {message && <output>{message}</output>}
        {error && <output>{error}</output>}
      </form>

      <h2>All products ({products.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}