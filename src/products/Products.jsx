import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductsList from "./ProductsList";
import Cart from "../Cart/Cart";
import { useCart } from "../Cart/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const [searchProduct, setSearchProduct] = useState("");

  const syncProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    syncProducts();
  }, []);

  const tryFilteredProduct = (formData) => {
    const productName = formData.get("productName").trim();
    setSearchProduct(productName);
  };

  const regex = new RegExp(searchProduct, "i");

  const filteredProducts = products.filter(
    (product) =>
      regex.test(product.title) ||
      regex.test(product.brand) ||
      regex.test(product.color) ||
      regex.test(product.category),
  );

  return (
    <>
      <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      <h1>Products</h1>

      <form action={tryFilteredProduct}>
        <input
          type="text"
          name="productName"
          placeholder="Search for a Product..."
        />

        <button type="submit">Search</button>
      </form>

      <ProductsList products={filteredProducts} />
    </>
  );
}
