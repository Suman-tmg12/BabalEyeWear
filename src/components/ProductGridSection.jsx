import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import useGuardedCart from '../hooks/useGuardedCart';

const PAGE_SIZE = 16; // 4 columns × 4 rows

// Builds a compact page list, e.g. 1 2 3 … 9 10
function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const keep = [1, total, current - 1, current, current + 1]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const out = [];
  keep.forEach((p, i) => {
    if (i > 0 && p - keep[i - 1] > 1) out.push(`gap-${p}`);
    out.push(p);
  });
  return out;
}

export default function ProductGridSection({
  title = 'Our Frames',
  subtitle = 'Browse the full collection',
  products = [],
  currency = 'NPR',
}) {
  const navigate = useNavigate();
  const { addToCart } = useGuardedCart();

  const [page, setPage] = useState(1);
  const [activeColors, setActiveColors] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState('');
  const topRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  // Keeps the page valid if the product list shrinks (for example after a filter)
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  const firstShown = products.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastShown = Math.min(currentPage * PAGE_SIZE, products.length);

  // Hide the toast after 2.5 seconds; the cleanup stops old timers
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const goToPage = (n) => {
    if (n < 1 || n > totalPages || n === currentPage) return;
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setColor = (id, idx) => setActiveColors((prev) => ({ ...prev, [id]: idx }));
  const toggleWishlist = (id) =>
    setWishlist((list) => (list.includes(id) ? list.filter((i) => i !== id) : [...list, id]));

  const handleAddToCart = (product) => {
    const added = addToCart(product, {
      colorIdx: activeColors[product.id] || 0,
      lensId: 'single-vision',
      lensLabel: 'Single Vision Rx',
    });
    if (!added) return;
    setToast(`${product.name} added to cart`);
  };

  const openProduct = (product) =>
    navigate(`/product/${product.id}`, {
      state: { product, currency, colorIdx: activeColors[product.id] || 0 },
    });

  if (products.length === 0) return null;

  const pageButtonBase =
    'flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors';

  return (
    <section className="mx-auto mb-16 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
      {/* scroll-mt keeps the heading clear of the fixed navbar when paging */}
      <div ref={topRef} className="scroll-mt-28 text-center">
        <h2 className="text-[26px] font-bold text-slate-900 sm:text-[34px]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {pageItems.map((product) => (
          <ProductCard
            key={product.id}
            p={product}
            list={false}
            currency={currency}
            colorIdx={activeColors[product.id] || 0}
            onColor={(i) => setColor(product.id, i)}
            fav={wishlist.includes(product.id)}
            onFav={() => toggleWishlist(product.id)}
            onOpen={() => openProduct(product)}
            onDetails={() => openProduct(product)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <nav aria-label="Product pages" className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className={`${pageButtonBase} border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {getPageNumbers(currentPage, totalPages).map((item) =>
              typeof item === 'string' ? (
                <span key={item} className="px-1 text-slate-400">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={item}
                  onClick={() => goToPage(item)}
                  aria-label={`Page ${item}`}
                  aria-current={item === currentPage ? 'page' : undefined}
                  className={`${pageButtonBase} ${
                    item === currentPage
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className={`${pageButtonBase} border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>

          <p className="text-xs text-slate-500">
            Showing {firstShown}–{lastShown} of {products.length} frames
          </p>
        </div>
      )}

      {/* Add-to-cart toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[60] flex max-w-[92vw] -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl"
        >
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
          <span className="truncate">{toast}</span>
        </div>
      )}
    </section>
  );
}