import product1 from "../assets/Products/product1.png";
import product2 from "../assets/Products/product2.png";
import product3 from "../assets/Products/product3.png";
import product4 from "../assets/Products/product4.png";

// --- MOCK PRODUCTS ---
export const PRODUCTS = [
  {
    id: 'frame-1', name: 'AURORA GLASSES', brand: 'Babal Signature', category: 'Eyeglasses', shape: 'Round',
    gender: 'Unisex', price: 189, rating: 4.9, isNew: true,
    description: 'Timeless rounded silhouette crafted with hand-polished Havana acetate and titanium gold core wire.',
    colors: [
      { name: 'Amber Havana', hex: '#78350f', frameColor: '#78350f', lensColor: '#e0f2fe22' },
      { name: 'Onyx Black', hex: '#111111', frameColor: '#111111', lensColor: '#e0f2fe22' },
      { name: 'Crystal Clear', hex: '#e2e8f0', frameColor: '#cbd5e1', lensColor: '#e0f2fe22' }
    ]
  },
  {
    id: 'frame-2', name: 'URBAN WAYFARER EDGE', brand: 'Babal Studio', category: 'Screen Glasses', shape: 'Wayfarer',
    gender: 'Unisex', price: 145, rating: 4.8, isNew: false,
    description: 'Ergonomic hand-polished Italian acetate frames equipped with high-performance HEV blue light blocking optics.',
    colors: [
      { name: 'Onyx Black', hex: '#111111', frameColor: '#111111', lensColor: '#bae6fd44' },
      { name: 'Tortoise Shell', hex: '#78350f', frameColor: '#78350f', lensColor: '#bae6fd44' }
    ]
  },
  {
    id: 'frame-3', name: 'LUMINARY CAT-EYE LUXE', brand: 'Babal Atelier', category: 'Sunglasses', shape: 'Cat-Eye',
    gender: 'Women', price: 210, rating: 4.95, isNew: true,
    description: 'Sculpted winged frames tailored for sophistication with UV400 gradient optical protection.',
    colors: [
      { name: 'Burgundy Crimson', hex: '#881337', frameColor: '#881337', lensColor: '#4c0519' },
      { name: 'Emerald Tortoise', hex: '#064e3b', frameColor: '#064e3b', lensColor: '#022c22' },
      { name: 'Champagne Gold', hex: '#ca8a04', frameColor: '#ca8a04', lensColor: '#713f12' }
    ]
  },
  {
    id: 'frame-4', name: 'STEEL AVIATOR PRO', brand: 'Babal Tech', category: 'Sunglasses', shape: 'Aviator',
    gender: 'Men', price: 195, rating: 4.7, isNew: false,
    description: 'Geometric architectural precision blended with ultra-durable beta-titanium temples and polarized optics.',
    colors: [
      { name: 'Brushed Silver', hex: '#cbd5e1', frameColor: '#94a3b8', lensColor: '#1e293b' },
      { name: 'Polished Gold', hex: '#eab308', frameColor: '#ca8a04', lensColor: '#365314' }
    ]
  },
  {
    id: 'frame-5', name: 'MINIMALIST OVAL CRAFT', brand: 'Babal Basics', category: 'Reading', shape: 'Oval',
    gender: 'Unisex', price: 89, rating: 4.6, isNew: false,
    description: 'Vintage circular silhouette featuring soft silicone nose pads and ultra-slim stainless steel rim architecture.',
    colors: [
      { name: 'Antique Bronze', hex: '#92400e', frameColor: '#92400e', lensColor: '#ffffff00' },
      { name: 'Satin Black', hex: '#18181b', frameColor: '#18181b', lensColor: '#ffffff00' }
    ]
  },
  {
    id: 'frame-6', name: 'APEX SQUARE VISION', brand: 'Babal Executive', category: 'Eyeglasses', shape: 'Square',
    gender: 'Men', price: 160, rating: 4.85, isNew: true,
    description: 'Commanding rectangular frame structure designed for all-day desk comfort and visual precision.',
    colors: [
      { name: 'Deep Midnight Blue', hex: '#1e3a8a', frameColor: '#1e3a8a', lensColor: '#ffffff00' },
      { name: 'Matte Havana', hex: '#451a03', frameColor: '#451a03', lensColor: '#ffffff00' }
    ]
  }
];

// --- GLASSES IMAGES (one image per shape) ---
export const SHAPE_IMAGES = {
  Round: product1,
  Square: product2,
  Aviator: product3,
  'Cat-Eye': product4,
  Oval: product2,
  Wayfarer: product3
};


export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);

// All gallery images for a product.
// Add an `images: [imgA, imgB, ...]` array to a product to use its own photos;
// otherwise the shape image comes first, followed by the other available photos.
const ALL_IMAGES = [product1, product2, product3, product4];
export const getProductImages = (p) => {
  if (p.images && p.images.length) return p.images;
  if (p.image) return [p.image];
  const main = SHAPE_IMAGES[p.shape] || SHAPE_IMAGES.Round;
  return [main, ...ALL_IMAGES.filter((img) => img !== main)];
};