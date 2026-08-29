
import React, { useState } from "react";
import logo from "../assets/BabalEyeWear.png";
import LoginImage from "../assets/AuthImage.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");


    // Password check
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError("Passwords do not match!");

      return;
    }


    // Terms check
    if (!formData.agreeTerms) {

      setError(
        "You must agree to the Terms & Conditions"
      );

      return;
    }


    setIsLoading(true);


    try {

      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            firstName:
              formData.firstName,

            lastName:
              formData.lastName,

            email:
              formData.email,

            phone:
              formData.phone,

            password:
              formData.password,

          }),
        }
      );


      const data = await response.json();


      // Backend error
      if (!response.ok) {

        setError(
          data.message ||
          "Registration failed"
        );

        return;
      }


      // Success
      setMessage(
        "Registration successful!"
      );


      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });


      // Go login
      setTimeout(() => {

        navigate("/Auth/login");

      }, 1000);


    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to server"
      );

    } finally {

      setIsLoading(false);

    }
  };


  return (

    <div className="w-full flex justify-center items-center bg-gray-50 px-4 py-4">

      <div className="flex flex-col lg:flex-row justify-between bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">

        {/* FORM */}

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
              onClick={() =>
                navigate("/Auth/login")
              }
              className="text-[#187A6B] cursor-pointer font-semibold hover:underline"
            >
              Log in
            </span>

          </p>


          {/* ERROR */}

          {error && (

            <p className="text-red-500 text-sm mb-3">
              {error}
            </p>

          )}


          {/* SUCCESS */}

          {message && (

            <p className="text-green-600 text-sm mb-3">
              {message}
            </p>

          )}


          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >

            {/* FIRST / LAST NAME */}

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


            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />


            {/* PHONE */}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />


            {/* PASSWORD */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />


            {/* CONFIRM PASSWORD */}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#187A6B]"
            />


            {/* TERMS */}

            <div className="flex flex-row gap-2 items-center text-xs sm:text-sm text-gray-700 my-0.5">

              <input
                type="checkbox"
                name="agreeTerms"
                id="terms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="
                  appearance-none
                  h-4 w-4
                  border border-gray-300
                  rounded
                  cursor-pointer
                  checked:bg-[#3A9587]
                  checked:border-[#3A9587]
                  relative
                  after:content-['✓']
                  after:hidden
                  checked:after:block
                  after:absolute
                  after:text-white
                  after:text-xs
                  after:font-bold
                  after:left-0.75
                  after:-top-px
                "
              />

              <label
                htmlFor="terms"
                className="cursor-pointer select-none"
              >
                I agree to the{" "}
                <span className="underline">
                  Terms & Conditions
                </span>
              </label>

            </div>


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#187A6B] cursor-pointer hover:bg-[#3A9587] text-white font-semibold py-2 text-sm rounded-lg transition duration-200 disabled:opacity-50"
            >

              {isLoading
                ? "Creating account..."
                : "Create an account"}

            </button>


            {/* DIVIDER */}

            <div className="flex flex-row items-center gap-3 my-1 text-gray-400 text-xs">

              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-gray-500 uppercase tracking-wider">
                Or register with
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>

            </div>


            {/* SOCIAL */}

            <div className="flex flex-col sm:flex-row gap-2.5">

              <button
                type="button"
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm font-medium w-full py-2 rounded-xl transition duration-200 border border-gray-200 flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-xl" />
                <span>Google</span>
              </button>


              <button
                type="button"
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 text-sm font-medium w-full py-2 rounded-xl transition duration-200 border border-gray-200 flex items-center justify-center gap-2"
              >
                <FaApple className="text-xl" />
                <span>Apple</span>
              </button>

            </div>

          </form>

        </div>


        {/* IMAGE */}

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

