import React, { useState } from "react";
import logo from "../../assets/BabalEyeWear.png";
import LoginImage from "../../assets/AuthImage.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ✅ Define API URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Terms & Conditions");
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  }; // ✅ This closing brace was missing in the previous snippet

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 px-4 py-4">
      <div className="flex flex-col lg:flex-row justify-between bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col justify-center p-6 sm:p-8 w-full lg:w-1/2">
          <img
            src={logo}
            alt="BabalEyeWear"
            className="w-16 mb-2 object-contain"
          />

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-0.5">
            Create an account
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/login")}
              className="text-[#187A6B] cursor-pointer font-semibold hover:underline"
            >
              Log in
            </span>
          </p>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-xl">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-xl">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />

            <div className="flex flex-row gap-2 items-center text-xs sm:text-sm text-gray-700 my-0.5">
              <input
                type="checkbox"
                name="agreeTerms"
                id="terms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="appearance-none h-4 w-4 border border-gray-300 rounded cursor-pointer checked:bg-[#3A9587] checked:border-[#3A9587] relative after:content-['✓'] after:hidden checked:after:block after:absolute after:text-white after:text-xs after:font-bold after:left-0.75 after:-top-px"
              />
              <label htmlFor="terms" className="cursor-pointer select-none">
                I agree to the <span className="underline">Terms & Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#187A6B] cursor-pointer hover:bg-[#3A9587] text-white font-semibold py-2 text-sm rounded-lg transition duration-200 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create an account"}
            </button>

            <div className="flex flex-row items-center gap-3 my-1 text-gray-400 text-xs">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-gray-500 uppercase tracking-wider">
                Or register with
              </span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm font-medium w-full py-2 rounded-xl transition duration-200 border border-gray-200 flex items-center justify-center gap-2"
                onClick={() => setError("Social login not implemented")}
              >
                <FcGoogle className="text-xl" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm font-medium w-full py-2 rounded-xl transition duration-200 border border-gray-200 flex items-center justify-center gap-2"
                onClick={() => setError("Social login not implemented")}
              >
                <FaApple className="text-xl" />
                <span>Apple</span>
              </button>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex lg:w-1/2 bg-amber-700 relative">
          <img
            src={LoginImage}
            alt="Authentication visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;