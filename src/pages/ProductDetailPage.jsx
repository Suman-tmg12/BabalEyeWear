import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, Truck, RefreshCw, Minus, Plus, Heart, ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, getProductById, getProductImages } from '../data/products';
import ProductCard from '../components/ProductCard';
import useGuardedCart from '../hooks/useGuardedCart';

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Shared cart: updates the navbar count and the cart page
 const { addToCart, cartCount } = useGuardedCart();

  // Catalog product by id, or the product passed from another page (e.g. home slider)
  const base = getProductById(id) || location.state?.product;
  const currency = location.state?.currency || 'NPR ';
  const found = base && {
    brand: 'Babal Eyewear',
    category: '',
    shape: '',
    gender: '',
    description: '',
    colors: [],
    ...base,
  };

  // Color chosen on the search page (if any) is passed through router state
  const initialColor = location.state?.colorIdx || 0;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [liked, setLiked] = useState(false);
  const sliderRef = useRef(null);
  const [activeColors, setActiveColors] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState('');

  // Reset local state when moving to a different product
  useEffect(() => {
    setSelectedImage(0);
    setSelectedColor(location.state?.colorIdx || 0);
    setQuantity(1);
    setActiveTab('details');
    window.scrollTo({ top: 0 });
  }, [id]);

  const setSuggestionColor = (pid, idx) => setActiveColors((prev) => ({ ...prev, [pid]: idx }));
  const toggleWishlist = (pid) =>
    setWishlist((l) => (l.includes(pid) ? l.filter((i) => i !== pid) : [...l, pid]));

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Product not found (bad id in the URL)
  if (!found) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-gray-800">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-sm text-gray-500 mt-2">This frame doesn't exist or is no longer available.</p>
        <Link
          to="/search"
          className="inline-block mt-6 bg-gray-900 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-black transition-colors"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  // Build the view model from the shared product data
  const product = {
    ...found,
    sizes: ['Small', 'Medium', 'Wide'],
    images: getProductImages(found),
  };
  const color = product.colors[selectedColor] || product.colors[0] || null;

 const handleAddToCart = () => {
  const added = addToCart(product, { colorIdx: selectedColor, size: selectedSize, quantity });
  if (!added) return;
  setToast(`${product.name} added to cart`);
  setTimeout(() => setToast(''), 2500);
};

const handleBuyNow = () => {
  const added = addToCart(product, { colorIdx: selectedColor, size: selectedSize, quantity });
  if (!added) return;
  navigate('/cart');
};

  // Suggested frames: same category first, then same shape, then the rest
  const suggestions = PRODUCTS
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const score = (p) => (p.category === product.category ? 2 : 0) + (p.shape === product.shape ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 8);

  const imageCount = product.images.length;
  const prevImage = () => setSelectedImage((i) => (i - 1 + imageCount) % imageCount);
  const nextImage = () => setSelectedImage((i) => (i + 1) % imageCount);

  const scrollSlider = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    // pt-5 keeps content clear of the fixed navbar
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8 text-gray-800">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {imageCount > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
            <button
              aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={liked}
              onClick={() => setLiked((v) => !v)}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow hover:bg-white transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
            </button>
          </div>

          {/* Thumbnails: click to change the main image */}
          {imageCount > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  aria-current={selectedImage === idx}
                  className={`aspect-square rounded-lg overflow-hidden border-2 bg-gray-50 transition-all ${
                    selectedImage === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-100'
                      : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>

            {/* Rating */}
            {(product.rating || product.category) && (
              <div className="flex items-center space-x-2 mt-2">
                {product.rating && (
                  <>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  </>
                )}
                {product.rating && product.category && <span className="text-sm text-gray-400">•</span>}
                {product.category && <span className="text-sm text-gray-500">{product.category}</span>}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-gray-900">{currency}{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">{currency}{product.oldPrice.toLocaleString()}</span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded">New</span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          )}

          <hr className="border-gray-200" />

          {/* Variant Selectors */}
          <div className="space-y-4">
            {/* Color Selection */}
            {color && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Color: <span className="text-gray-500 font-normal">{color.name}</span>
                </label>
                <div className="flex items-center space-x-3">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      title={c.name}
                      aria-label={c.name}
                      onClick={() => setSelectedColor(idx)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-8 h-8 rounded-full border-2 ring-offset-2 transition-all ${
                        selectedColor === idx ? 'ring-2 ring-indigo-600 border-white' : 'border-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">Frame Fit</label>
                <button className="text-xs text-indigo-600 hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2.5 text-gray-600 hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2.5 text-gray-600 hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm active:scale-[0.99]"
              >
                Add to Cart
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-black transition-colors"
            >
              Buy Now with One-Click
            </button>
          </div>

          {/* Service Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-center">
            <div className="flex flex-col items-center space-y-1">
              <Truck className="w-5 h-5 text-gray-500" />
              <span className="text-xs text-gray-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <RefreshCw className="w-5 h-5 text-gray-500" />
              <span className="text-xs text-gray-600">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-gray-500" />
              <span className="text-xs text-gray-600">1-Year Warranty</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            {[
              { id: 'details', title: 'Product Details', content: `${[product.shape && `${product.shape} frame`, product.gender && `${product.gender.toLowerCase()} fit`].filter(Boolean).join(', ')}${product.shape || product.gender ? '. ' : ''}Includes protective hard case and micro-fiber cleaning cloth. Frame Dimensions: 52-18-145mm.` },
              { id: 'shipping', title: 'Shipping & Delivery', content: 'Standard delivery in 3-5 business days. Express overnight options available at checkout.' }
            ].map((tab) => (
              <div key={tab.id} className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                  className="w-full flex justify-between items-center py-2 text-left font-medium text-sm text-gray-900"
                >
                  <span>{tab.title}</span>
                  <span>{activeTab === tab.id ? '−' : '+'}</span>
                </button>
                {activeTab === tab.id && (
                  <p className="text-xs text-gray-500 py-1 leading-relaxed">{tab.content}</p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ---------------- SUGGESTED GLASSES (horizontal) ---------------- */}
      {suggestions.length > 0 && (
        <section className="mt-16" aria-labelledby="suggested-heading">
          <div className="flex items-center justify-between mb-5">
            <h2 id="suggested-heading" className="text-xl sm:text-2xl font-bold text-gray-900">
              You may also like
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollSlider(-1)}
                aria-label="Scroll left"
                className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider(1)}
                aria-label="Scroll right"
                className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pt-2 pb-6 px-1 scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
          >
            {suggestions.map((s) => (
              <div
                key={s.id}
                className="snap-start shrink-0 w-[78%] min-[480px]:w-[46%] md:w-[31.5%] lg:w-[23.5%]"
              >
                <ProductCard
                  p={s}
                  list={false}
                  colorIdx={activeColors[s.id] || 0}
                  onColor={(i) => setSuggestionColor(s.id, i)}
                  fav={wishlist.includes(s.id)}
                  onFav={() => toggleWishlist(s.id)}
                  onOpen={() => navigate(`/product/${s.id}`, { state: { colorIdx: activeColors[s.id] || 0 } })}
                  onDetails={() => navigate(`/product/${s.id}`, { state: { colorIdx: activeColors[s.id] || 0 } })}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- ADD-TO-CART TOAST ---------------- */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-full shadow-xl flex items-center gap-2 max-w-[92vw]"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toast} · {cartCount} in cart</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;