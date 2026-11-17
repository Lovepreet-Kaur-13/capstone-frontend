import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { getUser } from "../api/users";
import { createProduct, getProducts } from "../api/products";
import { addProductToOrder, createOrder, getOrders } from "../api/orders";
import { useAuth } from "../auth/AuthContext";

export default function Admin() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [orderMessage, setOrderMessage] = useState(null);

  const syncUser = async (token) => {
    const data = await getUser(token);
    setUser(data);
  };

  const syncProducts = async () => {
    const data = await getProducts();
    setProducts(data);
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

  const onCreateOrder = async (formData) => {
    setOrderError(null);
    setOrderMessage(null);

    const productId = Number(formData.get("productId"));
    const quantity = Number(formData.get("quantity"));
    const product = products.find((p) => p.id === productId);
    if (!product) {
      setOrderError("Please choose a product.");
      return;
    }

    const order = {
      date: formData.get("date"),
      shippingAddress: formData.get("shippingAddress"),
      discountCode: formData.get("discountCode") || null,
      total: Number((Number(product.price) * quantity).toFixed(2)),
      completed: formData.get("completed") === "on",
    };

    try {
      // Step 1: create the order
      const created = await createOrder(token, order);
      // Step 2: add the product to it
      await addProductToOrder(token, created.id, productId, quantity);
      setOrderMessage(`Created order #${created.id}`);
      syncOrders(token);
    } catch (e) {
      setOrderError(e.message);
    }
  };

  // Not logged in → send to login
  if (!token) return <Navigate to="/login" replace />;

  // Logged in, user still loading
  if (!user) return <p>Loading...</p>;

  // Logged in but not an admin → send home
  if (!user.is_admin) return <Navigate to="/" replace />;

  const today = new Date().toISOString().slice(0, 10);

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
          color
          <input type="text" name="color" required />
        </label>
        <label>
          size
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
            <th>Color</th>
            <th>Size</th>
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
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.size}</td>
              <td>${product.price}</td>
              <td>{product.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add an order</h2>
      <form action={onCreateOrder}>
        <label>
          Product
          <select name="productId" required>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title} (${product.price})
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="1"
            defaultValue="1"
            required
          />
        </label>
        <label>
          Date
          <input type="date" name="date" defaultValue={today} required />
        </label>
        <label>
          Shipping address
          <input type="text" name="shippingAddress" required />
        </label>
        <label>
          Discount code
          <input type="text" name="discountCode" />
        </label>
        <label>
          <input type="checkbox" name="completed" />
          Completed
        </label>
        <button>Add order</button>
        {orderMessage && <output>{orderMessage}</output>}
        {orderError && <output>{orderError}</output>}
      </form>

      <h2>Orders ({orders.length})</h2>
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
              <td>${order.total}</td>
              <td>{order.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
