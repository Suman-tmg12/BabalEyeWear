import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/BabalEyeWear.png";
import { FiShoppingCart } from "react-icons/fi";
import { isLoggedIn, getUser, getDisplayName, logout } from "../utils/auth";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Company", path: "/company" },
  { id: 4, name: "Services", path: "/services" },
  { id: 5, name: "Contact", path: "/contact" },
];

// Same check the route guards use, so the navbar and the pages always agree
const readAuth = () => ({ loggedIn: isLoggedIn(), user: getUser() });

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [auth, setAuth] = useState(readAuth);
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: connect to your real cart. It was a hardcoded 1, which showed a fake badge.
  const cartCount = 0;

  useEffect(() => {
    const refreshAuth = () => setAuth(readAuth());

    // Login/logout in this tab (authChange) or in another tab (storage)
    window.addEventListener("authChange", refreshAuth);
    window.addEventListener("storage", refreshAuth);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authChange", refreshAuth);
      window.removeEventListener("storage", refreshAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout(); // clears token + user and fires authChange
    setAuth(readAuth());
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/Auth/Login", { replace: true });
  };

  const goToProfile = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/UserProfile");
  };

  // Redirect to the search page with the typed query
  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setMenuOpen(false); // close mobile menu if open
  };

  const displayName = getDisplayName(auth.user) || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="fixed z-20 w-full top-0 left-0">
      <header className="flex justify-between items-center bg-white px-4 sm:px-6 lg:px-10 py-3 shadow-sm">
        {/* Logo */}
        <img
          src={logo}
          alt="Babal Eyewear"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-16 ml-0 sm:ml-4 lg:ml-8 sm:w-20 lg:w-24 cursor-pointer transition-transform duration-300 hover:scale-105"
        />

        {/* Desktop nav links */}
        <nav className="hidden md:flex gap-5 lg:gap-8 text-black font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `relative py-1 transition-colors duration-300 hover:text-gray-650
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
        <div className="hidden md:flex items-center gap-5">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search frames"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              enterKeyHint="search"
              className="bg-white rounded-full px-4 lg:px-5 py-2 border border-gray-300 outline-none
                         w-32 lg:w-48 transition-all duration-300 focus:w-40 lg:focus:w-64 focus:border-[#187A6B]"
            />
          </form>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => console.log("Desktop Cart clicked")}
          >
            <FiShoppingCart className="hover:text-[#187A6B] transition-colors duration-300" size={25} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#187A6B] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile circle when logged in, Sign In button otherwise */}
          {auth.loggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-label="Open account menu"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-[#187A6B] text-white flex items-center justify-center font-bold cursor-pointer hover:bg-[#12665A] transition-colors duration-300 shadow-sm select-none"
              >
                {initial}
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-30"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800 truncate">{displayName}</p>
                    {auth.user?.email && (
                      <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                    )}
                  </div>
                  <button
                    role="menuitem"
                    onClick={goToProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    My Profile
                  </button>
                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/Auth/Login")}
              className="bg-[#187A6B] text-white px-5 lg:px-6 py-2 rounded-full hover:bg-[#12665A] transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu button / wrapper */}
        <div className="flex items-center gap-4 md:hidden">
          <div
            className="relative cursor-pointer"
            onClick={() => console.log("Mobile Cart clicked")}
          >
            <FiShoppingCart className="hover:text-[#187A6B] transition-colors duration-300" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#187A6B] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </div>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 transition-colors duration-300 hover:bg-gray-100"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile nav panel */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out shadow-sm
                    ${menuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
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

          <div className="flex flex-col gap-3 pt-2">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search frames"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                enterKeyHint="search"
                className="w-full bg-white rounded-full px-4 py-2 border border-gray-300 outline-none transition-colors duration-300 focus:border-[#187A6B]"
              />
            </form>

            {auth.loggedIn ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={goToProfile}
                  className="w-full bg-[#187A6B] text-white py-2 rounded-full hover:bg-[#12665A] transition-colors duration-300 cursor-pointer text-center"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition-colors duration-300 cursor-pointer text-center"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/Auth/Login");
                  setMenuOpen(false);
                }}
                className="w-full bg-[#187A6B] text-white py-2 rounded-full hover:bg-[#12665A] transition-colors duration-300 cursor-pointer text-center"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;