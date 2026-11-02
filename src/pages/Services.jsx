import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiAperture,
  FiSun,
  FiEye,
  FiTool,
  FiHeadphones,
  FiCheck,
  FiChevronDown,
  FiArrowRight,
  FiCalendar,
  FiClock,
} from 'react-icons/fi';

// ---------- Content (edit text here, not in the JSX) ----------
const SERVICES = [
  {
    icon: FiShoppingBag,
    title: 'Premium Eyewear',
    desc: 'Hundreds of eyeglasses, sunglasses, reading and screen glasses from trusted brands, for every face and budget.',
    cta: 'Browse frames',
    to: '/search',
  },
  {
    icon: FiAperture,
    title: 'Prescription Lenses',
    desc: 'Single vision, progressive and blue-light lenses cut and fitted to your exact prescription.',
    cta: 'See lens options',
    to: '#lenses',
  },
  {
    icon: FiSun,
    title: 'UV Protection',
    desc: 'UV400 sunglasses and lens coatings that shield your eyes from harmful rays, including in prescription.',
    cta: 'Shop sunglasses',
    to: '/search?q=Sunglasses',
  },
  {
    icon: FiEye,
    title: 'Vision Testing',
    desc: 'A complete eye examination with a qualified optometrist, so your prescription is always up to date.',
    cta: 'Book a test',
    to: '#book',
  },
  {
    icon: FiTool,
    title: 'Repair & Maintenance',
    desc: 'Adjustments, nose-pad and screw replacement, and a professional clean to keep your glasses like new.',
    cta: 'Book a repair',
    to: '#book',
  },
  {
    icon: FiHeadphones,
    title: 'Customer Support',
    desc: 'Questions about an order, a fit or a prescription? Our team is happy to help by phone, email or in store.',
    cta: 'Contact us',
    to: '/contact',
  },
];

const LENSES = [
  {
    name: 'Zero Power',
    price: 'Included',
    text: 'Plain lenses for fashion frames.',
    features: ['Clear, scratch-resistant', 'Any frame shape'],
  },
  {
    name: 'Single Vision',
    price: 'From $25',
    text: 'For distance or reading correction.',
    features: ['Anti-reflective coating', 'Thin and light options'],
  },
  {
    name: 'Blue-Light Filter',
    price: 'From $35',
    text: 'Reduces strain on long screen days.',
    features: ['Filters HEV blue light', 'Prescription or plain'],
    highlight: true,
  },
  {
    name: 'Progressive',
    price: 'From $80',
    text: 'Distance, middle and near in one lens.',
    features: ['No visible line', 'Fitted to your measurements'],
  },
];

const CARE_ITEMS = [
  'Free frame adjustments, any time',
  'Nose-pad and screw replacement',
  'Ultrasonic lens cleaning',
  'Lens replacement in your existing frame',
];

const FAQS = [
  {
    q: 'How long does it take to make my glasses?',
    a: 'Most single-vision pairs are ready in 3-5 working days. Progressive and special-order lenses can take a little longer, and we will confirm the date when you order.',
  },
  {
    q: 'Do I need a prescription to order?',
    a: 'For prescription lenses, yes. You can upload a recent prescription, or book a free eye test with our optometrist. Fashion and zero-power frames do not need one.',
  },
  {
    q: 'Can you put new lenses in my old frames?',
    a: 'In most cases, yes. Bring your frames to any store and we will check they are suitable before we start.',
  },
  {
    q: 'What if my new glasses do not feel right?',
    a: 'Come back within 30 days and we will adjust, remake or exchange them. Every pair also has a 1-year warranty.',
  },
  {
    q: 'How much does an eye test cost?',
    a: 'Eye tests are free when you buy glasses from us. Otherwise a small fee applies, which we will tell you when you book.',
  },
];

const BOOKING_SERVICES = ['Eye test', 'Glasses repair or adjustment', 'Frame fitting', 'Contact lens advice'];
const STORES = ['Main Store', 'City Centre Store', 'Eye Test Clinic'];

const inputClass =
  'w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#187A6B] focus:ring-2 focus:ring-[#187A6B]/20 transition';

const SectionHeading = ({ title, text }) => (
  <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
    {text && <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{text}</p>}
  </div>
);

