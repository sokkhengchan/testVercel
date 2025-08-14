import { useEffect, useState } from "react";
import CardProduct from "./components/CardProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [slug, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    { label: "All", value: "all" },
    { label: "Beauty", value: "beauty" },
    { label: "Fragrance", value: "fragrances" },
    { label: "Furniture", value: "furniture" },
    { label: "Electronics", value: "electronics" },
    { label: "Shoes", value: "shoes" },
    { label: "Clothes", value: "clothes" },
  ];

  useEffect(() => {
    const url =
      slug === "all"
        ? `${import.meta.env.VITE_BASE_URL}/api/v1/products/`
        : `${import.meta.env.VITE_BASE_URL}/api/v1/products/?categorySlug=${slug}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const productsArray = Array.isArray(data) ? data : data.products || [];
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, [slug]);

  const handleSearch = () => {
    const lower = searchTerm.toLowerCase();

    const result = products.filter(
      (p) =>
        p.title?.toLowerCase().includes(lower) ||
        p.category?.name?.toLowerCase().includes(lower)
    );

    setFilteredProducts(result);
  };

  const selectCategory = (value) => {
    setCategory(value);
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-12 pb-20">
      <main className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => selectCategory(value)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  slug === value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-full font-semibold transition"
              aria-label="Search products"
            >
              Search
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                category={product.category?.name || "N/A"}
                price={product.price}
                stock={product?.stock || 0}
                thumbnail={product.images?.[0] || ""}
                rating={product?.rating || 4.5}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-20">
              No products found.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
