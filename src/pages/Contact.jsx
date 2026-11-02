import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCheck,
  FiChevronDown,
  FiNavigation,
  FiEye,
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';

// ---------- Content (edit here, not in the JSX) ----------
const PHONE_DISPLAY = '+977 9800000000';
const PHONE_LINK = '+9779800000000';
const WHATSAPP_NUMBER = '9779800000000'; // digits only, with country code
const EMAIL = 'info@babaleyewear.com';
const ADDRESS = 'Boudha, Kathmandu, Nepal';
const MAP_QUERY = encodeURIComponent('Boudha, Kathmandu, Nepal');
const STORE_TIMEZONE = 'Asia/Kathmandu';

const OPEN_HOUR = 9; // 9:00 AM
const CLOSE_HOUR = 19; // 7:00 PM
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { label: 'TikTok', icon: FaTiktok, href: 'https://tiktok.com' },
  { label: 'YouTube', icon: FaYoutube, href: 'https://youtube.com' },
];

const SUBJECTS = [
  'Product question',
  'Order enquiry',
  'Eye test or appointment',
  'Repair or adjustment',
  'Feedback or suggestion',
  'Other',
];

const FAQS = [
  {
    q: 'Do I need an appointment to visit the store?',
    a: 'No. You are welcome to walk in during opening hours. For an eye test we recommend booking so you do not have to wait.',
  },
  {
    q: 'How soon will you reply to my message?',
    a: 'We reply to messages within one working day. For anything urgent, please call or message us on WhatsApp.',
  },
  {
    q: 'Can I get my glasses repaired or adjusted?',
    a: 'Yes. Bring them to the store and we will adjust, tighten or repair them. Simple adjustments are free.',
  },
];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 outline-none focus:border-[#187A6B] focus:ring-2 focus:ring-[#187A6B]/20 transition';

// Is the store open right now? Uses the store's own timezone, not the visitor's.
function getStoreStatus() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: STORE_TIMEZONE,
    weekday: 'long',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const day = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value);
  return { day, open: hour >= OPEN_HOUR && hour < CLOSE_HOUR };
}

const formatHour = (h) => `${h % 12 === 0 ? 12 : h % 12}:00 ${h >= 12 ? 'PM' : 'AM'}`;

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const { day: today, open: isOpen } = getStoreStatus();

  const updateField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `form` to your backend / email service here
    setSent(true);
    setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  };

  const contactCards = [
    {
      icon: FiPhone,
      title: 'Call us',
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_LINK}`,
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: 'Chat with us',
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
    },
    {
      icon: FiMail,
      title: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: FiMapPin,
      title: 'Visit us',
      value: ADDRESS,
      href: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
      external: true,
    },
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* ================= HEADER + CONTACT METHODS ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
            <p className="text-[#187A6B] font-semibold text-base sm:text-lg">Contact Us</p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              Have a question or suggestion, or need assistance? Our team is here to help you.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactCards.map(({ icon: Icon, title, value, href, external }) => (
              <a
                key={title}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-[#187A6B] transition-all duration-300"
              >
                <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#187A6B]/10 text-[#187A6B] group-hover:bg-[#187A6B] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-gray-500">{title}</span>
                  <span className="block text-sm font-medium text-gray-900 break-words">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM + HOURS ================= */}
      <section className="pb-12 sm:pb-16 lg:pb-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-3 border border-gray-200 rounded-3xl p-5 sm:p-8 shadow-sm bg-white">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Send Us a Message</h2>
            <p className="mt-1 text-sm text-gray-500 mb-6">We reply within one working day.</p>

            {sent ? (
              <div role="status" className="text-center py-10">
                <span className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#187A6B]/10 text-[#187A6B]">
                  <FiCheck className="w-7 h-7" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-900">Message sent</h3>
                <p className="mt-2 text-sm text-gray-600">Thank you for getting in touch. We will reply soon.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-[#187A6B] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={updateField}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Your email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={updateField}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Phone <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-1.5">
                      Subject
                    </label>
                    <select id="subject" name="subject" value={form.subject} onChange={updateField} className={inputClass}>
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1.5">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={updateField}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-[480px]:w-auto bg-[#187A6B] hover:bg-[#12665A] cursor-pointer text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-md text-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Hours + social */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="border border-gray-200 rounded-3xl p-5 sm:p-8 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900">
                  <FiClock className="w-5 h-5 text-[#187A6B]" aria-hidden="true" /> Opening hours
                </h2>
                <span
                  className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                    isOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isOpen ? 'Open now' : 'Closed now'}
                </span>
              </div>

              <ul className="divide-y divide-gray-100 text-sm">
                {DAYS.map((d) => (
                  <li
                    key={d}
                    className={`flex items-center justify-between py-2.5 ${
                      d === today ? 'font-semibold text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    <span>{d}</span>
                    <span>
                      {formatHour(OPEN_HOUR)} - {formatHour(CLOSE_HOUR)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-200 rounded-3xl p-5 sm:p-8 bg-white shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Follow us</h2>
              <p className="mt-1 text-sm text-gray-500">New arrivals and offers, every week.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#187A6B] text-white hover:bg-[#12665A] transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= MAP / VISIT STORE ================= */}
      <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Visit our store</h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Come visit us for the best in-person eyewear experience. Try on frames and get your eyes tested.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <iframe
              title="Babal Eyewear store location"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="w-full h-64 sm:h-80 lg:h-96 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6">
              <p className="flex items-start gap-2.5 text-sm sm:text-base text-gray-800">
                <FiMapPin className="w-5 h-5 mt-0.5 shrink-0 text-[#187A6B]" aria-hidden="true" />
                {ADDRESS}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#187A6B] hover:bg-[#12665A] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-300"
              >
                <FiNavigation aria-hidden="true" /> Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10">
            Quick answers
          </h2>
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
                      aria-controls={`contact-faq-${i}`}
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
                    <p id={`contact-faq-${i}`} className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12 rounded-3xl bg-[#187A6B] text-white p-6 sm:p-10 text-center">
            <FiEye className="w-8 h-8 mx-auto" aria-hidden="true" />
            <h3 className="mt-3 text-xl sm:text-2xl font-bold">Need an eye test?</h3>
            <p className="mt-2 text-sm sm:text-base text-white/90">
              Book an appointment with our optometrist in a few clicks.
            </p>
            <Link
              to="/services"
              className="mt-5 inline-flex bg-white text-[#187A6B] font-semibold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Book an eye test
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;