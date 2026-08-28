import { useState, useRef } from "react";
import "./Home.css";

import explore from "./assets/Explore.png";

import Slider from "./components/Slider";

// important2
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

import trendy1 from "./assets/Trendy_Pic/trendy1.jpg";
import trendy2 from "./assets/Trendy_Pic/trendy2.jpg";
import trendy3 from "./assets/Trendy_Pic/trendy3.jpg";
import trendy4 from "./assets/Trendy_Pic/trendy4.jpg";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // References for custom Swiper navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // 8 Total Products
  const products = [
    {
      id: 1,
      name: "Transparent White Square Sunglass",
      image: product1,
      oldPrice: 2000,
      price: 1700,
    },
    {
      id: 2,
      name: "Gold Double Bridge Sunglass",
      image: product2,
      oldPrice: 2200,
      price: 1870,
    },
    {
      id: 3,
      name: "Black Matte Round Frame",
      image: product3,
      oldPrice: 2200,
      price: 1870,
    },
    {
      id: 4,
      name: "Classic Tortoise Shell Frame",
      image: product4,
      oldPrice: 2200,
      price: 1870,
    },
    {
      id: 5,
      name: "Silver Metal Wireframe Eyeglasses",
      image: product1,
      oldPrice: 2100,
      price: 1785,
    },
    {
      id: 6,
      name: "Vintage Aviator Dark Sunglasses",
      image: product2,
      oldPrice: 2500,
      price: 2125,
    },
    {
      id: 7,
      name: "Retro Cat Eye Oversized Frame",
      image: product3,
      oldPrice: 2300,
      price: 1955,
    },
    {
      id: 8,
      name: "Urban Clear Wayfarer Eyeglasses",
      image: product4,
      oldPrice: 1900,
      price: 1615,
    },
  ];

  const frames = [
    { image: frames1, name: "Cat Eye" },
    { image: frames2, name: "Clubmaster" },
    { image: frames3, name: "Round" },
    { image: frames4, name: "Square" },
    { image: frames5, name: "EyeGlasses" },
  ];

  return (
    <>
      {/* Hero Slider */}
      <Slider />
      {/* <Slider/> */}

      {/* Power Lenses Banner */}
      <div className="w-full flex justify-center px-4 mt-8 sm:mt-[50px] mb-10">
        <div
          className="w-full max-w-[1200px] bg-white rounded-3xl sm:rounded-full
                     flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-between
                     border border-gray-200 px-4 sm:px-2 py-4 sm:py-0 sm:h-20
                     shadow-black/10 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="flex gap-4 sm:gap-6 p-2 sm:ml-4 items-center justify-center text-center sm:text-left">
            <span className="material-symbols-outlined shrink-0">
              eyeglasses_2
            </span>
            <span>
              <p className="text-[#187A6B] text-xs tracking-tight font-semibold">
                GIVE YOUR FRAMES A VISION UPGRADE
              </p>
              <p className="text-sm sm:text-base">
                Premium Power Lenses Designed for Every Frame
              </p>
            </span>
          </div>

          <div
            className="group h-[50px] sm:h-[55px] rounded-full border border-gray-400 bg-white
                       w-full sm:w-[250px] flex items-center justify-between pl-[20px] sm:pl-[25px] pr-[7px]
                       cursor-pointer transition-colors duration-300 hover:bg-[#187A6B] hover:text-white"
          >
            <div className="text-sm font-medium">Find Your Perfect Lenses</div>

            <div
              className="bg-[#187A6B] rounded-full h-[32px] w-[32px] sm:h-[35px] sm:w-[35px]
                         flex items-center justify-center text-white shrink-0
                         group-hover:bg-white group-hover:text-[#187A6B]
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
                     w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#187A6B] text-white
                     flex items-center justify-center shadow-md
                     transition-all duration-300 hover:bg-[#187A6B] hover:scale-105
                     disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </button>

        <button
          ref={nextRef}
          aria-label="Next products"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#187A6B] text-white
                     flex items-center justify-center shadow-md
                     transition-all duration-300 hover:bg-[#187A6B] hover:scale-105
                     disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
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
      <div className="max-w-[1200px] mx-auto px-4 flex justify-center">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 justify-items-center w-full max-w-[460px]">
          {frames.slice(0, 2).map((frame, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer p-3 xs:p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px]"
            >
              <div className="w-[110px] h-[110px] xs:w-[140px] xs:h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center overflow-hidden">
                <img
                  src={frame.image}
                  alt={frame.name}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-[-15px] xs:mt-[-25px] text-center text-sm xs:text-base sm:text-lg">
                {frame.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mb-16 flex justify-center">
        <div className="grid grid-cols-3 gap-2 xs:gap-4 sm:gap-8 md:gap-16 lg:gap-24 justify-items-center w-full max-w-[600px]">
          {frames.slice(2, 5).map((frame, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer p-2 xs:p-3 sm:p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px]"
            >
              <div className="w-[90px] h-[90px] xs:w-[110px] xs:h-[110px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] flex items-center justify-center overflow-hidden">
                <img
                  src={frame.image}
                  alt={frame.name}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-[-10px] xs:mt-[-15px] sm:mt-[-25px] text-center text-xs xs:text-sm sm:text-base lg:text-lg">
                {frame.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* frames */}

      {/* trendy collection section */}
      <div className="text-center text-[18px] sm:text-[22px] mt-10">
        TRENDY COLLECTIONS ON
      </div>
      <div className="text-center text-[28px] sm:text-[46px] font-bold mb-8">
        OUR CATEGORIES
      </div>

      <div className="max-w-[1200px] mx-auto px-4 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { img: trendy1, title: "Women Collection", subtitle: "20+ Frames" },
            { img: trendy2, title: "Men Collection", subtitle: "15+ Frames" },
            {
              img: trendy3,
              title: "Athlete Collection",
              subtitle: "Performance",
            },
            {
              img: trendy4,
              title: "Kids Collection",
              subtitle: "Durable & Fun",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative h-[360px] w-full overflow-hidden  rounded-br-[60px] bg-gray-100 shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {/* Background Image with Zoom */}
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Content Container */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-semibold tracking-wider text-[#187A6B] uppercase transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-bold mt-1 transform translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                  {item.title}
                </h3>

                {/* Action Link / Arrow */}
                <div className="flex items-center gap-2 mt-3 text-sm font-medium text-gray-300 opacity-0 transform translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Explore Now</span>
                  <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* trendy collection section */}

      {/* Explore section */}
      <div className="text-center text-[18px] sm:text-[22px] mt-10 px-4">
        YOUR ONLINE EYEWEAR DESTINATION
      </div>

      <div className="text-center text-[28px] sm:text-[36px] md:text-[46px] font-bold mb-8 px-4">
        EXPLORE WIDE RANGE OF STYLES
      </div>

      <div className="w-full max-w-[1000px] mx-auto overflow-hidden rounded-br-[40px] sm:rounded-br-[60px] lg:rounded-br-[90px]">
        <img
          src={explore}
          alt="Explore IMAGE"
          className="
      w-full
      h-auto
      aspect-[16/9]
      object-cover
      transition-transform
      duration-300
      hover:scale-110
    "
        />
      </div>
    </>
  );
}

export default Home;
