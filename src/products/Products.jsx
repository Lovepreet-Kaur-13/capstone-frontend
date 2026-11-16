import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductsList from "./ProductsList";
import Roster from "../layout/Roster";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  return (
    <>
      <Roster
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <h1>Products</h1>
      <ProductsList products={filteredProducts} />
    </>
  );
}
