import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/BabalEyeWear.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Company", path: "/company" },
    { id: 4, name: "Services", path: "/services" },
    { id: 5, name: "Contact", path: "/contact" },
  ];
  return (
    <div className="fixed z-20 w-full top-0 left-0">
      <header className="flex justify-between items-center bg-white px-4 sm:px-6 lg:px-10 py-3 shadow-sm">
       <img src={logo} alt="Babal Eyewear" onClick={() => {
                                                   navigate("/");
                                                   window.scrollTo({ top: 0, behavior: "smooth" });}}
               className="w-16 ml-0 sm:ml-4 lg:ml-8 sm:w-20 lg:w-24 cursor-pointer transition-transform duration-300 hover:scale-105"/>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-5 lg:gap-8 text-black font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `relative py-1 transition-colors duration-300 hover:text-gray-600
                   after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                   after:h-[2px] after:bg-black after:transition-all after:duration-300
                   ${isActive ? "after:w-full font-semibold text-black" : "after:w-0 hover:after:w-full"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <input
            type="search"
            placeholder="Search..."
            className="bg-white rounded-full px-4 lg:px-5 py-2 border border-gray-300 outline-none
                       w-32 lg:w-48 transition-all duration-300 focus:w-40 lg:focus:w-64 focus:border-black"
          />

          <button onClick={() => navigate('/auth/register')} className="bg-[#187A6B] text-white px-5 lg:px-6 py-2 rounded-full hover:bg-[#12665A] transition-colors duration-300 cursor-pointer">
            Sign In
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 transition-colors duration-300 hover:bg-gray-100"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile nav panel */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out shadow-sm
                    ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 text-black font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive
                    ? "font-bold text-black border-b-2 border-black w-fit"
                    : "hover:text-gray-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="search"
              placeholder="Search..."
              className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-300 outline-none transition-colors duration-300 focus:border-black"
            />
            <button 
              onClick={() => {
                navigate('/auth/register');
                setMenuOpen(false);
              }} 
              className="bg-[#187A6B] text-white px-5 py-2 rounded-full hover:bg-[#12665A] transition-colors duration-300 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;