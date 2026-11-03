import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiTarget,
  FiEye,
  FiStar,
  FiCheckCircle,
  FiLayers,
  FiAward,
  FiSearch,
  FiMapPin,
  FiPhone,
  FiClock,
  FiRefreshCw,
  FiPackage,
  FiHeart,
  FiUsers,
  FiBriefcase,
  FiArrowRight,
} from 'react-icons/fi';

import product3 from '../assets/Products/product3.png';
import product4 from '../assets/Products/product4.png';

// ---------- Content (edit text and numbers here, not in the JSX) ----------
const MVV = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    text: 'To make quality eye care and stylish eyewear affordable and easy to get for everyone we serve.',
  },
  {
    icon: FiEye,
    title: 'Our Vision',
    text: 'To be the most trusted eyewear brand in our community, known for honest advice and lasting quality.',
  },
  {
    icon: FiStar,
    title: 'Our Values',
    text: 'Integrity, care for every customer, attention to detail and a commitment to doing things properly.',
  },
];

// `end` is the number the counter reaches. `suffix` is shown after it.
// `href` is for in-page anchors, `to` is for routes.
const STATS = [
  { end: 10, suffix: '+', label: 'Years of experience' },
  { end: 25, suffix: 'K+', label: 'Happy customers' },
  { end: 500, suffix: '+', label: 'Products' },
  { end: 50, suffix: '+', label: 'Brands', href: '#brands' },
];

const MILESTONES = [
  { year: '2014', text: 'Babal Eyewear opens its first small store.' },
  { year: '2017', text: 'We set up our own lens-fitting lab.' },
  { year: '2020', text: 'The online store goes live for nationwide delivery.' },
  { year: '2023', text: 'Our third store opens, with in-house eye tests.' },
  { year: '2026', text: 'We reach 25,000 happy customers.' },
];

const QUALITY = [
  {
    icon: FiCheckCircle,
    title: 'Every pair is inspected',
    text: 'Frames and lenses are checked for fit, alignment and finish before they are packed.',
  },
  {
    icon: FiLayers,
    title: 'Lens protection',
    text: 'Anti-scratch, anti-reflective and UV400 options available on our lenses.',
  },
  {
    icon: FiAward,
    title: 'Trusted suppliers',
    text: 'We buy from established frame and lens makers and keep proof of every purchase.',
  },
  {
    icon: FiSearch,
    title: 'Qualified eye care',
    text: 'Eye tests are carried out by trained optometrists using modern equipment.',
  },
];

const BRANDS = [
  'Babal Signature',
  'Babal Studio',
  'Babal Atelier',
  'Babal Tech',
  'Babal Basics',
  'Babal Executive',
];

const STORES = [
  {
    name: 'Main Store',
    address: 'Yellow brick road 111, Fantasy Land',
    phone: '+1 234 567 89 90',
    hours: 'Mon-Sat, 9am - 6pm',
  },
  {
    name: 'City Centre Store',
    address: '24 Market Street, Somewhere',
    phone: '+1 234 567 89 91',
    hours: 'Mon-Sat, 10am - 7pm',
  },
  {
    name: 'Eye Test Clinic',
    address: '8 Health Avenue, Somewhere',
    phone: '+1 234 567 89 92',
    hours: 'By appointment',
  },
];

const COMMUNITY = [
  {
    icon: FiRefreshCw,
    title: 'Recycle your old glasses',
    text: 'Drop off glasses you no longer use and we will clean, repair and donate them.',
  },
  {
    icon: FiPackage,
    title: 'Less packaging waste',
    text: 'Recyclable cases, paper wrapping and no unnecessary plastic in your parcel.',
  },
  {
    icon: FiHeart,
    title: 'Community eye camps',
    text: 'Regular free eye-screening days for people who find it hard to reach a clinic.',
  },
];

const COUNT_DURATION_MS = 1800;

// ---------- Count-up number: runs once when it scrolls into view ----------
const useCountUp = (end, ref) => {
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

    const run = () => {
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
          run();
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
  }, [end, ref]);

  return value;
};

// ---------- Small shared pieces ----------
const SectionHeading = ({ title, text }) => (
  <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">{title}</h2>
    {text && <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{text}</p>}
  </div>
);

