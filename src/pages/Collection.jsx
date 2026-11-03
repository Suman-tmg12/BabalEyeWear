import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import useGuardedCart from '../hooks/useGuardedCart';

// Sample products, written in the shape ProductCard expects:
//   name, brand, shape, price, rating, isNew, description, image, colors: [{ name, hex }]
// Extra fields (category, frameStyle, material, features) are only used by this page's filters.
const PRODUCTS = [
  {
    id: 1,
    name: 'Aura Oversized Cat-Eye',
    brand: 'Babal Signature',
    category: 'women',
    gender: 'Women',
    shape: 'Cat-Eye',
    frameStyle: 'cat-eye',
    material: 'acetate',
    features: ['blue-light', 'polarized'],
    price: 95,
    rating: 4.9,
    isNew: false,
    description: 'Oversized cat-eye acetate frame with blue light and polarized lens options.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Saddle Brown', hex: '#8B4513' },
      { name: 'Lavender', hex: '#E6E6FA' },
    ],
  },
  {
    id: 2,
    name: 'Velocity Sport Shield',
    brand: 'Babal Sport',
    category: 'athlete',
    gender: 'Unisex',
    shape: 'Aviator',
    frameStyle: 'wrap-around',
    material: 'tr90',
    features: ['anti-fog', 'polarized', 'impact'],
    price: 130,
    rating: 4.8,
    isNew: false,
    description: 'Lightweight TR90 wrap-around with anti-fog, polarized and impact-resistant lenses.',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Black', hex: '#000000' },
      { name: 'Teal', hex: '#0D9488' },
    ],
  },
  {
    id: 3,
    name: 'FlexiJunior Round Guard',
    brand: 'Babal Kids',
    category: 'kids',
    gender: 'Unisex',
    shape: 'Round',
    frameStyle: 'round',
    material: 'tr90',
    features: ['blue-light', 'impact'],
    price: 65,
    rating: 4.9,
    isNew: false,
    description: 'Flexible, unbreakable round frames with blue light protection for kids.',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Pink', hex: '#EC4899' },
      { name: 'Green', hex: '#22C55E' },
    ],
  },
  {
    id: 4,
    name: 'Executive Minimalist Square',
    brand: 'Babal Executive',
    category: 'men',
    gender: 'Men',
    shape: 'Square',
    frameStyle: 'rectangle',
    material: 'titanium',
    features: ['blue-light', 'polarized'],
    price: 120,
    rating: 4.7,
    isNew: false,
    description: 'Slim titanium rectangle frame built for all-day desk comfort.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Slate', hex: '#334155' },
      { name: 'Black', hex: '#000000' },
      { name: 'Steel Grey', hex: '#94A3B8' },
    ],
  },
  {
    id: 5,
    name: 'Serene Butterfly Acetate',
    brand: 'Babal Atelier',
    category: 'women',
    gender: 'Women',
    shape: 'Cat-Eye',
    frameStyle: 'cat-eye',
    material: 'acetate',
    features: ['polarized'],
    price: 105,
    rating: 4.8,
    isNew: true,
    description: 'Butterfly-shaped acetate frame with polarized UV400 lenses.',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Saddle Brown', hex: '#8B4513' },
      { name: 'Black', hex: '#000000' },
    ],
  },
  {
    id: 6,
    name: 'Apex Endurance Wrap',
    brand: 'Babal Sport',
    category: 'athlete',
    gender: 'Unisex',
    shape: 'Aviator',
    frameStyle: 'wrap-around',
    material: 'tr90',
    features: ['anti-fog', 'polarized', 'impact'],
    price: 145,
    rating: 5.0,
    isNew: false,
    description: 'High-performance wrap with maximum UV400 protection for endurance sports.',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Yellow', hex: '#EAB308' },
    ],
  },
];

const CATEGORY_PILLS = [
  { id: 'all', label: 'All Frames' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'kids', label: 'Kids' },
];

const FEATURE_OPTIONS = [
  { id: 'anti-fog', label: 'Anti-Fog Tech' },
  { id: 'polarized', label: 'Polarized UV400' },
  { id: 'blue-light', label: 'Blue Light Filter' },
  { id: 'impact', label: 'Impact / Shatterproof' },
];

const STYLE_OPTIONS = [
  { id: 'cat-eye', label: 'Cat-Eye' },
  { id: 'wrap-around', label: 'Wrap-Around / Sports' },
  { id: 'round', label: 'Round' },
  { id: 'rectangle', label: 'Rectangle' },
];

// Default lens used by the grid Add to Cart button
const DEFAULT_LENS = { id: 'single-vision', label: 'Single Vision Rx' };

