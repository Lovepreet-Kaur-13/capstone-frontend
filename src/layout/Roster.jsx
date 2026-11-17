export default function Roster({
  products,
  selectedCategory,
  setSelectedCategory,
}) {
  // Store the count for each category
  const categoryCounts = {};
  // Store category names for rendering
  const categories = [];

  // Count products by category
  for (let i = 0; i < products.length; i++) {
    const category = products[i].category;
    // First time seeing this category
    if (!categoryCounts[category]) {
      categoryCounts[category] = 0;
      categories.push(category);
    }
    // Increment category count
    categoryCounts[category] += 1;
  }

  return (
    <nav className="roster">
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={
              "category" + (category === selectedCategory ? " selected" : "")
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category} ({categoryCounts[category]})
          </li>
        ))}
      </ul>
    </nav>
  );
}
