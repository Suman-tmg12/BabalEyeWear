import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function ProductSliderSection({ title, subtitle, products }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      {/* Section Headers */}
      {title && <div className="text-[22px] sm:text-[25px] text-center">{title}</div>}
      {subtitle && <div className="text-center text-[32px] sm:text-[40px] font-bold mb-6">{subtitle}</div>}

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
          {products?.map((product) => (
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
    </>
  );
}

export default ProductSliderSection;