function Services() {
  const [openFaq, setOpenFaq] = useState(0);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: BOOKING_SERVICES[0],
    store: STORES[0],
    date: '',
    notes: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const scrollToId = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const updateField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleBooking = (e) => {
    e.preventDefault();
    // TODO: send `form` to your backend / email service here
    setBooked(true);
    setForm({ name: '', phone: '', service: BOOKING_SERVICES[0], store: STORES[0], date: '', notes: '' });
  };

  return (
    <main className="bg-white text-gray-800">
      {/* ================= HEADER + SERVICES GRID ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <p className="text-[#187A6B] font-semibold text-base sm:text-lg">Our Services</p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              What We Offer
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              From your first eye test to the final fitting, we provide complete eyewear services to take care of
              your vision and style.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SERVICES.map(({ icon: Icon, title, desc, cta, to }) => {
              const isAnchor = to.startsWith('#');
              const linkClasses =
                'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#187A6B] hover:text-[#12665A] transition-colors cursor-pointer';
              return (
                <div
                  key={title}
                  className="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-gray-900 text-base sm:text-lg">{title}</h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed flex-1">{desc}</p>
                  {isAnchor ? (
                    <button type="button" onClick={() => scrollToId(to.slice(1))} className={linkClasses}>
                      {cta} <FiArrowRight aria-hidden="true" />
                    </button>
                  ) : (
                    <Link to={to} className={linkClasses}>
                      {cta} <FiArrowRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 bg-[#187A6B] hover:bg-[#12665A] text-white font-medium px-8 py-3 rounded-full transition-colors duration-300 shadow-md"
            >
              Explore Our Collection <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= LENS OPTIONS ================= */}
      <section id="lenses" className="scroll-mt-24 bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Choose your lenses"
            text="Pick the lens that fits how you live. Our team will help you decide."
          />
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {LENSES.map((l) => (
              <div
                key={l.name}
                className={`relative flex flex-col rounded-2xl p-5 sm:p-6 border ${
                  l.highlight ? 'border-[#187A6B] bg-white shadow-lg' : 'border-gray-200 bg-white'
                }`}
              >
                {l.highlight && (
                  <span className="absolute -top-3 left-5 bg-[#187A6B] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-bold text-gray-900">{l.name}</h3>
                <p className="mt-1 text-xl sm:text-2xl font-bold text-[#187A6B]">{l.price}</p>
                <p className="mt-2 text-sm text-gray-600">{l.text}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <FiCheck className="w-4 h-4 mt-0.5 shrink-0 text-[#187A6B]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs sm:text-sm text-gray-500">
            Prices are a guide and added to the frame price. Exact cost depends on your prescription.
          </p>
        </div>
      </section>

      {/* ================= BOOKING + CARE ================= */}
      <section id="book" className="scroll-mt-24 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Info */}
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Book an eye test or repair
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Choose a store and a day that suits you and we will confirm your appointment by phone. Most visits
              take around 30 minutes.
            </p>

            <div className="rounded-2xl bg-[#54B8A9]/20 p-5 sm:p-6">
              <h3 className="font-semibold text-gray-900">Free care at every store</h3>
              <ul className="mt-3 space-y-2">
                {CARE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-800">
                    <FiCheck className="w-4 h-4 mt-1 shrink-0 text-[#187A6B]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col min-[480px]:flex-row gap-4 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#187A6B]" aria-hidden="true" /> Mon-Sat appointments
              </span>
              <span className="flex items-center gap-2">
                <FiClock className="w-4 h-4 text-[#187A6B]" aria-hidden="true" /> About 30 minutes
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            {booked ? (
              <div role="status" className="text-center py-8">
                <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                  <FiCheck className="w-7 h-7" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-900">Request received</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Thank you. We will call you shortly to confirm your appointment.
                </p>
                <button
                  type="button"
                  onClick={() => setBooked(false)}
                  className="mt-6 text-sm font-semibold text-[#187A6B] hover:underline cursor-pointer"
                >
                  Make another booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Full name
                    </label>
                    <input id="name" name="name" required value={form.name} onChange={updateField} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={updateField}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Service
                    </label>
                    <select id="service" name="service" value={form.service} onChange={updateField} className={inputClass}>
                      {BOOKING_SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="store" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Store
                    </label>
                    <select id="store" name="store" value={form.store} onChange={updateField} className={inputClass}>
                      {STORES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-800 mb-1.5">
                    Preferred date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    required
                    value={form.date}
                    onChange={updateField}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-800 mb-1.5">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={updateField}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#187A6B] hover:bg-[#12665A] text-white font-semibold py-3 rounded-full transition-colors duration-300 cursor-pointer"
                >
                  Request appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Frequently asked questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="bg-white border border-gray-200 rounded-xl">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 text-sm sm:text-base font-semibold text-gray-900 cursor-pointer"
                    >
                      {f.q}
                      <FiChevronDown
                        className={`w-5 h-5 shrink-0 text-[#187A6B] transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {open && (
                    <p id={`faq-panel-${i}`} className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto bg-[#187A6B] rounded-3xl px-6 py-10 sm:px-12 sm:py-14 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Not sure where to start?</h2>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Talk to our team. We will help you pick the right frames, lenses and fit.
          </p>
          <div className="mt-6 flex flex-col min-[480px]:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="w-full min-[480px]:w-auto bg-white text-[#187A6B] font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Talk to us
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

export default Services;