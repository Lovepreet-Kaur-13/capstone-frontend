import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductsList from "./ProductsList";

export default function Products() {
  const [products, setProducts] = useState([]);

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
      <h1>Products</h1>
      <ProductsList products={products} />
    </>
  );
}
