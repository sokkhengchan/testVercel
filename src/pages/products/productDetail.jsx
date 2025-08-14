import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product.title) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl">Loading product...</p>
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.title}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-300"
            src={Array.isArray(product.images) ? product.images[0] : product.images}
          />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
              {product.category?.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex mb-4 items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < product?.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.078 3.307a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.078 3.307c.3.921-.755 1.688-1.538 1.118L10 13.347l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.078-3.307a1 1 0 00-.364-1.118L3.577 8.734c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.078-3.307z" />
                </svg>
              ))}
              <span className="text-sm ml-2 text-gray-600">
                {product.rating || "0"}/5
              </span>
            </div>

            {/* Description */}
            <p className="leading-relaxed mb-4">{product.description}</p>

            {/* Stock */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Price + Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="title-font font-bold text-2xl text-gray-900">
                ${product.price}
              </span>
              <button className="flex-grow md:flex-none text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded">
                Add to Cart
              </button>
              <button className="w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 rounded-full hover:bg-gray-300">
                <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
