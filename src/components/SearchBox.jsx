import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { searchProducts } from '../utils/searchProducts';

const MIN_CHARS = 2;
const DEBOUNCE_MS = 250;

const formatNPR = (value) => `NPR ${Number(value).toLocaleString('en-IN')}`;

// Waits until the user stops typing before running the search
const useDebounced = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const SearchBox = ({ variant = 'desktop', onSubmitted, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmed = term.trim();
  const query = useDebounced(trimmed, DEBOUNCE_MS);
  const showDropdown = open && trimmed.length >= MIN_CHARS;

  const { items, total } = useMemo(
    () =>
      query.length >= MIN_CHARS
        ? searchProducts(PRODUCTS, query, 6)
        : { items: [], total: 0 },
    [query]
  );

  // Keep the box in sync with the search page's ?q= value, and close it on navigation
  useEffect(() => {
    setOpen(false);
    setActiveIndex(-1);
    if (location.pathname === '/search') {
      setTerm(new URLSearchParams(location.search).get('q') ?? '');
    }
  }, [location.pathname, location.search]);

  // Close when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const closeDropdown = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const submit = (e) => {
    e?.preventDefault();
    if (!trimmed) return;
    closeDropdown();
    inputRef.current?.blur();
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    onSubmitted?.();
  };

  const openProduct = (product) => {
    closeDropdown();
    inputRef.current?.blur();
    navigate(`/product/${product.id}`, {
      state: { product, currency: 'NPR', colorIdx: 0 },
    });
    onSubmitted?.();
  };

  const clear = () => {
    setTerm('');
    closeDropdown();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      return;
    }
    if (!showDropdown) return;

    // Product rows plus the "See all results" row
    const optionCount = items.length + 1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % optionCount);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? optionCount - 1 : i - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < items.length) {
      e.preventDefault();
      openProduct(items[activeIndex]);
    }
  };

  const isMobile = variant === 'mobile';

  return (
    <div ref={wrapRef} className={`relative ${isMobile ? 'w-full' : ''} ${className}`}>
      <form onSubmit={submit} role="search">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search frames..."
            aria-label="Search frames"
            aria-autocomplete="list"
            aria-expanded={showDropdown}
            autoComplete="off"
            enterKeyHint="search"
            className={`rounded-full border border-gray-300 bg-white py-2 pl-9 pr-9 outline-none transition-all duration-300 focus:border-[#187A6B] [&::-webkit-search-cancel-button]:appearance-none ${
              isMobile ? 'w-full' : 'w-32 focus:w-40 lg:w-48 lg:focus:w-64'
            }`}
          />
          {term && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {showDropdown && (
        <div
          role="listbox"
          className={`z-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ${
            isMobile ? 'relative mt-2' : 'absolute right-0 top-full mt-2 w-80'
          }`}
        >
          {items.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">No frames match "{trimmed}"</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {items.map((p, i) => (
                <li key={p.id} role="option" aria-selected={activeIndex === i}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => openProduct(p)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors ${
                      activeIndex === i ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 object-contain"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-gray-900">
                        {p.name}
                      </span>
                      <span className="block whitespace-nowrap text-xs text-gray-500">
                        {formatNPR(p.price)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <button
              type="button"
              onMouseEnter={() => setActiveIndex(items.length)}
              onClick={submit}
              className={`w-full border-t border-gray-100 px-4 py-2.5 text-left text-sm font-semibold text-[#187A6B] transition-colors ${
                activeIndex === items.length ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              See all {total} results for "{trimmed}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;