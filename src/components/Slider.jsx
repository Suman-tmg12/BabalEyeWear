import React, { useRef } from "react";

// Update the paths to go up one folder using "../"
import slider1 from "../assets/SliderPic/slider1.png";
import slider2 from "../assets/SliderPic/slider2.png";
import slider3 from "../assets/SliderPic/slider3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Slider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="[--swiper-navigation-color:#187A6B] [--swiper-theme-color:#187A6B]">
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
  );
}

export default Slider;