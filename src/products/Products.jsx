import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductsList from "./ProductsList";
import Cart from "../Cart/Cart";
import { useCart } from "../Cart/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const syncProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    syncProducts();
  }, []);

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      <h1>Products</h1>
      <ProductsList products={products} />
    </>
  );
}
