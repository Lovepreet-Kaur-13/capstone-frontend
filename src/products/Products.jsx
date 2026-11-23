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
      <div className="max-w-8xl mx-auto px-8 py-4">
        <h2 className="text-2xl font-bold text-center mb-4 -teal-800">
          Browse Our Playing Cards Collection
        </h2>

        <form
          action={tryFilteredProduct}
          className="flex flex-col sm:flex-row gap-2 mb-4 "
        >
          <input
            type="text"
            name="productName"
            placeholder="Search for a Product..."
            className="flex-1 shadow-lg"
          />

          <button
            type="submit"
            className="h-10 px-4 bg-teal-800 text-white rounded flex items-center justify-center"
          >
            Search
          </button>
        </form>

        <img
          src="https://images.unsplash.com/photo-1604345250885-11f528eec3ff?q=80&w=1219&auto=format&fit=crop"
          alt="Playing Cards Banner"
          className="w-full h-52 object-cover rounded-lg mb-6"
        />

        <section className="flex flex-col lg:flex-row gap-4">
          <Roster
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="flex-1">
            <ProductsList products={filteredProducts} />
          </div>

          <Cart />
        </section>
      </div>
    </>
  );
}