const StatCard = ({ end, suffix = '', label, href }) => {
  const ref = useRef(null);
  const value = useCountUp(end, ref);

  const card = (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white/80 px-3 py-5 text-center shadow-sm sm:py-7">
      <dd className="order-first text-3xl font-bold leading-none text-[#187A6B] tabular-nums sm:text-4xl lg:text-5xl">
        {value.toLocaleString('en-US')}
        {suffix}
      </dd>
      <dt className="mt-2 text-xs leading-snug text-gray-600 sm:text-sm lg:text-base">{label}</dt>
    </div>
  );

  const linkClass =
    'block h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#187A6B] focus-visible:ring-offset-2';

  if (href) {
    return (
      <div ref={ref} className="h-full">
        <a href={href} className={linkClass}>
          {card}
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} className="h-full">
      {card}
    </div>
  );
};

function Company() {
  return (
    <main className="bg-white text-gray-800">
      {/* ================= HERO + MISSION / VISION / VALUES ================= */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full flex-1 space-y-5 sm:space-y-6">
            <p className="text-base font-semibold text-[#187A6B] sm:text-lg">Our Company</p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Driven by Purpose,
              <br className="hidden sm:block" /> Focused on You
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

            <div className="grid grid-cols-1 gap-5 pt-2 sm:gap-6 min-[560px]:grid-cols-3">
              {MVV.map(({ icon: Icon, title, text }) => (
                <div key={title} className="space-y-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#187A6B] bg-[#187A6B]/10 text-[#187A6B]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-gray-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xl flex-1 lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={product3}
                alt="Aviator frame glasses"
                className="h-48 w-full rounded-3xl object-cover shadow-sm sm:h-64 lg:h-72"
              />
              <img
                src={product4}
                alt="Cat-eye frame glasses"
                className="mt-6 h-48 w-full rounded-3xl object-cover shadow-sm sm:mt-10 sm:h-64 lg:h-72"
              />
            </div>
          </div>
        </div>

        {/* Stats: each number counts up when it scrolls into view */}
        <dl className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s) => (
            <StatCard key={s.label} end={s.end} suffix={s.suffix} label={s.label} href={s.href} />
          ))}
        </dl>
      </section>

      {/* ================= JOURNEY TIMELINE ================= */}
      <section className="bg-gray-50 px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Our journey"
            text="A few milestones from small shop to trusted eyewear brand."
          />

          <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {/* Line: vertical on phones, horizontal on large screens */}
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[9px] top-2 w-0.5 bg-[#187A6B]/30 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[10px] lg:h-0.5 lg:w-auto"
            />

            {MILESTONES.map((m) => (
              <li key={m.year} className="relative pl-10 lg:pl-0 lg:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-5 w-5 rounded-full border-4 border-[#187A6B] bg-white lg:top-0"
                />
                <p className="text-xl font-bold text-[#187A6B] sm:text-2xl">{m.year}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= QUALITY ================= */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Quality you can trust"
            text="We stand behind every frame and lens that leaves our store."
          />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 min-[560px]:grid-cols-2 lg:grid-cols-4">
            {QUALITY.map(({ icon: Icon, title, text }) => (
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

      {/* ================= BRANDS ================= */}
      <section id="brands" className="scroll-mt-28 bg-gray-50 px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Brands we carry" text="Browse each collection in our online catalog." />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b) => (
              <Link
                key={b}
                to={`/search?q=${encodeURIComponent(b)}`}
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-5 text-center text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-[#187A6B] hover:text-[#187A6B] hover:shadow-md sm:py-6 sm:text-base"
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STORES ================= */}
      <section id="stores" className="scroll-mt-28 px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Visit our stores" text="Try on frames and get your eyes tested in person." />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {STORES.map((s) => (
              <div key={s.name} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{s.name}</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2.5">
                    <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    {s.address}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="hover:underline">
                      {s.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiClock className="mt-0.5 h-4 w-4 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    {s.hours}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY & RESPONSIBILITY ================= */}
      <section className="bg-[#54B8A9]/20 px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Caring beyond the counter"
            text="Good eyesight should be available to everyone, and we try to leave things better than we found them."
          />
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {COMMUNITY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#187A6B]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAREERS / PARTNERS ================= */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 xl:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <div className="flex flex-col items-start rounded-3xl bg-[#187A6B] p-6 text-white sm:p-10">
            <FiUsers className="h-8 w-8" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold sm:text-2xl">Join our team</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90 sm:text-base">
              We are always looking for friendly opticians, technicians and customer-care people who care about
              getting things right.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#187A6B] transition-colors duration-300 hover:bg-gray-100"
            >
              See opportunities <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-col items-start rounded-3xl border border-gray-200 bg-white p-6 sm:p-10">
            <FiBriefcase className="h-8 w-8 text-[#187A6B]" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">Partner with us</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
              Interested in wholesale, corporate eye-care programmes or supplying frames? Get in touch and
              we will respond within two working days.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#187A6B] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#12665A]"
            >
              Contact us <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Company;