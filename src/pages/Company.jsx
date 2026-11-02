import React from 'react';
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

import product1 from '../assets/Products/product1.png';
import product2 from '../assets/Products/product2.png';
import product3 from '../assets/Products/product3.png';
import product4 from '../assets/Products/product4.png';

// ---------- Content (edit text here, not in the JSX) ----------
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

const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: '25K+', label: 'Happy customers' },
  { value: '500+', label: 'Products' },
  { value: '50+', label: 'Brands' },
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

// ---------- Small shared piece ----------
const SectionHeading = ({ title, text }) => (
  <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
    {text && <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{text}</p>}
  </div>
);

function Company() {
  return (
    <main className="bg-white text-gray-800">
      {/* ================= HERO + MISSION / VISION / VALUES ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 space-y-5 sm:space-y-6 w-full">
            <p className="text-[#187A6B] font-semibold text-base sm:text-lg">Our Company</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Driven by Purpose,
              <br className="hidden sm:block" /> Focused on You
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

            <div className="grid grid-cols-1 min-[560px]:grid-cols-3 gap-5 sm:gap-6 pt-2">
              {MVV.map(({ icon: Icon, title, text }) => (
                <div key={title} className="space-y-3">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full border border-[#187A6B] text-[#187A6B] bg-[#187A6B]/10">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={product3}
                alt="Aviator frame glasses"
                className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-3xl shadow-sm"
              />
              <img
                src={product4}
                alt="Cat-eye frame glasses"
                className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-3xl shadow-sm mt-6 sm:mt-10"
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto mt-12 sm:mt-16">
          <dl className="border border-[#187A6B] rounded-2xl py-6 sm:py-8 px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-6 text-center">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse px-2 ${i % 2 === 1 ? 'border-l border-gray-200' : ''} ${
                  i > 0 ? 'lg:border-l lg:border-gray-200' : ''
                }`}
              >
                <dt className="text-xs sm:text-sm text-gray-600 mt-1">{s.label}</dt>
                <dd className="text-2xl sm:text-3xl font-extrabold text-gray-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= MILESTONES ================= */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our journey" text="A few milestones from small shop to trusted eyewear brand." />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {MILESTONES.map((m) => (
              <li
                key={m.year}
                className="border-l-2 lg:border-l-0 lg:border-t-2 border-[#187A6B] pl-5 lg:pl-0 lg:pt-5"
              >
                <p className="text-xl sm:text-2xl font-bold text-[#187A6B]">{m.year}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= QUALITY ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Quality you can trust"
            text="We stand behind every frame and lens that leaves our store."
          />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {QUALITY.map(({ icon: Icon, title, text }) => (
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

      {/* ================= BRANDS ================= */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Brands we carry"
            text="Browse each collection in our online catalog."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {BRANDS.map((b) => (
              <Link
                key={b}
                to={`/search?q=${encodeURIComponent(b)}`}
                className="flex items-center justify-center text-center bg-white border border-gray-200 rounded-xl px-3 py-5 sm:py-6 text-sm sm:text-base font-semibold text-gray-800 hover:border-[#187A6B] hover:text-[#187A6B] hover:shadow-md transition-all duration-300"
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STORES ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Visit our stores" text="Try on frames and get your eyes tested in person." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {STORES.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{s.name}</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2.5">
                    <FiMapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    {s.address}
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiPhone className="w-4 h-4 mt-0.5 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="hover:underline">
                      {s.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FiClock className="w-4 h-4 mt-0.5 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    {s.hours}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY & RESPONSIBILITY ================= */}
      <section className="bg-[#54B8A9]/20 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Caring beyond the counter"
            text="Good eyesight should be available to everyone, and we try to leave things better than we found them."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {COMMUNITY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#187A6B]">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-700 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAREERS / PARTNERS ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-3xl bg-[#187A6B] text-white p-6 sm:p-10 flex flex-col items-start">
            <FiUsers className="w-8 h-8" aria-hidden="true" />
            <h2 className="mt-4 text-xl sm:text-2xl font-bold">Join our team</h2>
            <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed flex-1">
              We are always looking for friendly opticians, technicians and customer-care people who care about
              getting things right.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-white text-[#187A6B] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              See opportunities <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 flex flex-col items-start">
            <FiBriefcase className="w-8 h-8 text-[#187A6B]" aria-hidden="true" />
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">Partner with us</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
              Interested in wholesale, corporate eye-care programmes or supplying frames? Get in touch and
              we will respond within two working days.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-[#187A6B] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#12665A] transition-colors duration-300"
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