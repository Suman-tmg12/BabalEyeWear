import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheck,
  FiAward,
  FiEye,
  FiTruck,
  FiShield,
  FiUsers,
  FiTool,
  FiStar,
  FiArrowRight,
} from 'react-icons/fi';

import product1 from '../assets/Products/product1.png';
import product2 from '../assets/Products/product2.png';
import product3 from '../assets/Products/product3.png';
import product4 from '../assets/Products/product4.png';

// ---------- Content (edit text here, not in the JSX) ----------
const HIGHLIGHTS = [
  'Premium Quality',
  'Stylish & Modern Design',
  'Customer Satisfaction',
  'Trusted & Reliable',
];

const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: '25,000+', label: 'Happy customers' },
  { value: '500+', label: 'Frames to choose from' },
  { value: '3', label: 'Stores and counting' },
];

const WHY_US = [
  {
    icon: FiAward,
    title: 'Premium materials',
    text: 'Italian acetate, titanium and scratch-resistant lenses, chosen to last for years.',
  },
  {
    icon: FiEye,
    title: 'Professional eye tests',
    text: 'Certified optometrists check your eyes so your prescription is always accurate.',
  },
  {
    icon: FiTool,
    title: 'Made to fit you',
    text: 'Every pair is measured, adjusted and fitted to your face before it leaves us.',
  },
  {
    icon: FiTruck,
    title: 'Fast, free delivery',
    text: 'Free shipping on orders over $50, delivered to your door in 3-5 business days.',
  },
  {
    icon: FiShield,
    title: '1-year warranty',
    text: 'Every frame is covered, with 30-day returns if you are not happy.',
  },
  {
    icon: FiUsers,
    title: 'Friendly expert help',
    text: 'Not sure which style suits you? Our team helps you pick, in store or online.',
  },
];

const STEPS = [
  { title: 'Choose your frame', text: 'Browse hundreds of styles or visit a store to try them on.' },
  { title: 'Add your prescription', text: 'Upload it, or book a free eye test with our optometrist.' },
  { title: 'We craft your pair', text: 'Lenses are cut, fitted and quality-checked by our lab.' },
  { title: 'Delivered to you', text: 'Free shipping and easy returns, with a warranty on every pair.' },
];

const TEAM = [
  { name: 'Aarav Sharma', role: 'Founder & Head Optician' },
  { name: 'Sita Gurung', role: 'Optometrist' },
  { name: 'Rohan Thapa', role: 'Lens Technician' },
  { name: 'Maya Rai', role: 'Customer Care Lead' },
];

const REVIEWS = [
  {
    name: 'Priya M.',
    text: 'The team took their time to find frames that actually suit my face. My new glasses are so comfortable.',
  },
  {
    name: 'Daniel K.',
    text: 'Quick delivery and the eye test was thorough. The blue-light lenses have really helped with my long screen days.',
  },
  {
    name: 'Anita S.',
    text: 'Great quality for the price. They fixed a small adjustment for free without any fuss.',
  },
];

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

// ---------- Small shared pieces ----------
const SectionHeading = ({ title, text, center = true }) => (
  <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-8 sm:mb-12`}>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
    {text && <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{text}</p>}
  </div>
);

function About() {
  return (
    <main className="bg-white text-gray-800">
      {/* ================= HERO ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text */}
          <div className="flex-1 space-y-5 sm:space-y-6 w-full">
            <p className="text-[#187A6B] font-semibold text-base sm:text-lg">About Us</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Clear Vision,
              <br className="hidden sm:block" /> Better Life
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
              et
            </p>

            <ul className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4 pt-1">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                    <FiCheck className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="text-gray-800 font-medium text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col min-[480px]:flex-row gap-3 pt-3">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 bg-[#187A6B] hover:bg-[#12665A] text-white font-medium px-7 py-3 rounded-full transition-colors duration-300 shadow-md"
              >
                Shop frames <FiArrowRight aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-gray-300 hover:border-[#187A6B] hover:text-[#187A6B] text-gray-800 font-medium px-7 py-3 rounded-full transition-colors duration-300"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={product1}
                alt="Round frame glasses from our collection"
                className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-3xl shadow-sm"
              />
              <img
                src={product2}
                alt="Square frame glasses from our collection"
                className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-3xl shadow-sm mt-6 sm:mt-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-[#54B8A9]/20 py-8 sm:py-10 px-5 sm:px-8 lg:px-16">
        <dl className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-xs sm:text-sm text-gray-600 mt-1">{s.label}</dt>
              <dd className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#187A6B]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={product3}
                alt="Aviator frame glasses"
                className="w-full h-44 sm:h-60 object-cover rounded-3xl"
              />
              <img
                src={product4}
                alt="Cat-eye frame glasses"
                className="w-full h-44 sm:h-60 object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Our story</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Babal Eyewear started with a simple idea: everyone deserves glasses that see clearly and look
              great, without paying a designer markup. What began as a small counter with a handful of frames
              has grown into a trusted local eyewear store.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Today we combine proper eye care with a carefully chosen collection of eyeglasses, sunglasses,
              reading glasses and screen glasses, and we still fit every pair by hand.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our promise is simple: honest advice, fair prices and glasses you will actually want to wear.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Why choose Babal Eyewear"
            text="From the eye test to the final fitting, we take care of every step."
          />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {WHY_US.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="How it works" text="Getting your new glasses takes four simple steps." />
          <ol className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex lg:flex-col items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#187A6B] text-white font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Meet our team" text="The people who will look after your eyes and your style." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 text-center">
                <div
                  className="mx-auto flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#187A6B] text-white text-xl sm:text-2xl font-bold"
                  aria-hidden="true"
                >
                  {initials(m.name)}
                </div>
                <h3 className="mt-4 text-sm sm:text-base font-semibold text-gray-900">{m.name}</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="What our customers say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col">
                <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed flex-1">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-gray-900">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 sm:px-8 lg:px-16 xl:px-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto bg-[#187A6B] rounded-3xl px-6 py-10 sm:px-12 sm:py-14 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Ready to see things clearly?</h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Book a free eye test at our store, or browse our latest frames online.
          </p>
          <div className="mt-6 flex flex-col min-[480px]:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="w-full min-[480px]:w-auto bg-white text-[#187A6B] font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Book a free eye test
            </Link>
            <Link
              to="/search"
              className="w-full min-[480px]:w-auto border border-white/70 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              Browse frames
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;