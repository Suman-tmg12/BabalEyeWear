import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  ArrowLeft,
  Truck,
  CreditCard,
  CheckCircle2,
  MapPin,
  Lock,
  Package,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { isLoggedIn } from '../utils/auth';

const SHIPPING_COST = 5.0;

export default function CheckoutProcess() {
  const navigate = useNavigate();
  const { cartItems, cartCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  // Steps: 'cart' | 'checkout' | 'success'
  const [currentStep, setCurrentStep] = useState('cart');
  const [orderSummary, setOrderSummary] = useState(null);

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout form state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const total = Math.max(0, subtotal + SHIPPING_COST - appliedDiscount);

  // Guests can build the cart freely. Login is only required to check out.
  const redirectToLogin = () => {
    navigate('/Auth/Login', { state: { from: '/cart' } });
  };

  const requireLoginThen = (next) => {
    if (!isLoggedIn()) {
      redirectToLogin();
      return;
    }
    next();
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SAVE10') {
      setAppliedDiscount(10.0);
      setPromoSuccess('Discount code applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "SAVE10"');
      setPromoSuccess('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      redirectToLogin();
      return;
    }
    if (cartItems.length === 0) return;

    // Keep a snapshot for the confirmation screen, then empty the shared cart
    setOrderSummary({
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      total,
      paymentMethod,
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
    });
    clearCart();
    setAppliedDiscount(0);
    setPromoCode('');
    setPromoSuccess('');
    setCurrentStep('success');
  };

  // Stepper bar header
  const StepsHeader = () => (
    <div className="flex items-center justify-center gap-2 sm:gap-6 mb-8">
      {/* Step 1 */}
      <div className={`flex items-center gap-2 ${currentStep === 'cart' ? 'text-[#FF7B00] font-bold' : 'text-slate-400 font-medium'}`}>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep === 'cart' ? 'bg-[#FF7B00] text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
        <span className="text-xs sm:text-sm">Cart</span>
      </div>
      <div className="w-8 sm:w-16 h-[2px] bg-slate-200" />
      {/* Step 2 */}
      <div className={`flex items-center gap-2 ${currentStep === 'checkout' ? 'text-[#FF7B00] font-bold' : 'text-slate-400 font-medium'}`}>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep === 'checkout' ? 'bg-[#FF7B00] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
        <span className="text-xs sm:text-sm">Checkout & Payment</span>
      </div>
      <div className="w-8 sm:w-16 h-[2px] bg-slate-200" />
      {/* Step 3 */}
      <div className={`flex items-center gap-2 ${currentStep === 'success' ? 'text-[#FF7B00] font-bold' : 'text-slate-400 font-medium'}`}>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep === 'success' ? 'bg-[#FF7B00] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
        <span className="text-xs sm:text-sm">Confirmation</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <StepsHeader />

        {/* =========================================================
            SECTION 1: CART VIEW (public)
        ========================================================= */}
        {currentStep === 'cart' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Shopping Cart</h1>
              <p className="text-sm text-slate-500">{cartCount} items in your cart</p>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">Your cart is empty</h3>
                <p className="text-sm text-slate-500">Add some frames to get started.</p>
                <button
                  type="button"
                  onClick={() => navigate('/search')}
                  className="mt-4 px-5 py-2.5 bg-[#FF7B00] text-white text-sm font-semibold rounded-xl hover:bg-[#e06c00]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Items list */}
                <div className="lg:col-span-8 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl border border-slate-100 bg-slate-50"
                        />
                        <div>
                          <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
                          {item.variant && <p className="text-xs text-slate-500 mt-0.5">{item.variant}</p>}
                          <span className="font-semibold text-slate-900 mt-2 block">${item.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-30"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-30"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-bold text-slate-900 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary sidebar */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>

                    <form onSubmit={handleApplyPromo} className="mb-5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Promo Code</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="e.g. SAVE10"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF7B00] uppercase font-semibold text-slate-800"
                          />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800">
                          Apply
                        </button>
                      </div>
                      {promoError && <p className="text-xs text-rose-500 mt-1.5">{promoError}</p>}
                      {promoSuccess && <p className="text-xs text-emerald-600 mt-1.5">{promoSuccess}</p>}
                    </form>

                    <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 items-center">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-slate-400" />
                          Shipping Fee
                        </span>
                        <span className="font-semibold text-slate-900">${SHIPPING_COST.toFixed(2)}</span>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount</span>
                          <span className="font-semibold">-${appliedDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                        <span className="text-base font-bold text-slate-900">Total</span>
                        <span className="text-2xl font-bold text-[#FF7B00]">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => requireLoginThen(() => setCurrentStep('checkout'))}
                      className="w-full mt-6 py-3.5 px-4 bg-[#FF7B00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            SECTION 2: CHECKOUT & PAYMENT VIEW (login required)
        ========================================================= */}
        {currentStep === 'checkout' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setCurrentStep('cart')}
                className="p-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Checkout & Payment</h1>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left column: shipping & payment inputs */}
              <div className="lg:col-span-8 space-y-6">
                {/* Shipping details */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
                    <MapPin className="w-5 h-5 text-[#FF7B00]" />
                    Shipping Address
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Suman Tamang"
                        className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="suman@example.com"
                        className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Boudha, Kathmandu"
                        className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Kathmandu"
                        className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="44600"
                        className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment method */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
                    <CreditCard className="w-5 h-5 text-[#FF7B00]" />
                    Payment Method
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-sm font-semibold transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#FF7B00] bg-[#FF7B00]/5 text-[#FF7B00]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      Credit / Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-sm font-semibold transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#FF7B00] bg-[#FF7B00]/5 text-[#FF7B00]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                      Cash on Delivery
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4532 •••• •••• 8900"
                          className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            required
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM / YY"
                            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            name="cardCvc"
                            required
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:border-[#FF7B00] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                      You will pay directly with cash when your package arrives.
                    </div>
                  )}
                </div>
              </div>

              {/* Right column: final calculation & place order */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Review Order</h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{item.quantity}x</span>
                          <span className="text-slate-600 truncate max-w-[150px]">{item.name}</span>
                        </div>
                        <span className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-slate-900">${SHIPPING_COST.toFixed(2)}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span className="font-semibold">-${appliedDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                      <span className="text-base font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-[#FF7B00]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={cartItems.length === 0}
                    className="w-full py-3.5 px-4 bg-[#FF7B00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    Place Order (${total.toFixed(2)})
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>256-Bit SSL Encrypted Payment</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================
            SECTION 3: ORDER SUCCESS / CONFIRMATION VIEW
        ========================================================= */}
        {currentStep === 'success' && orderSummary && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Successfully Placed!</h1>
            <p className="text-sm text-slate-500 mb-6">
              Thank you for your order,{' '}
              <span className="font-semibold text-slate-700">{orderSummary.fullName || 'Customer'}</span>! We have
              received your payment details and are packing your items.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 mb-6 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-700 pb-2 border-b border-slate-200">
                <span>Order ID: #{orderSummary.orderId}</span>
                <span>Date: {orderSummary.date}</span>
              </div>
              <div className="pt-2 flex justify-between text-slate-600">
                <span>Total Charged:</span>
                <span className="font-bold text-slate-900 text-sm">${orderSummary.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping To:</span>
                <span className="font-medium text-slate-800">
                  {orderSummary.address || 'Boudha, Kathmandu'}, {orderSummary.city || 'Kathmandu'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Mode:</span>
                <span className="font-medium text-slate-800 uppercase">
                  {orderSummary.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => alert('Tracking order status feature simulated!')}
                className="flex-1 py-3 px-4 bg-slate-900 text-white font-semibold rounded-xl text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                Track Live Order
              </button>
              <button
                type="button"
                onClick={() => navigate('/search')}
                className="flex-1 py-3 px-4 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                Back to Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 