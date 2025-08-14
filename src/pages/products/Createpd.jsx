import { useEffect, useState } from 'react';

export default function CreateProduct() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    categorySlug: '',
    image: ''
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all categories from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, categorySlug: data[0].name }));
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      cat => cat.name === form.categorySlug || cat.slug === form.categorySlug
    );

    if (!selectedCategory) {
      setMessage('❌ Invalid category selected.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: Number(form.price),
          categoryId: selectedCategory.id,
          images: [form.image],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Product created successfully!');
        setForm({
          title: '',
          description: '',
          price: '',
          categorySlug: categories[0]?.name || '',
          image: ''
        });
      } else {
        setMessage('❌ Failed to create product: ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-gray-200"
        noValidate
      >
        <h2 className="text-4xl font-bold text-center text-gray-800">Create New Product</h2>

        {message && (
          <p
            className={`text-center font-medium px-4 py-2 rounded-lg ${
              message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </p>
        )}

        {/* Input fields with consistent styling */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-5 py-3.5 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-5 py-3.5 placeholder-gray-500 resize-none
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
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
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          />

          <select
            name="categorySlug"
            value={form.categorySlug}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-5 py-3.5 bg-white text-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>
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
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          />
        </div>

        {form.image && (
          <div className="w-full flex justify-center mt-6">
            <img
              src={form.image}
              alt="Preview"
              className="max-h-60 w-auto object-contain rounded-xl border border-gray-300 shadow-md transition-all duration-200"
              loading="lazy"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-4 rounded-xl
            shadow-lg transition-colors duration-200 transform hover:scale-105"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}  