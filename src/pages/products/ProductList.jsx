import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    image: ''
  });

  const API_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setMessage("✅ Product deleted successfully!");
      setError("");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      setMessage("");
      setError("❌ Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      categoryId: product.category?.id?.toString() || '',
      image: product.images?.[0] || ''
    });
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setForm({
      title: '',
      description: '',
      price: '',
      categoryId: '',
      image: ''
    });
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingProduct) return;

    try {
      const updateData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        images: [form.image]
      };

      const response = await axios.put(
        `${API_URL}/products/${editingProduct.id}`,
        updateData
      );

      if (response.data) {
        setMessage("✅ Product updated successfully!");
        setError("");
        
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { 
                ...p, 
                title: form.title,
                description: form.description,
                price: Number(form.price),
                images: [form.image],
                category: categories.find(cat => cat.id === Number(form.categoryId)) || p.category
              }
            : p
        ));
        
        handleCancel();
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      setMessage("");
      setError("Failed to update product: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // If editing, show the edit form
  if (editingProduct) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleUpdate}
          className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-gray-200"
          noValidate
        >
          <h2 className="text-4xl font-bold text-center text-gray-800">Edit Product</h2>

          {message && (
            <div className="text-center font-medium px-4 py-2 rounded-lg bg-green-100 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="text-center font-medium px-4 py-2 rounded-lg bg-red-100 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-3.5 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />

            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-5 py-3.5 placeholder-gray-500 resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full rounded-xl border border-gray-300 px-5 py-3.5 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-3.5 bg-white text-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-5 py-3.5 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {form.image && (
            <div className="w-full flex justify-center mt-6">
              <img
                src={form.image}
                alt="Preview"
                className="max-h-60 w-auto object-contain rounded-xl border border-gray-300 shadow-md transition-all duration-200"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image';
                }}
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl
                shadow-lg transition-colors duration-200 transform hover:scale-105"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold text-lg py-4 rounded-xl
                shadow-lg transition-colors duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Main product list view - keeping your original table style
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      {message && (
        <div className="mb-4 rounded bg-green-100 text-green-800 px-4 py-3 text-center font-semibold">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-800 px-4 py-3 text-center font-semibold">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600 text-lg py-20">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-20">No products found.</div>
      ) : (
        <div className="overflow-x-auto rounded shadow border border-gray-200">
          <table className="w-full table-auto text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b border-gray-300">Image</th>
                <th className="p-3 border-b border-gray-300">Title</th>
                <th className="p-3 border-b border-gray-300">Description</th>
                <th className="p-3 border-b border-gray-300">Price</th>
                <th className="p-3 border-b border-gray-300">Category</th>
                <th className="p-3 border-b border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b border-gray-200">
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/64"}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                      }}
                    />
                  </td>
                  <td className="p-3 border-b border-gray-200 font-medium max-w-xs truncate">
                    {product.title}
                  </td>
                  <td className="p-3 border-b border-gray-200 max-w-xs truncate text-gray-600">
                    {product.description || 'No description'}
                  </td>
                  <td className="p-3 border-b border-gray-200 font-semibold text-green-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="p-3 border-b border-gray-200 text-gray-600">
                    {product.category?.name || 'No category'}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                          text-white font-medium px-4 py-2 rounded-lg shadow-md transform transition-all duration-200 
                          hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        aria-label={`Edit ${product.title}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-200"></div>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                          text-white font-medium px-4 py-2 rounded-lg shadow-md transform transition-all duration-200 
                          hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                        aria-label={`Delete ${product.title}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-200"></div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}