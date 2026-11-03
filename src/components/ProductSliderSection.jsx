import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../components/ProductCard';
import useGuardedCart from '../hooks/useGuardedCart';

const PREV = 'product-slider-prev';
const NEXT = 'product-slider-next';

function ProductSliderSection({ title, subtitle, products = [], currency = 'NPR' }) {
  const navigate = useNavigate();
  const { addToCart } = useGuardedCart();

  const [activeColors, setActiveColors] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState('');

  const setColor = (id, idx) =>
    setActiveColors((prev) => ({ ...prev, [id]: idx }));

  const toggleWishlist = (id) =>
    setWishlist((list) =>
      list.includes(id) ? list.filter((i) => i !== id) : [...list, id]
    );

  const handleAddToCart = (product) => {
    const added = addToCart(product, {
      colorIdx: activeColors[product.id] || 0,
      lensId: 'single-vision',
      lensLabel: 'Single Vision Rx',
    });
    if (!added) return;

    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(''), 2500);
  };

  const goToProduct = (p) =>
    navigate(`/product/${p.id}`, {
      state: { product: p, currency, colorIdx: activeColors[p.id] || 0 },
    });

  return (
    <>
      {title && (
        <div className="text-center text-[22px] sm:text-[25px]">{title}</div>
      )}
      {subtitle && (
        <div className="mb-6 text-center text-[32px] font-bold sm:text-[40px]">
          {subtitle}
        </div>
      )}

      <div className="relative mx-auto mb-16 w-full max-w-[1200px] px-10 sm:px-12 lg:px-14">
        <button
          type="button"
          aria-label="Previous products"
          className={`${PREV} absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#187A6B] text-white shadow-md transition-all duration-300 hover:scale-105 [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-40 sm:h-10 sm:w-10`}
        >
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>

        <button
          type="button"
          aria-label="Next products"
          className={`${NEXT} absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#187A6B] text-white shadow-md transition-all duration-300 hover:scale-105 [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-40 sm:h-10 sm:w-10`}
        >
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: `.${PREV}`, nextEl: `.${NEXT}` }}
          spaceBetween={20}
          slidesPerView={1.2}
          slidesPerGroup={1}
          breakpoints={{
            480: { slidesPerView: 1.6 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="py-2 !pb-6"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <ProductCard
                p={product}
                currency={currency}
                colorIdx={activeColors[product.id] || 0}
                onColor={(i) => setColor(product.id, i)}
                fav={wishlist.includes(product.id)}
                onFav={() => toggleWishlist(product.id)}
                onOpen={() => goToProduct(product)}
                onAddToCart={() => handleAddToCart(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[60] flex max-w-[92vw] -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl"
        >
          <span className="truncate">{toast}</span>
        </div>
      )}
    </>
  );
}

export default ProductSliderSection;