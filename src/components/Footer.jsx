import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiEye,
  FiArrowUp,
  FiSend,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";

// ---- Data (edit here, not in the JSX) ----
const TRUST_ITEMS = [
  { icon: FiTruck, title: "Free Shipping", text: "On all orders over $50" },
  { icon: FiRefreshCw, title: "30-Day Returns", text: "Easy, no-hassle exchanges" },
  { icon: FiShield, title: "1-Year Warranty", text: "On every frame we sell" },
  { icon: FiEye, title: "Free Eye Test", text: "Book a visit at our store" },
];

const SHOP_LINKS = [
  { label: "Eyeglasses", to: "/search?q=Eyeglasses" },
  { label: "Sunglasses", to: "/search?q=Sunglasses" },
  { label: "Screen Glasses", to: "/search?q=Screen" },
  { label: "Reading Glasses", to: "/search?q=Reading" },
  { label: "New Arrivals", to: "/search" },
];

const CARE_LINKS = [
  { label: "Track Your Order", to: "/track-order" },
  { label: "Shipping & Delivery", to: "/shipping" },
  { label: "Returns & Exchanges", to: "/returns" },
  { label: "Size & Fit Guide", to: "/size-guide" },
  { label: "Warranty", to: "/warranty" },
  { label: "FAQs", to: "/faq" },
];

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Our Company", to: "/company" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
  { label: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { label: "TikTok", icon: FaTiktok, href: "https://tiktok.com" },
  { label: "YouTube", icon: FaYoutube, href: "https://youtube.com" },
  { label: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/12345678900" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "PayPal", "Cash on Delivery"];

// ---- Small helpers ----
const linkClass =
  "w-fit text-sm sm:text-base text-black/90 hover:text-black hover:underline underline-offset-4 transition-all duration-200";

const ColumnTitle = ({ children }) => (
  <h3 className="text-base sm:text-lg font-semibold text-black mb-4">{children}</h3>
);

const LinkList = ({ items }) => (
  <ul className="flex flex-col gap-2.5">
    {items.map((item) => (
      <li key={item.label}>
        <Link to={item.to} className={linkClass}>
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
);

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your backend / newsletter service here
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-[#54B8A9] border-t-[30px] border-t-[#72ccbf] mt-10 text-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ---------- Trust strip ---------- */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
          {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 sm:gap-4">
              <span className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/70">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base">{title}</p>
                <p className="text-xs sm:text-sm text-black/80">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-black/20" />

        {/* ---------- Brand + newsletter ---------- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-8 sm:py-10">
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium">BabalEyeWear</h2>
            <p className="mt-2 text-sm sm:text-base lg:text-lg">Clear Vision. Better Style.</p>
          </div>

          <div className="w-full lg:max-w-md">
            <p className="font-semibold text-sm sm:text-base mb-1">Get 10% off your first order</p>
            <p className="text-xs sm:text-sm text-black/80 mb-3">
              Join our list for new arrivals, offers and eye-care tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col min-[480px]:flex-row gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-white rounded-full px-5 py-2.5 text-sm outline-none border border-transparent focus:border-black/60"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-black text-white text-sm font-semibold rounded-full px-6 py-2.5 hover:bg-black/80 transition-colors cursor-pointer whitespace-nowrap"
              >
                Subscribe <FiSend className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
            <p role="status" className="mt-2 text-xs sm:text-sm font-medium min-h-[1.25rem]">
              {subscribed ? "Thanks for subscribing! Check your inbox." : ""}
            </p>
          </div>
        </div>

        <div className="border-t-2 border-black/20" />

        {/* ---------- Link columns ---------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 py-10 sm:py-12">
          {/* About + social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 max-w-sm">
            <ColumnTitle>About us</ColumnTitle>
            <p className="text-sm sm:text-base leading-6 text-black/90">
              Quality prescription glasses, sunglasses and screen-protection eyewear, fitted with care and
              delivered to your door.
            </p>

            <p className="mt-6 mb-3 text-sm sm:text-base font-semibold">Follow us</p>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>Shop</ColumnTitle>
            <LinkList items={SHOP_LINKS} />
          </div>

          <div>
            <ColumnTitle>Customer care</ColumnTitle>
            <LinkList items={CARE_LINKS} />
          </div>

          <div>
            <ColumnTitle>Company</ColumnTitle>
            <LinkList items={COMPANY_LINKS} />
          </div>

          {/* Visit us */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <ColumnTitle>Visit us</ColumnTitle>
            <ul className="flex flex-col gap-3 text-sm sm:text-base text-black/90">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  Yellow brick road 111
                  <br />
                  Fantasy Land, Somewhere
                </address>
              </li>
              <li className="flex items-start gap-2.5">
                <FiPhone className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                <a href="tel:+12345678990" className="hover:underline break-words">
                  +1 234 567 89 90
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FiMail className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                <a href="mailto:info@form.com" className="hover:underline break-all">
                  info@form.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <FiClock className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p>Mon: 8am - 5pm</p>
                  <p>Tue-Fri: 11am - 6pm</p>
                  <p>Sat: 8am - 12pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-black/20" />

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 py-6">
          <p className="text-center lg:text-left text-xs sm:text-sm lg:text-base">
            © 2026 BabalEyeWear. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Accepted payment methods">
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m}
                className="bg-white/80 text-black text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-md"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm">
            <Link to="/privacy" className="hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="/terms" className="hover:underline underline-offset-4">
              Terms
            </Link>
            <Link to="/cookies" className="hover:underline underline-offset-4">
              Cookies
            </Link>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <FiArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;