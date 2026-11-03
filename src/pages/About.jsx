import React, { useEffect, useRef, useState } from 'react';
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
  FiMapPin,
} from 'react-icons/fi';

import product1 from '../assets/Products/product1.png';
import product2 from '../assets/Products/product2.png';
import product3 from '../assets/Products/product3.png';
import product4 from '../assets/Products/product4.png';

// ---------- Content (edit text and numbers here, not in the JSX) ----------
const HIGHLIGHTS = [
  'Premium Quality',
  'Stylish & Modern Design',
  'Customer Satisfaction',
  'Trusted & Reliable',
];

// `to` makes a stat a link. Stores point to the contact page until you have a store-locations page.
const STATS = [
  { end: 10, suffix: '+', label: 'Years of experience' },
  { end: 25000, suffix: '+', label: 'Happy customers' },
  { end: 500, suffix: '+', label: 'Frames to choose from' },
  { end: 3, suffix: '', label: 'Stores and counting', to: '/contact', icon: FiMapPin },
];

// Confirm these before going live
const FREE_SHIPPING_TEXT = 'Free shipping on qualifying orders, delivered to your door in 3-5 business days.';

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
    text: FREE_SHIPPING_TEXT,
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
  { name: 'Pankaj Dahal', role: 'Founder & Head Optician' },
  { name: 'Sita Gurung', role: 'Optometrist' },
  { name: 'Rohan Thapa', role: 'Lens Technician' },
  { name: 'Maya Rai', role: 'Customer Care Lead' },
  { name: 'Suman Tamang', role: 'Developer' },
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

// ---------- Count-up stat: animates once when it scrolls into view ----------
const COUNT_DURATION_MS = 1600;

const CountStat = ({ end, suffix = '', label, to, icon: Icon }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setValue(end);
      return undefined;
    }

    let frame = 0;
    let started = false;

    const animate = () => {
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min((now - startTime) / COUNT_DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setValue(Math.round(end * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  const inner = (
    <>
      <dd className="flex items-center justify-center gap-2 text-2xl font-bold text-[#187A6B] sm:text-3xl lg:text-4xl">
        {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
        <span className="tabular-nums">
          {value.toLocaleString('en-US')}
          {suffix}
        </span>
      </dd>
      <dt className="mt-1 text-xs text-gray-600 sm:text-sm">{label}</dt>
    </>
  );

  return (
    <div ref={ref} className="rounded-2xl px-2 py-3 sm:py-4">
      {to ? (
        <Link
          to={to}
          className="group block rounded-xl transition-colors hover:bg-white/60"
          aria-label={`${value} ${label}. View our stores and contact details`}
        >
          {inner}
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#187A6B] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Find a store <FiArrowRight aria-hidden="true" />
          </span>
        </Link>
      ) : (
        inner
      )}
    </div>
  );
};

// ---------- Small shared piece ----------
const SectionHeading = ({ title, text, center = true }) => (
  <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-8 sm:mb-12`}>
    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">{title}</h2>
    {text && <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{text}</p>}
  </div>
);

const SECTION_PAD = 'px-4 min-[400px]:px-5 sm:px-8 lg:px-16 xl:px-24';

function About() {
  return (
    <main className="overflow-x-hidden bg-white text-gray-800">
      {/* ================= HERO ================= */}
      <section className={`py-10 sm:py-16 lg:py-20 ${SECTION_PAD}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Text */}
          <div className="w-full flex-1 space-y-5 text-center sm:space-y-6 lg:text-left">
            <p className="text-base font-semibold text-[#187A6B] sm:text-lg">About Us</p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Clear Vision,
              <br className="hidden sm:block" /> Better Life
            </h1>

            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
              et
            </p>

            <ul className="grid grid-cols-1 gap-3 pt-1 text-left min-[480px]:grid-cols-2 sm:gap-4">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                    <FiCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-gray-800 sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col justify-center gap-3 pt-3 min-[480px]:flex-row lg:justify-start">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#187A6B] px-7 py-3 font-medium text-white shadow-md transition-colors duration-300 hover:bg-[#12665A]"
              >
                Shop frames <FiArrowRight aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-7 py-3 font-medium text-gray-800 transition-colors duration-300 hover:border-[#187A6B] hover:text-[#187A6B]"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="w-full max-w-xl flex-1 lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={product1}
                alt="Round frame glasses from our collection"
                loading="lazy"
                className="h-40 w-full rounded-3xl object-cover shadow-sm min-[400px]:h-48 sm:h-64 lg:h-72"
              />
              <img
                src={product2}
                alt="Square frame glasses from our collection"
                loading="lazy"
                className="mt-4 h-40 w-full rounded-3xl object-cover shadow-sm min-[400px]:h-48 sm:mt-10 sm:h-64 lg:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className={`bg-[#54B8A9]/20 py-8 sm:py-10 ${SECTION_PAD}`}>
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-3 text-center sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s) => (
            <CountStat key={s.label} {...s} />
          ))}
        </dl>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className={`py-10 sm:py-16 lg:py-20 ${SECTION_PAD}`}>
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full flex-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={product3}
                alt="Aviator frame glasses"
                loading="lazy"
                className="h-40 w-full rounded-3xl object-cover min-[400px]:h-48 sm:h-60"
              />
              <img
                src={product4}
                alt="Cat-eye frame glasses"
                loading="lazy"
                className="h-40 w-full rounded-3xl object-cover min-[400px]:h-48 sm:h-60"
              />
            </div>
          </div>

          <div className="w-full flex-1 space-y-4 sm:space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Our story</h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Babal Eyewear started with a simple idea: everyone deserves glasses that see clearly and look
              great, without paying a designer markup. What began as a small counter with a handful of frames
              has grown into a trusted local eyewear store.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Today we combine proper eye care with a carefully chosen collection of eyeglasses, sunglasses,
              reading glasses and screen glasses, and we still fit every pair by hand.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              Our promise is simple: honest advice, fair prices and glasses you will actually want to wear.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className={`bg-gray-50 py-10 sm:py-16 lg:py-20 ${SECTION_PAD}`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Why choose Babal Eyewear"
            text="From the eye test to the final fitting, we take care of every step."
          />
          <div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {WHY_US.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-lg sm:p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900 sm:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className={`py-10 sm:py-16 lg:py-20 ${SECTION_PAD}`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="How it works" text="Getting your new glasses takes four simple steps." />
          <ol className="grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 lg:flex-col">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#187A6B] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className={`bg-gray-50 py-10 sm:py-16 lg:py-20 ${SECTION_PAD}`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Meet our team"
            text="The people who will look after your eyes and your style."
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-gray-200 bg-white p-4 text-center sm:p-6"
              >
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#187A6B] text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl"
                  aria-hidden="true"
                >
                  {initials(m.name)}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900 sm:text-base">{m.name}</h3>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className={`py-10 sm:py-16 lg:py-20 ${SECTION_PAD}`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="What our customers say" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
              >
                <div className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-gray-900">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={`pb-10 sm:pb-16 lg:pb-20 ${SECTION_PAD}`}>
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#187A6B] px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Ready to see things clearly?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 sm:text-base">
            Book a free eye test at our store, or browse our latest frames online.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 min-[480px]:flex-row">
            <Link
              to="/contact"
              className="w-full rounded-full bg-white px-7 py-3 font-semibold text-[#187A6B] transition-colors duration-300 hover:bg-gray-100 min-[480px]:w-auto"
            >
              Book a free eye test
            </Link>
            <Link
              to="/search"
              className="w-full rounded-full border border-white/70 px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10 min-[480px]:w-auto"
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