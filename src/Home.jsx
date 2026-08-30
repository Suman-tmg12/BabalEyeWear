import { useState, useRef } from "react";
import "./Home.css";

import explore from "./assets/Explore.png";

import Slider from "./components/Slider";
import ProductSlider from "./components/ProductSliderSection";
import PowerBanner from "./components/PowerBanner";
import FrameShape from "./components/FrameShape";
import TrendyCollection from "./components/TrendyCollection";
import Explore from "./components/Explore";

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

  // 8 Total Products
  const products = [
  { id: 1, name: "Transparent White Square Sunglass", image: product1, price: 1700, oldPrice: 2000 },
  { id: 2, name: "Gold Double Bridge Sunglass", image: product2, price: 1870, oldPrice: 2200 },
  { id: 3, name: "Black Matte Round Frame", image: product3, price: 1870, oldPrice: 2200 },
  { id: 4, name: "Classic Tortoise Shell Frame", image: product4, price: 1870, oldPrice: 2200 },
  { id: 5, name: "Silver Metal Wireframe Eyeglasses", image: product1, price: 1785, oldPrice: 2100 },
  { id: 6, name: "Vintage Aviator Dark Sunglasses", image: product2, price: 2125, oldPrice: 2500 },
  { id: 7, name: "Retro Cat Eye Oversized Frame", image: product3, price: 1955, oldPrice: 2300 },
  { id: 8, name: "Urban Clear Wayfarer Eyeglasses", image: product4, price: 1615, oldPrice: 1900 },
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
      {/* Hero Slider*/}
      <Slider />
      {/* <Slider/> */}

      {/* Power Lenses Banner */}
      <PowerBanner/>
      {/* Power Lenses Banner */}

      {/* Clearance Sale Section */}
      {/* Product Slider Section */}
      <ProductSlider title="BABALEYEWEAR CLEARANCE SALE"
        subtitle="FLAT 15% OFF"
        products={products}/>
        {/* Product Slider Section */}
         {/* Clearance Sale Section */}

      {/* Frame Shapes Section */}
      {/* frames */}
      <FrameShape/>
      {/* frames */}
      {/* Frame Shapes Section */}


      {/* trendy collection section */}
       <TrendyCollection />
      {/* trendy collection section */}

      {/* Explore section */}
      <Explore />
    </>
  );
}

export default Home;
