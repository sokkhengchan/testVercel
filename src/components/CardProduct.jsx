import { TiStarFullOutline } from "react-icons/ti";
import { FaStarHalfStroke, FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CardProduct({
  thumbnail,
  category,
  title,
  description,
  price,
  rating,
  stock,
  id,
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      <Link
        to={`/products/${id}`}
        className="relative block bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
      >
        <img
          src={thumbnail}
          alt="Product image"
          className="w-full h-56 object-contain p-6 group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
          {category}
        </span>
      </Link>

      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
          {title}
        </h2>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            <TiStarFullOutline className="w-4 h-4" />
            <TiStarFullOutline className="w-4 h-4" />
            <TiStarFullOutline className="w-4 h-4" />
            <TiStarFullOutline className="w-4 h-4" />
            <FaStarHalfStroke className="w-4 h-4" />
          </div>
          <span className="text-gray-500 text-sm font-medium">({rating}/5)</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {description}
        </p>

        <div className="text-2xl font-bold text-gray-900 mb-4">${price}</div>

        <div className="flex items-center mb-5">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              stock > 0 ? "bg-emerald-500" : "bg-red-500"
            }`}
          ></div>
          <span
            className={`text-sm font-medium ${
              stock > 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="space-y-3">
          <button
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              stock > 0
                ? "bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={stock === 0}
            onClick={(e) => e.preventDefault()}
          >
            <FaCartPlus className="w-4 h-4" />
            Add to Cart
          </button>

          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={(e) => e.preventDefault()}
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}
