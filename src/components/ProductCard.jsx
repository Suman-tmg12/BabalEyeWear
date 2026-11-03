import React from 'react';
import { Heart, Star } from 'lucide-react';
import { SHAPE_IMAGES } from '../data/products';

const formatPrice = (amount, currency = 'NPR') => {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '';
  return `${String(currency).trim()} ${value.toLocaleString('en-IN')}`;
};

export const Glasses = ({ shape, image, alt }) => {
  const src = image || SHAPE_IMAGES[shape] || SHAPE_IMAGES.Round;
  return (
    <img
      src={src}
      alt={alt || `${shape} frame glasses`}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
  );
};

// --- COLOR SWATCHES ---
export const Swatches = ({ colors, active, onSelect, className = '' }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    {colors.map((c, i) => (
      <button
        key={c.name ?? i}
        type="button"
        title={c.name}
        aria-label={c.name}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(i);
        }}
        className={`w-4 h-4 rounded-full border border-slate-300 transition-transform ${
          active === i ? 'ring-2 ring-slate-900 ring-offset-1 scale-110' : 'opacity-70 hover:opacity-100'
        }`}
        style={{ backgroundColor: c.hex }}
      />
    ))}
  </div>
);

// --- PRODUCT CARD (grid + list) ---
const ProductCard = ({
  p,
  list = false,
  colorIdx = 0,
  onColor,
  fav = false,
  onFav,
  onOpen,
  onDetails,
  onAddToCart,
  currency = 'NPR',
}) => {
  const price = Number(p.price);
  const oldPrice = Number(p.oldPrice ?? p.originalPrice);
  const hasDiscount = Number.isFinite(oldPrice) && oldPrice > price;
  const openProduct = onDetails || onOpen;

  return (
    <article
      onClick={openProduct}
      className={`group bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl rounded-3xl p-4 sm:p-5 flex cursor-pointer transition-all duration-300 ${
        list ? 'flex-col sm:flex-row sm:items-center gap-4 sm:gap-6' : 'flex-col gap-3 h-full'
      }`}
    >
      {/* Image box */}
      <div
        className={`relative bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden ${
          list ? 'h-44 w-full sm:h-40 sm:w-56 shrink-0' : 'h-48 sm:h-56'
        }`}
      >
        {p.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-slate-900 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider">
            New
          </span>
        )}
        <button
          type="button"
          aria-label={fav ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation();
            onFav?.();
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 border border-slate-100 shadow-sm text-slate-400 hover:text-rose-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
        <Glasses shape={p.shape} image={p.image} alt={p.name} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-2">
        {(p.brand || p.rating) && (
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 font-medium">
            <span className="truncate">{p.brand}</span>
            {p.rating && (
              <span className="flex items-center text-amber-500 font-bold shrink-0">
                <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                {p.rating}
              </span>
            )}
          </div>
        )}
        <h3
          title={p.name}
          className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-emerald-600 transition-colors truncate"
        >
          {p.name}
        </h3>
        {list && p.description && (
          <p className="hidden sm:block text-xs text-slate-500 line-clamp-2 max-w-md">{p.description}</p>
        )}
        {p.colors?.length > 0 && (
          <div onClick={(e) => e.stopPropagation()} className="w-fit">
            <Swatches
              colors={p.colors}
              active={colorIdx}
              onSelect={(i) => onColor?.(i)}
              className="pt-1"
            />
          </div>
        )}
      </div>

      {/* Price & action */}
      <div
        className={`flex items-center justify-between gap-3 pt-3 border-t border-slate-100 ${
          list ? 'sm:flex-col sm:items-end sm:border-t-0 sm:pt-0' : 'mt-auto'
        }`}
      >
        <div className="min-w-0">
          <div className="whitespace-nowrap text-base sm:text-lg font-black leading-tight text-slate-900">
            {formatPrice(price, currency)}
          </div>
          {hasDiscount && (
            <div className="whitespace-nowrap text-xs text-slate-400 line-through">
              {formatPrice(oldPrice, currency)}
            </div>
          )}
        </div>

        {list ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProduct?.();
            }}
            className="shrink-0 whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Configure
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="shrink-0 whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;