import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getUser } from "../api/users";
import { createProduct, getProducts } from "../api/products";
import { getOrders } from "../api/orders";
import { useAuth } from "../auth/AuthContext";

export default function Admin() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [orderError, setOrderError] = useState(null);

  const syncUser = async (token) => {
    try {
      const data = await getUser(token);
      setUser(data);
    } catch (e) {
      setUserError(e.message);
    }
  };

  const syncProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const syncOrders = async (token) => {
    try {
      const data = await getOrders(token);
      setOrders(data);
    } catch (e) {
      setOrderError(e.message);
    }
  };

  useEffect(() => {
    if (!token) return;
    syncUser(token);
    syncProducts();
    syncOrders(token);
  }, [token]);

  const onCreateProduct = async (formData) => {
    setError(null);
    setMessage(null);
    const product = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      brand: formData.get("brand"),
      color: formData.get("color"),
      size: formData.get("size"),
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

  // Not logged in → send to login
  if (!token) return <Navigate to="/login" replace />;

  // Couldn't load the user
  if (userError) return <p>Could not load your account: {userError}</p>;

  // Logged in, user still loading
  if (!user) return <p>Loading...</p>;

  // Logged in but not an admin → send home
  if (!user.is_admin) return <Navigate to="/" replace />;

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
          Color
          <input type="text" name="color" required />
        </label>
        <label>
          Size
          <input type="text" name="size" required />
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
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Size</th>
            <th>Color</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.title} width="60" />
                ) : (
                  "-"
                )}
              </td>
              <td>{product.size}</td>
              <td>{product.color}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>{product.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Orders ({orders.length})</h2>
      {orderError && <p>Could not load orders: {orderError}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Shipping address</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.shipping_address}</td>
              <td>{order.discount_code ?? "-"}</td>
              <td>${Number(order.total).toFixed(2)}</td>
              <td>{order.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
