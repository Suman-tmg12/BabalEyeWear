import { useState, useRef } from "react";
import "./App.css";
import logo from "./assets/BabalEyeWearLogo.png";
import slider1 from "./assets/SliderPic/slider1.png";
import slider2 from "./assets/SliderPic/slider2.png";
import slider3 from "./assets/SliderPic/slider3.png";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import product1 from "./assets/Products/product1.png";
import product2 from "./assets/Products/product2.png";
import product3 from "./assets/Products/product3.png";
import product4 from "./assets/Products/product4.png";

import frames1 from "./assets/Frames_Pic/cateye.png";
import frames2 from "./assets/Frames_Pic/Clubmaster.png";
import frames3 from "./assets/Frames_Pic/Round.png";
import frames4 from "./assets/Frames_Pic/Squares.png";
import frames5 from "./assets/Frames_Pic/Squares.png";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // References for custom Swiper navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Company", path: "/company" },
    { id: 4, name: "Services", path: "/services" },
    { id: 5, name: "Contact", path: "/contact" },
  ];

  // 8 Total Products
  const products = [
    { id: 1, name: "Transparent White Square Sunglass", image: product1, oldPrice: 2000, price: 1700 },
    { id: 2, name: "Gold Double Bridge Sunglass", image: product2, oldPrice: 2200, price: 1870 },
    { id: 3, name: "Black Matte Round Frame", image: product3, oldPrice: 2200, price: 1870 },
    { id: 4, name: "Classic Tortoise Shell Frame", image: product4, oldPrice: 2200, price: 1870 },
    { id: 5, name: "Silver Metal Wireframe Eyeglasses", image: product1, oldPrice: 2100, price: 1785 },
    { id: 6, name: "Vintage Aviator Dark Sunglasses", image: product2, oldPrice: 2500, price: 2125 },
    { id: 7, name: "Retro Cat Eye Oversized Frame", image: product3, oldPrice: 2300, price: 1955 },
    { id: 8, name: "Urban Clear Wayfarer Eyeglasses", image: product4, oldPrice: 1900, price: 1615 },
  ];

  const frames = [
    { image: frames1, name: "Cat Eye" },
    { image: frames2, name: "Clubmaster" },
    { image: frames3, name: "Round" },
    { image: frames4, name: "Square" },
    { image: frames5, name: "EyeGlasses"}
  ];

  return (
    <>
      {/* Header */}
      <div className="fixed z-20 w-full top-0 left-0">
        <header className="flex justify-between items-center bg-white px-4 sm:px-6 lg:px-10 py-3 shadow-sm">
          <img
            src={logo}
            alt="Babal Eyewear"
            className="w-16 ml-0 sm:ml-4 lg:ml-8 sm:w-20 lg:w-24 cursor-pointer transition-transform duration-300 hover:scale-105"
          />

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-5 lg:gap-8 text-black font-medium">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="relative py-1 transition-colors duration-300 hover:text-gray-600
                           after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                           after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {item.name}
              </Link>
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

            <button className="bg-black text-white px-5 lg:px-6 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
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
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="transition-colors duration-300 hover:text-gray-600"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-300 outline-none transition-colors duration-300 focus:border-black"
              />
              <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                Sign In
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="pt-20 sm:pt-24">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {[slider1, slider2, slider3].map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full max-w-[1200px] mx-auto px-4 sm:px-6
                           h-[220px] xs:h-[280px] sm:h-[360px] md:h-[460px] lg:h-[600px]
                           overflow-hidden transition-all duration-300"
              >
                <div className="w-full h-full rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] overflow-hidden">
                  <img
                    src={slide}
                    alt="Babal Eyewear"
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Power Lenses Banner */}
      <div className="w-full flex justify-center px-4 mt-8 sm:mt-[50px] mb-10">
        <div
          className="w-full max-w-[1200px] bg-white rounded-3xl sm:rounded-full
                     flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-between
                     border border-gray-200 px-4 sm:px-2 py-4 sm:py-0 sm:h-20
                     shadow-black/10 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="flex gap-4 sm:gap-6 p-2 sm:ml-4 items-center justify-center text-center sm:text-left">
            <span className="material-symbols-outlined shrink-0">eyeglasses_2</span>
            <span>
              <p className="text-blue-700 text-xs tracking-tight font-semibold">
                POWER UP YOUR FRAMES
              </p>
              <p className="text-sm sm:text-base">High-quality power lenses for any frames</p>
            </span>
          </div>

          <div
            className="group h-[50px] sm:h-[55px] rounded-full border border-gray-400 bg-white
                       w-full sm:w-[250px] flex items-center justify-between pl-[20px] sm:pl-[25px] pr-[7px]
                       cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <div className="text-sm font-medium">Shop Power lenses</div>

            <div
              className="bg-blue-500 rounded-full h-[32px] w-[32px] sm:h-[35px] sm:w-[35px]
                         flex items-center justify-center text-white shrink-0
                         group-hover:bg-white group-hover:text-blue-500
                         group-hover:h-[38px] group-hover:w-[38px] sm:group-hover:h-[40px] sm:group-hover:w-[40px]
                         transition-all duration-300 ease-in-out"
            >
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clearance Sale Section */}
      <div className="text-[22px] sm:text-[25px] text-center ">
        BABALEYEWEAR CLEARANCE SALE
      </div>
      <div className="text-center text-[32px] sm:text-[40px] font-bold mb-6">
        FLAT 15% OFF
      </div>

      {/* Product Slider Section */}
      <div className="relative w-full max-w-[1200px] mx-auto px-10 sm:px-12 lg:px-14 mb-16">
        <button
          ref={prevRef}
          aria-label="Previous products"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white
                     flex items-center justify-center shadow-md
                     transition-all duration-300 hover:bg-blue-700 hover:scale-105
                     disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>

        <button
          ref={nextRef}
          aria-label="Next products"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white
                     flex items-center justify-center shadow-md
                     transition-all duration-300 hover:bg-blue-700 hover:scale-105
                     disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.4}
          slidesPerGroup={1}
          breakpoints={{
            480: { slidesPerView: 1.8, slidesPerGroup: 1 },
            640: { slidesPerView: 2.2, slidesPerGroup: 1 },
            768: { slidesPerView: 3, slidesPerGroup: 1 },
            1024: { slidesPerView: 4, slidesPerGroup: 1 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="py-2"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group cursor-pointer">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <p className="mt-3 text-sm font-medium text-gray-800 truncate">
                  {product.name}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">
                    Rs {product.oldPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    Rs {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Frame Shapes Section */}
      <div className="text-center text-[18px] sm:text-[22px] mt-10">
        FIND YOUR STYLE
      </div>
      <div className="text-center text-[28px] sm:text-[36px] font-bold mb-8">
        SHOP BY FRAME SHAPE
      </div>

     {/* frames */}
<div className="max-w-[1200px] mx-auto px-4   flex justify-center">
  {/* Expanded grid container by 40px (+20px per column) */}
  <div className="grid grid-cols-2 gap-2 sm:gap-4 justify-items-center w-full max-w-[460px]">
    {frames.slice(0, 2).map((frame, index) => (
      <div
        key={index}
        /* Expanded card max-width by +20px (200px -> 220px) */
        className="flex flex-col items-center group cursor-pointer p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px]"
      >
        {/* Increased image container by +20px (140px/170px) */}
        <div className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center overflow-hidden">
          <img
            src={frame.image}
            alt={frame.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <p className="mt-[-25px] text-center text-base sm:text-lg">
          {frame.name}
        </p>
      </div>
    ))}
  </div>
</div>


<div className="max-w-[1200px] mx-auto px-4 mb-16  flex justify-center">
  {/* Expanded grid container by 40px (+20px per column) */}
  <div className="grid grid-cols-3 gap-2 sm:gap-60 justify-items-center w-full max-w-[460px]">
    {frames.slice(2, 5).map((frame, index) => (
      <div
        key={index}
        /* Expanded card max-width by +20px (200px -> 220px) */
        className="flex flex-col items-center group cursor-pointer p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px]"
      >
        {/* Increased image container by +20px (140px/170px) */}
        <div className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center overflow-hidden">
          <img
            src={frame.image}
            alt={frame.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <p className="mt-[-25px] text-center text-base sm:text-lg">
          {frame.name}
        </p>
      </div>
    ))}
  </div>
</div>
   {/* frames */}
   
    </>
  );
}

export default App;