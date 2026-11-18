import { useEffect, useState } from "react";
import { createProduct, getProducts } from "../api/products";
import { useAuth } from "../auth/AuthContext";

export default function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const syncProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    syncProducts();
  }, []);

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

  return (
    <>
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
    </>
  );
}
