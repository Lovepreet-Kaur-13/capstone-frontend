export default function Roster({
  products,
  selectedCategory,
  setSelectedCategory,
}) {
  //DFS algorithm
  // Store the count for each category
  const categoryCounts = {};
  // Store category names for rendering
  const categories = [];

  // Count products by category
  for (let i = 0; i < products.length; i++) {
    const category = products[i].category;

    if (!categoryCounts[category]) {
      categoryCounts[category] = 0;
      categories.push(category);
    }

    categoryCounts[category] += 1;
  }

  return (
    <nav className="w-full lg:w-56 bg-white rounded-xl shadow-md p-4 h-fit">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>

      <ul className="space-y-2">
        <li
          className={`cursor-pointer p-2 rounded ${
            selectedCategory === null
              ? "bg-teal-800 text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All Products ({products.length})
        </li>

        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded ${
              category === selectedCategory
                ? "bg-teal-800 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category} ({categoryCounts[category]})
          </li>
        ))}
      </ul>
    </nav>
  );
}
