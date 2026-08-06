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

function App() {
  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Company", path: "/company" },
    { id: 4, name: "Services", path: "/services" },
    { id: 5, name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-200 px-10 py-3">
        <img src={logo} alt="Babal Eyewear" className="w-24 cursor-pointer" />

        <nav className="flex gap-8 text-black font-medium">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="hover:text-gray-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search..."
            className="bg-white rounded-full px-5 py-2 border border-gray-300 outline-none"
          />

          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300 cursor-pointer">
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Slider */}
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
        <SwiperSlide>
          <div className="w-[1200px] h-[600px] mx-auto rounded-[50px] overflow-hidden">
            <img
              src={slider1}
              alt="Babal Eyewear"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-[1200px] h-[600px] mx-auto rounded-[50px] overflow-hidden">
            <img
              src={slider2}
              alt="Babal Eyewear"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-[1200px] h-[600px] mx-auto rounded-[50px] overflow-hidden">
            <img
              src={slider3}
              alt="Babal Eyewear"
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default App;