const isValidCategory = (param) =>
  typeof param === 'string' && CATEGORY_PILLS.some((c) => c.id === param);

export default function EyewearCollectionPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Shared cart: updates the navbar count and the cart page
  const { addToCart, cartCount } = useGuardedCart();

  // Category is driven by the URL (?category=...), set by TrendyCollection links
  const [selectedCategory, setSelectedCategory] = useState(
    () => (isValidCategory(searchParams.get('category')) ? searchParams.get('category') : 'all')
  );
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [toast, setToast] = useState('');

  // Sync category when the URL changes from outside (back/forward, another card clicked)
  useEffect(() => {
    const param = searchParams.get('category');
    setSelectedCategory(isValidCategory(param) ? param : 'all');
  }, [searchParams]);

  // Card state (same props SearchPage gives ProductCard)
  const [wishlist, setWishlist] = useState([]);
  const [activeColors, setActiveColors] = useState({});

  const toggleWishlist = (id) =>
    setWishlist((list) => (list.includes(id) ? list.filter((i) => i !== id) : [...list, id]));
  const setColor = (id, idx) => setActiveColors((prev) => ({ ...prev, [id]: idx }));

  // Grid Add to Cart: adds straight away with the chosen color and the default lens
 const quickAddToCart = (p) => {
  const added = addToCart(p, {
    colorIdx: activeColors[p.id] || 0,
    lensId: DEFAULT_LENS.id,
    lensLabel: DEFAULT_LENS.label,
  });
  if (!added) return; // guest was sent to login
  setToast(`${p.name} added to cart`);
  setTimeout(() => setToast(''), 2500);
};

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleStyleToggle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  // Update state AND the URL so the filter is shareable and back/forward works
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const next = new URLSearchParams(searchParams);
    if (catId === 'all') next.delete('category');
    else next.set('category', catId);
    setSearchParams(next, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (
        selectedFeatures.length > 0 &&
        !selectedFeatures.every((feat) => product.features.includes(feat))
      ) {
        return false;
      }
      if (selectedStyles.length > 0 && !selectedStyles.includes(product.frameStyle)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [selectedCategory, selectedFeatures, selectedStyles, sortBy]);

  const activeFilterCount = selectedFeatures.length + selectedStyles.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 sm:p-6 lg:p-8">
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center mb-8 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
          {selectedCategory === 'all' && 'Eyewear for Every Vision'}
          {selectedCategory === 'women' && "Women's Designer & Daily Eyewear"}
          {selectedCategory === 'men' && "Men's Classic & Modern Frames"}
          {selectedCategory === 'athlete' && 'High-Performance Athletic Eyewear'}
          {selectedCategory === 'kids' && "Durable & Flexible Kids' Eyewear"}
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg mb-6 leading-relaxed">
          Discover precision optics, lightweight comfort, and impact-resistant frames engineered for every lifestyle.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORY_PILLS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Utility & Control Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>⚙ Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="text-sm font-medium text-slate-500 hidden sm:block">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white p-6 shadow-xl transform transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-auto lg:shadow-none lg:translate-x-0 lg:bg-transparent lg:p-0 ${
            isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="bg-white lg:border lg:border-slate-200 lg:rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 lg:hidden">
              <h3 className="font-semibold text-lg text-slate-900">Filters</h3>
              <button
                aria-label="Close filters"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Lens Technology Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                Lens Technology
              </h4>
              <div className="space-y-2">
                {FEATURE_OPTIONS.map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(item.id)}
                      onChange={() => handleFeatureToggle(item.id)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Frame Style Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
                Frame Style
              </h4>
              <div className="space-y-2">
                {STYLE_OPTIONS.map((item) => (
                  <label key={item.id} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedStyles.includes(item.id)}
                      onChange={() => handleStyleToggle(item.id)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Clear All */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSelectedFeatures([]);
                  setSelectedStyles([]);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-800">No matching frames found</h3>
              <p className="text-slate-500 text-sm mt-1">Try toggling off some filters or changing your category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  colorIdx={activeColors[p.id] || 0}
                  onColor={(i) => setColor(p.id, i)}
                  fav={wishlist.includes(p.id)}
                  onFav={() => toggleWishlist(p.id)}
                  onAddToCart={() => quickAddToCart(p)}
                  onDetails={() =>
                    navigate(`/product/${p.id}`, { state: { colorIdx: activeColors[p.id] || 0 } })
                  }
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileFilterOpen && (
        <div
          onClick={() => setIsMobileFilterOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
        />
      )}

      {/* Add-to-cart toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-full shadow-xl flex items-center gap-2 max-w-[92vw]"
        >
          <span className="truncate">
            {toast} · {cartCount} in cart
          </span>
        </div>
      )}
    </div>
  );
}