import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

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
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
}
