import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search, Grid, List, Heart, ShoppingBag, X, Check,
  ChevronDown, Filter, RotateCcw
} from 'lucide-react';

import { PRODUCTS } from '../data/products';
import ProductCard, { Glasses, Swatches } from '../components/ProductCard';

// --- CONSTANTS ---
const MAX_PRICE = 250;
const CATEGORIES = ['All', 'Eyeglasses', 'Sunglasses', 'Screen Glasses', 'Reading'];
const SHAPES = ['Round', 'Square', 'Aviator', 'Cat-Eye', 'Oval', 'Wayfarer'];
const GENDERS = ['Unisex', 'Men', 'Women'];
const LENS_OPTIONS = [
  { id: 'zero-power', label: 'Zero Power (Plano)' },
  { id: 'single-vision', label: 'Single Vision Rx' },
  { id: 'blue-light', label: 'Blue Light Screen' },
  { id: 'progressive', label: 'Progressive Lens' }
];

// Case-insensitive parsing so ?shape=round or ?shape=cat-eye still work
const parseShapes = (str = '') =>
  str
    .split(',')
    .map((x) => SHAPES.find((s) => s.toLowerCase() === x.trim().toLowerCase()))
    .filter(Boolean);

const parseCategory = (str = '') =>
  CATEGORIES.find((c) => c.toLowerCase() === str.trim().toLowerCase()) || 'All';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get('q') || '';
  const shapeParam = searchParams.get('shape') || '';
  const categoryParam = searchParams.get('category') || '';

  // --- SHAPE & CATEGORY LIVE IN THE URL (single source of truth) ---
  const shapes = useMemo(() => parseShapes(shapeParam), [shapeParam]);
  const category = parseCategory(categoryParam);

  // --- LOCAL STATE ---
  const [query, setQuery] = useState(urlQuery);
  const [genders, setGenders] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState(['frame-1']);
  const [cart, setCart] = useState(1);
  const [activeColors, setActiveColors] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [lensType, setLensType] = useState('single-vision');
  const [toast, setToast] = useState('');

  // Start at the top when arriving from the home page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keep the search box in sync when searching again from the navbar
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  // Update URL params without adding history entries
  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key)
    );
    setSearchParams(next, { replace: true });
  };

  const setCategory = (cat) => updateParams({ category: cat === 'All' ? '' : cat });
  const toggleShape = (s) =>
    updateParams({
      shape: (shapes.includes(s) ? shapes.filter((x) => x !== s) : [...shapes, s]).join(','),
    });

  const toggleIn = (setList, item) =>
    setList((l) => (l.includes(item) ? l.filter((i) => i !== item) : [...l, item]));
  const toggleWishlist = (id) => toggleIn(setWishlist, id);
  const setColor = (id, idx) => setActiveColors((prev) => ({ ...prev, [id]: idx }));

  const resetFilters = () => {
    setQuery('');
    setGenders([]);
    setMaxPrice(MAX_PRICE);
    setSearchParams({}, { replace: true }); // clears q, shape, category
  };

  const addToCart = (p) => {
    setCart((c) => c + 1);
    setQuickView(null);
    setToast(`${p.name} added to cart`);
    setTimeout(() => setToast(''), 2500);
  };

  // Lock page scroll while a modal/drawer is open
  useEffect(() => {
    document.body.style.overflow = quickView || drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [quickView, drawerOpen]);

  // --- FILTERING & SORTING ---
  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS
      .filter((p) =>
        [p.name, p.brand, p.category, p.shape].some((v) => (v || '').toLowerCase().includes(q)) &&
        (category === 'All' || p.category === category) &&
        (!shapes.length || shapes.includes(p.shape)) &&
        (!genders.length || genders.includes(p.gender)) &&
        p.price <= maxPrice
      )
      .sort((a, b) =>
        sortBy === 'price-low' ? a.price - b.price :
        sortBy === 'price-high' ? b.price - a.price :
        sortBy === 'rating' ? b.rating - a.rating : 0
      );
  }, [query, category, shapes, genders, maxPrice, sortBy]);

  const activeFilterCount =
    (category !== 'All') + shapes.length + genders.length + (maxPrice < MAX_PRICE);

  // --- FILTER PANEL (shared by desktop sidebar and mobile drawer) ---
  const sectionTitle = 'text-xs font-bold uppercase tracking-wider text-slate-800 mb-3';
  const filterPanel = (
    <div className="space-y-6">
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Search Catalog</span>
        <div className="relative">
          <input
            type="text"
            placeholder="Model or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-sm sm:text-xs rounded-xl pl-3 pr-8 py-2 text-slate-800 focus:outline-none focus:border-slate-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="border-b border-slate-100 pb-5">
        <h3 className={sectionTitle}>Eyewear Type</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                category === cat ? 'bg-slate-900 text-white font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
              {category === cat && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-100 pb-5">
        <h3 className={sectionTitle}>Frame Shape</h3>
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((s) => (
            <button
              key={s}
              onClick={() => toggleShape(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                shapes.includes(s)
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Max Price</h3>
          <span className="text-slate-900 font-extrabold text-xs">${maxPrice}</span>
        </div>
        <input
          type="range" min="50" max={MAX_PRICE} step="5" value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-slate-900 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
          <span>$50</span><span>$150</span><span>$250</span>
        </div>
      </div>

      <div>
        <h3 className={sectionTitle}>Gender</h3>
        <div className="space-y-2">
          {GENDERS.map((g) => (
            <label key={g} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
              <input
                type="checkbox"
                checked={genders.includes(g)}
                onChange={() => toggleIn(setGenders, g)}
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-400 w-4 h-4"
              />
              {g}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-slate-900 selection:text-white">
      {/* ---------------- PAGE HEADER ---------------- */}
      <section className="bg-slate-50/60 border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Glasses & Frames Catalog</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover precision-fit handcrafted prescription frames & UV protection sunglasses.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ---------------- TOP CONTROLS ---------------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-medium text-slate-600">
              Showing <span className="font-bold text-slate-900">{products.length}</span> results
              {query.trim() && (
                <> for <span className="font-bold text-slate-900">"{query.trim()}"</span></>
              )}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold bg-rose-50 px-2.5 py-1 rounded-full"
              >
                <RotateCcw className="w-3 h-3" /> Clear ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-slate-100 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200"
            >
              <Filter className="w-3.5 h-3.5 text-teal-600" /> Filters
              {activeFilterCount > 0 && (
                <span className="bg-slate-900 text-white rounded-full text-[10px] px-1.5">{activeFilterCount}</span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-slate-400 cursor-pointer appearance-none font-medium"
                >
                  <option value="featured">Featured Frames</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="hidden sm:flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200/60">
              {[['grid', Grid], ['list', List]].map(([mode, Icon]) => (
                <button
                  key={mode}
                  aria-label={`${mode} view`}
                  onClick={() => setViewMode(mode)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === mode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- ACTIVE FILTER CHIPS (visible on mobile too) ---------------- */}
        {(shapes.length > 0 || category !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {category !== 'All' && (
              <button
                onClick={() => setCategory('All')}
                aria-label={`Remove ${category} filter`}
                className="flex items-center gap-1 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {category} <X className="w-3 h-3" />
              </button>
            )}
            {shapes.map((s) => (
              <button
                key={s}
                onClick={() => toggleShape(s)}
                aria-label={`Remove ${s} filter`}
                className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {s} <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* ---------------- DESKTOP SIDEBAR ---------------- */}
          <aside className="hidden lg:block pr-2">{filterPanel}</aside>

          {/* ---------------- PRODUCTS ---------------- */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200/70 rounded-3xl p-8 sm:p-12 text-center">
                <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No frames match your selected criteria</h3>
                <p className="text-slate-500 text-xs mt-1 mb-4">Try clearing filters or adjusting your search phrase.</p>
                <button
                  onClick={resetFilters}
                  className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    p={p}
                    list={viewMode === 'list'}
                    colorIdx={activeColors[p.id] || 0}
                    onColor={(i) => setColor(p.id, i)}
                    fav={wishlist.includes(p.id)}
                    onFav={() => toggleWishlist(p.id)}
                    onOpen={() => setQuickView(p)}
                    onDetails={() => navigate(`/product/${p.id}`, { state: { colorIdx: activeColors[p.id] || 0 } })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ---------------- MOBILE FILTER DRAWER ---------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative bg-white w-[88%] max-w-sm h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="font-extrabold text-slate-900">Filters</h2>
              <button
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filterPanel}</div>
            <div className="p-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Clear
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-[2] py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Show {products.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- QUICK VIEW & LENS CONFIGURATOR ---------------- */}
      {quickView && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setQuickView(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto"
          >
            <button
              aria-label="Close"
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-6 sm:pt-0">
              <div className="relative group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden h-52 sm:h-64">
                <button
                  aria-label={wishlist.includes(quickView.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={wishlist.includes(quickView.id)}
                  onClick={() => toggleWishlist(quickView.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 border border-slate-100 shadow-sm text-slate-400 hover:text-rose-500"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(quickView.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
                <Glasses shape={quickView.shape} />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">{quickView.brand}</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{quickView.name}</h2>
                  <p className="text-xs text-slate-500 mt-1">{quickView.description}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">Color: <span className="font-medium text-slate-500">{quickView.colors[activeColors[quickView.id] || 0].name}</span></span>
                  <Swatches colors={quickView.colors} active={activeColors[quickView.id] || 0} onSelect={(i) => setColor(quickView.id, i)} />
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-800 block">Select Lens Power:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {LENS_OPTIONS.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => setLensType(o.id)}
                        className={`p-2 rounded-xl text-xs text-left border transition-all ${
                          lensType === o.id
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Price</span>
                    <span className="text-xl font-black text-slate-900">${quickView.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(quickView)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 sm:px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADD-TO-CART TOAST ---------------- */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-full shadow-xl flex items-center gap-2 max-w-[92vw]"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toast} · {cart} in cart</span>
        </div>
      )}
    </div>
  );
}