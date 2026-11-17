import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductsList from "./ProductsList";
import Roster from "../layout/Roster";
import Cart from "../Cart/Cart";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const syncProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    syncProducts();
  }, []);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  const tryFilteredProduct = (formData) => {
    const productName = formData.get("productName").trim();
    setSearchProduct(productName);
  };

  const regex = new RegExp(searchProduct, "i");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesSearch =
      regex.test(product.title) ||
      regex.test(product.brand) ||
      regex.test(product.color) ||
      regex.test(product.category);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Roster
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

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

      <Cart />
    </>
  );
}
