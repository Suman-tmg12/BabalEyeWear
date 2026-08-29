import React, { useState } from "react";
import logo from "../assets/BabalEyeWear.png";
import LoginImage from "../assets/AuthImage.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 px-4 py-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row justify-between bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">
        
        {/* Left Side (Form) */}
        <div className="flex flex-col justify-center p-6 sm:p-10 w-full lg:w-1/2">
          {/* Logo */}
          <img
            src={logo}
            alt="BabalEyeWear"
            className="w-24 mb-6 object-contain"
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Login
          </h2>

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-xl">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />

            <div className="text-gray-500 text-xs sm:text-sm cursor-pointer hover:underline text-left">
              Forgot Password ?
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#187A6B] cursor-pointer hover:bg-[#3A9587] text-white font-medium py-3 text-sm rounded-xl transition duration-200 disabled:opacity-50 mt-1"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Dynamic Divider */}
            <div className="flex flex-row items-center gap-3 my-2 text-gray-400 text-xs">
              <div className="h-px flex-1 bg-gray-200"></div>
              <span className="text-gray-400 text-xs">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Social Logins */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm font-medium w-full py-2.5 rounded-xl transition duration-200 border border-gray-200 flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-xl" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm font-medium w-full py-2.5 rounded-xl transition duration-200 border border-gray-200 flex items-center justify-center gap-2"
              >
                <FaApple className="text-xl" />
                <span>Apple</span>
              </button>
            </div>
          </form>

          {/* Footer Register Link */}
          <p className="text-xs sm:text-sm text-gray-600 mt-6 text-center sm:text-left">
            Don’t have an Register ?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="text-gray-900 font-bold hover:underline bg-transparent border-none cursor-pointer p-0 inline"
            >
              Register for free
            </button>
          </p>
        </div>
        {/* Left Side End */}

        {/* Right Side (Image) */}
        <div className="hidden lg:flex lg:w-1/2 relative ">
          <img
            src={LoginImage}
            alt="Authentication visual"
            className="w-full h-full object-cover "
          />
        </div>
        {/* Right Side End */}
        
      </div>
    </div>
  );
}

export default Login;