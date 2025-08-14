import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../Firebase/firebase.config";
import { signInWithPopup } from "firebase/auth";

export default function Register() {
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getPasswordStrength = (password) => {
    if (password.length >= 12 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return "Strong";
    } else if (password.length >= 8) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const payload = {
      name: form.username,
      email: form.email,
      password: form.password,
      avatar: profileUrl || "https://api.lorem.space/image/face?w=150&h=150",
    };

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        alert("❌ Registration failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (error) {
      alert("❌ Network error: " + error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`✅ Welcome ${user.displayName || "user"}!`);
      navigate("/login");
    } catch (error) {
      alert("❌ Social login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 space-y-8"
      >
        <h2 className="text-center text-4xl font-extrabold text-gray-800">
          Create Account
        </h2>

        {/* Username */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <User className="text-gray-400" size={20} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Mail className="text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 relative focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Lock className="text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password Strength */}
        <p className="text-sm font-semibold">
          Strength:{" "}
          <span
            className={
              getPasswordStrength(form.password) === "Strong"
                ? "text-green-600"
                : getPasswordStrength(form.password) === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {getPasswordStrength(form.password)}
          </span>
        </p>

        {/* Confirm Password */}
        <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 relative focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Lock className="text-gray-400" size={20} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition"
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Profile URL */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Profile Image URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          {profileUrl && (
            <img
              src={profileUrl}
              alt="Profile Preview"
              className="mx-auto mt-4 h-28 w-28 rounded-full object-cover border-2 border-indigo-400 shadow-lg"
            />
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-xl shadow-md"
        >
          Register
        </button>

        {/* Social Login */}
        <p className="text-center text-gray-500 text-sm">or continue with</p>

        <div className="flex justify-center gap-6">
          <button
            type="button"
            onClick={() => handleSocialLogin(googleProvider)}
            title="Login with Google"
            className="p-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition"
          >
            <FcGoogle size={28} />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(facebookProvider)}
            title="Login with Facebook"
            className="p-3 rounded-full border border-gray-300 shadow-sm text-blue-700 hover:shadow-md transition"
          >
            <FaFacebook size={28} />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(githubProvider)}
            title="Login with GitHub"
            className="p-3 rounded-full border border-gray-300 shadow-sm text-gray-900 hover:shadow-md transition"
          >
            <FaGithub size={28} />
          </button>
        </div>
      </form>
    </div>
  );
}
