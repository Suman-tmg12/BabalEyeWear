import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from '../components/ProductCard';

function ProductSliderSection({ title, subtitle, products, currency = '$' }) {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Per-card UI state (selected color + wishlist), same behavior as the search page cards
  const [activeColors, setActiveColors] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const setColor = (id, idx) => setActiveColors((prev) => ({ ...prev, [id]: idx }));
  const toggleWishlist = (id) =>
    setWishlist((l) => (l.includes(id) ? l.filter((i) => i !== id) : [...l, id]));

  const goToProduct = (p) =>
    navigate(`/product/${p.id}`, { state: { product: p, currency, colorIdx: activeColors[p.id] || 0 } });

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
          // extra vertical room so the card's hover shadow isn't clipped
          className="py-2 !pb-6"
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <ProductCard
                p={product}
                list={false}
                currency={currency}
                colorIdx={activeColors[product.id] || 0}
                onColor={(i) => setColor(product.id, i)}
                fav={wishlist.includes(product.id)}
                onFav={() => toggleWishlist(product.id)}
                onOpen={() => goToProduct(product)}
                onDetails={() => goToProduct(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default ProductSliderSection;