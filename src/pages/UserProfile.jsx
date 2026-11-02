import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Package, FileText, Heart, MapPin, Settings,
  Plus, X, LogOut, Check, Trash2, Pencil
} from 'lucide-react';

import { Glasses } from '../components/ProductCard';
import { getUser, getDisplayName, logout } from '../utils/auth';

// ---------------------------------------------------------------
// CONSTANTS & HELPERS
// ---------------------------------------------------------------
const BRAND = 'bg-[#187A6B] hover:bg-[#126456] text-white';

const TABS = [
  { id: 'orders', label: 'My orders', icon: Package },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
  { id: 'saved', label: 'Saved frames', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'settings', label: 'Account settings', icon: Settings },
];

const ORDER_STEPS = ['Order placed', 'Lenses in production', 'Shipped', 'Delivered'];

const npr = (n) => `NPR ${n.toLocaleString('en-US')}`;

const todayLocal = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

const initials = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || 'U';

const inputCls = (hasError) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#187A6B] focus:ring-1 focus:ring-[#187A6B] ${
    hasError ? 'border-rose-400' : 'border-slate-300'
  }`;

// ---------------------------------------------------------------
// SAMPLE DATA (replace with your API data)
// ---------------------------------------------------------------
// Sample orders, prescriptions, frames and addresses below show only while developing
// (npm run dev). In a production build the lists start empty until you load real data.
const DEMO = import.meta.env.DEV;

// The logged-in user saved by Login.jsx
const buildUser = () => {
  const stored = getUser() || {};
  return {
    name: getDisplayName(stored) || 'Customer',
    email: stored.email || '',
    phone: stored.phone ? String(stored.phone) : '',
  };
};

const INITIAL_ORDERS = [
  {
    id: 'ORD-88492',
    date: 'Oct 24, 2026',
    step: 1,
    total: 4500,
    items: [{ name: 'Classic Aviator Blue Cut', detail: 'Anti-glare lens, single vision', price: 4500 }],
  },
  {
    id: 'ORD-87310',
    date: 'Sep 02, 2026',
    step: 3,
    total: 3499,
    items: [{ name: 'Urban Matte Black', detail: 'Zero power, blue light filter', price: 3499 }],
  },
];

const INITIAL_RX = [
  {
    id: 'rx-1',
    name: 'Daily reading and screen',
    doctor: 'Dr. A. Sharma, Tilganga Eye Center',
    date: '2026-10-12',
    odS: '-1.50', odC: '-0.50', odA: '180',
    osS: '-1.75', osC: '-0.25', osA: '175',
    pd: '63',
  },
];

const INITIAL_SAVED = [
  { id: 'frame-1', name: 'Urban Matte Black', shape: 'Square', category: 'Eyeglasses', price: 3499 },
  { id: 'frame-2', name: 'Vintage Tortoise', shape: 'Round', category: 'Reading', price: 4200 },
];

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1', label: 'Home', name: 'Suman Tamang', phone: '9812345678',
    street: 'Bouddha, Jorpati Road', city: 'Kathmandu', isDefault: true,
  },
];

// ---------------------------------------------------------------
// SMALL SHARED COMPONENTS
// ---------------------------------------------------------------
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/40 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <h2 className="font-bold text-slate-900">{title}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      {children}
      {error && <span className="block text-xs text-rose-600 mt-1">{error}</span>}
    </label>
  );
}

function EmptyState({ title, text, action }) {
  return (
    <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center">
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-500 mt-1">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function SectionHeader({ title, text, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {text && <p className="text-sm text-slate-500 mt-0.5">{text}</p>}
      </div>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------
// TAB: ORDERS
// ---------------------------------------------------------------
function OrdersTab({ orders }) {
  return (
    <div>
      <SectionHeader title="My orders" text="Follow your glasses from the lab to your door." />

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          text="Your orders will show up here once you place one."
          action={<Link to="/search" className={`inline-block text-sm font-semibold px-4 py-2 rounded-lg ${BRAND}`}>Browse frames</Link>}
        />
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const delivered = order.step === ORDER_STEPS.length - 1;
            return (
              <article key={order.id} className="border border-slate-200 rounded-xl">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 bg-slate-50 rounded-t-xl border-b border-slate-200 text-sm">
                  <div>
                    <p className="text-slate-500">Order</p>
                    <p className="font-semibold text-slate-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Placed on</p>
                    <p className="font-medium text-slate-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Total</p>
                    <p className="font-semibold text-slate-900">{npr(order.total)}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      delivered ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {ORDER_STEPS[order.step]}
                  </span>
                </div>

                <div className="px-5 py-4">
                  <ul className="divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between gap-4 py-2 text-sm">
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-slate-500">{item.detail}</p>
                        </div>
                        <p className="text-slate-700 shrink-0">{npr(item.price)}</p>
                      </li>
                    ))}
                  </ul>

                  <ol className="grid grid-cols-4 gap-1.5 mt-5" aria-label="Order progress">
                    {ORDER_STEPS.map((label, i) => (
                      <li key={label}>
                        <div className={`h-1.5 rounded-full ${i <= order.step ? 'bg-[#187A6B]' : 'bg-slate-200'}`} />
                        <p className={`mt-1.5 text-[11px] sm:text-xs leading-tight ${i <= order.step ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                          {label}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 text-sm">
                    <Link to="/contact" className="text-[#187A6B] font-semibold hover:underline">
                      Need help with this order?
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// TAB: PRESCRIPTIONS
// ---------------------------------------------------------------
const EMPTY_RX = {
  name: '', doctor: '', date: '',
  odS: '', odC: '', odA: '',
  osS: '', osC: '', osA: '',
  pd: '',
};

const num = (v) => (v.trim() === '' ? NaN : Number(v));
const isQuarter = (n) => Math.abs(n * 4 - Math.round(n * 4)) < 1e-9;
const signed = (n) => `${n > 0 ? '+' : ''}${n.toFixed(2)}`;

function validateRx(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Give this prescription a name';
  if (!f.date) e.date = 'Enter the date on your prescription';
  else if (f.date > todayLocal()) e.date = 'The date cannot be in the future';

  ['od', 'os'].forEach((eye) => {
    const s = num(f[`${eye}S`]);
    if (Number.isNaN(s) || s < -20 || s > 20 || !isQuarter(s)) {
      e[`${eye}S`] = 'Sphere: -20 to +20 in steps of 0.25';
    }
    const cText = f[`${eye}C`].trim();
    const c = cText === '' ? 0 : Number(cText);
    if (Number.isNaN(c) || c < -6 || c > 6 || !isQuarter(c)) {
      e[`${eye}C`] = 'Cylinder: -6 to +6 in steps of 0.25';
    } else if (c !== 0) {
      const a = Number(f[`${eye}A`]);
      if (f[`${eye}A`].trim() === '' || !Number.isInteger(a) || a < 1 || a > 180) {
        e[`${eye}A`] = 'Axis: whole number from 1 to 180';
      }
    }
  });

  const pd = num(f.pd);
  if (Number.isNaN(pd) || pd < 40 || pd > 80) e.pd = 'PD should be between 40 and 80 mm';
  return e;
}

function normalizeRx(f) {
  const out = { ...f, name: f.name.trim(), doctor: f.doctor.trim(), pd: String(Number(f.pd)) };
  ['od', 'os'].forEach((eye) => {
    out[`${eye}S`] = signed(Number(f[`${eye}S`]));
    const c = f[`${eye}C`].trim() === '' ? 0 : Number(f[`${eye}C`]);
    out[`${eye}C`] = c === 0 ? '' : signed(c);
    out[`${eye}A`] = c === 0 ? '' : String(Number(f[`${eye}A`]));
  });
  return out;
}

function PrescriptionForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const found = validateRx(form);
    setErrors(found);
    if (Object.keys(found).length === 0) onSave(normalizeRx(form));
  };

  const eyeRow = (eye, label) => {
    const msgs = ['S', 'C', 'A'].map((k) => errors[`${eye}${k}`]).filter(Boolean);
    return (
      <div key={eye}>
        <div className="grid grid-cols-[4.5rem_1fr_1fr_1fr] gap-2 items-center">
          <span className="text-sm font-medium text-slate-800">{label}</span>
          <input aria-label={`${label} sphere`} value={form[`${eye}S`]} onChange={set(`${eye}S`)} placeholder="-1.50" className={inputCls(errors[`${eye}S`])} />
          <input aria-label={`${label} cylinder`} value={form[`${eye}C`]} onChange={set(`${eye}C`)} placeholder="-0.50" className={inputCls(errors[`${eye}C`])} />
          <input aria-label={`${label} axis`} value={form[`${eye}A`]} onChange={set(`${eye}A`)} placeholder="180" className={inputCls(errors[`${eye}A`])} />
        </div>
        {msgs.length > 0 && <p className="text-xs text-rose-600 mt-1 ml-[4.5rem] pl-2">{msgs.join(' / ')}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <Field label="Prescription name" error={errors.name}>
        <input value={form.name} onChange={set('name')} placeholder="e.g. Daily reading" className={inputCls(errors.name)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Doctor or clinic (optional)">
          <input value={form.doctor} onChange={set('doctor')} className={inputCls(false)} />
        </Field>
        <Field label="Prescription date" error={errors.date}>
          <input type="date" max={todayLocal()} value={form.date} onChange={set('date')} className={inputCls(errors.date)} />
        </Field>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-[4.5rem_1fr_1fr_1fr] gap-2 text-xs font-medium text-slate-500">
          <span />
          <span>Sphere</span>
          <span>Cylinder</span>
          <span>Axis</span>
        </div>
        {eyeRow('od', 'Right (OD)')}
        {eyeRow('os', 'Left (OS)')}
        <p className="text-xs text-slate-500">Leave cylinder and axis empty if your prescription has none.</p>
      </div>

      <Field label="Pupillary distance, PD (mm)" error={errors.pd}>
        <input value={form.pd} onChange={set('pd')} placeholder="63" className={inputCls(errors.pd)} />
      </Field>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-100">
          Cancel
        </button>
        <button type="submit" className={`px-5 py-2 text-sm font-semibold rounded-lg ${BRAND}`}>
          Save prescription
        </button>
      </div>
    </form>
  );
}

function PrescriptionsTab({ items, setItems, notify }) {
  const [editing, setEditing] = useState(null); // null | 'new' | prescription object

  const save = (rx) => {
    if (editing === 'new') {
      setItems((list) => [{ ...rx, id: `rx-${Date.now()}` }, ...list]);
      notify('Prescription saved');
    } else {
      setItems((list) => list.map((r) => (r.id === editing.id ? { ...rx, id: r.id } : r)));
      notify('Prescription updated');
    }
    setEditing(null);
  };

  const remove = (rx) => {
    if (!window.confirm(`Delete "${rx.name}"? This cannot be undone.`)) return;
    setItems((list) => list.filter((r) => r.id !== rx.id));
    notify('Prescription deleted');
  };

  const addButton = (
    <button onClick={() => setEditing('new')} className={`flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-lg shrink-0 ${BRAND}`}>
      <Plus className="w-4 h-4" /> Add prescription
    </button>
  );

  return (
    <div>
      <SectionHeader
        title="Prescriptions"
        text="Save your eye measurements once and pick them at checkout."
        action={items.length > 0 ? addButton : null}
      />

      {items.length === 0 ? (
        <EmptyState
          title="No prescriptions saved"
          text="Add one to order prescription lenses faster."
          action={addButton}
        />
      ) : (
        <div className="space-y-5">
          {items.map((rx) => (
            <article key={rx.id} className="border border-slate-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{rx.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {rx.doctor ? `${rx.doctor}, ` : ''}{formatDate(rx.date)}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button aria-label={`Edit ${rx.name}`} onClick={() => setEditing(rx)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button aria-label={`Delete ${rx.name}`} onClick={() => remove(rx)} className="p-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm min-w-[320px]">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-200">
                      <th className="py-2 pr-3 font-medium">Eye</th>
                      <th className="py-2 px-3 font-medium">Sphere</th>
                      <th className="py-2 px-3 font-medium">Cylinder</th>
                      <th className="py-2 pl-3 font-medium">Axis</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-900">
                    {[['Right (OD)', 'od'], ['Left (OS)', 'os']].map(([label, eye]) => (
                      <tr key={eye} className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-3 font-medium">{label}</td>
                        <td className="py-2.5 px-3">{rx[`${eye}S`]}</td>
                        <td className="py-2.5 px-3">{rx[`${eye}C`] || '-'}</td>
                        <td className="py-2.5 pl-3">{rx[`${eye}A`] ? `${rx[`${eye}A`]}°` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-700 mt-3">
                <span className="font-medium">PD:</span> {rx.pd} mm
              </p>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing === 'new' ? 'Add prescription' : 'Edit prescription'} onClose={() => setEditing(null)}>
          <PrescriptionForm
            initial={editing === 'new' ? EMPTY_RX : editing}
            onSave={save}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// TAB: SAVED FRAMES
// ---------------------------------------------------------------
function SavedTab({ items, setItems, notify }) {
  const remove = (frame) => {
    setItems((list) => list.filter((f) => f.id !== frame.id));
    notify('Removed from saved frames');
  };

  return (
    <div>
      <SectionHeader title="Saved frames" text="Frames you liked, ready when you are." />

      {items.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          text="Tap the heart on any frame to keep it here."
          action={<Link to="/search" className={`inline-block text-sm font-semibold px-4 py-2 rounded-lg ${BRAND}`}>Browse frames</Link>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((frame) => (
            <article key={frame.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="relative h-40 bg-slate-50 overflow-hidden">
                <Glasses shape={frame.shape} />
                <button
                  aria-label={`Remove ${frame.name} from saved frames`}
                  onClick={() => remove(frame)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white border border-slate-200 text-rose-500 hover:bg-rose-50"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900">{frame.name}</h3>
                <p className="text-sm text-slate-500">{frame.shape} / {frame.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-semibold text-slate-900">{npr(frame.price)}</p>
                  <Link to={`/product/${frame.id}`} className={`text-sm font-semibold px-3.5 py-2 rounded-lg ${BRAND}`}>
                    Choose lenses
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// TAB: ADDRESSES
// ---------------------------------------------------------------
const EMPTY_ADDRESS = { label: '', name: '', phone: '', street: '', city: '' };

const cleanPhone = (v) => v.replace(/[\s-]/g, '').replace(/^\+977/, '');

function AddressForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.label.trim()) found.label = 'e.g. Home or Office';
    if (!form.name.trim()) found.name = 'Enter the receiver’s name';
    if (!/^9[78]\d{8}$/.test(cleanPhone(form.phone))) found.phone = 'Enter a 10-digit mobile number starting with 97 or 98';
    if (!form.street.trim()) found.street = 'Enter the street or tole';
    if (!form.city.trim()) found.city = 'Enter the city';
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSave({
        ...form,
        label: form.label.trim(),
        name: form.name.trim(),
        phone: cleanPhone(form.phone),
        street: form.street.trim(),
        city: form.city.trim(),
      });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Label" error={errors.label}>
          <input value={form.label} onChange={set('label')} placeholder="Home" className={inputCls(errors.label)} />
        </Field>
        <Field label="Receiver’s name" error={errors.name}>
          <input value={form.name} onChange={set('name')} className={inputCls(errors.name)} />
        </Field>
      </div>
      <Field label="Mobile number" error={errors.phone}>
        <input value={form.phone} onChange={set('phone')} placeholder="98XXXXXXXX" className={inputCls(errors.phone)} />
      </Field>
      <Field label="Street / tole" error={errors.street}>
        <input value={form.street} onChange={set('street')} className={inputCls(errors.street)} />
      </Field>
      <Field label="City" error={errors.city}>
        <input value={form.city} onChange={set('city')} placeholder="Kathmandu" className={inputCls(errors.city)} />
      </Field>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-100">
          Cancel
        </button>
        <button type="submit" className={`px-5 py-2 text-sm font-semibold rounded-lg ${BRAND}`}>
          Save address
        </button>
      </div>
    </form>
  );
}

function AddressesTab({ items, setItems, notify }) {
  const [editing, setEditing] = useState(null); // null | 'new' | address object

  const save = (addr) => {
    if (editing === 'new') {
      setItems((list) => [...list, { ...addr, id: `addr-${Date.now()}`, isDefault: list.length === 0 }]);
      notify('Address added');
    } else {
      setItems((list) => list.map((a) => (a.id === editing.id ? { ...a, ...addr } : a)));
      notify('Address updated');
    }
    setEditing(null);
  };

  const makeDefault = (id) => {
    setItems((list) => list.map((a) => ({ ...a, isDefault: a.id === id })));
    notify('Default address changed');
  };

  const remove = (addr) => {
    if (!window.confirm(`Delete the "${addr.label}" address?`)) return;
    setItems((list) => {
      const rest = list.filter((a) => a.id !== addr.id);
      if (rest.length && !rest.some((a) => a.isDefault)) rest[0] = { ...rest[0], isDefault: true };
      return rest;
    });
    notify('Address deleted');
  };

  const addButton = (
    <button onClick={() => setEditing('new')} className={`flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-lg shrink-0 ${BRAND}`}>
      <Plus className="w-4 h-4" /> Add address
    </button>
  );

  return (
    <div>
      <SectionHeader
        title="Addresses"
        text="Where we deliver your glasses."
        action={items.length > 0 ? addButton : null}
      />

      {items.length === 0 ? (
        <EmptyState title="No saved addresses" text="Add one to speed up checkout." action={addButton} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((addr) => (
            <article
              key={addr.id}
              className={`rounded-xl p-5 border ${addr.isDefault ? 'border-[#187A6B] ring-1 ring-[#187A6B]' : 'border-slate-200'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900">{addr.label}</h3>
                {addr.isDefault && (
                  <span className="text-xs font-semibold text-[#187A6B] bg-[#187A6B]/10 px-2 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-sm text-slate-700 mt-2">{addr.name}</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                {addr.street}<br />{addr.city}, Nepal
              </p>
              <p className="text-sm text-slate-500 mt-1">+977 {addr.phone}</p>

              <div className="flex items-center gap-4 mt-4 text-sm font-semibold">
                <button onClick={() => setEditing(addr)} className="text-slate-700 hover:text-slate-900">Edit</button>
                <button onClick={() => remove(addr)} className="text-rose-600 hover:text-rose-700">Delete</button>
                {!addr.isDefault && (
                  <button onClick={() => makeDefault(addr.id)} className="text-[#187A6B] hover:underline ml-auto">
                    Make default
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing === 'new' ? 'Add address' : 'Edit address'} onClose={() => setEditing(null)}>
          <AddressForm
            initial={editing === 'new' ? EMPTY_ADDRESS : editing}
            onSave={save}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// TAB: SETTINGS
// ---------------------------------------------------------------
function SettingsTab({ user, setUser, notify }) {
  const [profile, setProfile] = useState({ name: user.name, email: user.email, phone: user.phone });
  const [profileErrors, setProfileErrors] = useState({});
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwErrors, setPwErrors] = useState({});

  const saveProfile = (e) => {
    e.preventDefault();
    const found = {};
    if (!profile.name.trim()) found.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(profile.email.trim())) found.email = 'Enter a valid email address';
    if (profile.phone.trim() && !/^9[78]\d{8}$/.test(cleanPhone(profile.phone))) {
      found.phone = 'Enter a 10-digit mobile number starting with 97 or 98';
    }
    setProfileErrors(found);
    if (Object.keys(found).length) return;
    // TODO: send to your API here
    setUser({ name: profile.name.trim(), email: profile.email.trim(), phone: cleanPhone(profile.phone) });
    notify('Profile updated');
  };

  const changePassword = (e) => {
    e.preventDefault();
    const found = {};
    if (!pw.current) found.current = 'Enter your current password';
    if (pw.next.length < 8) found.next = 'Use at least 8 characters';
    if (pw.confirm !== pw.next) found.confirm = 'Passwords do not match';
    setPwErrors(found);
    if (Object.keys(found).length) return;
    // TODO: send to your API here
    setPw({ current: '', next: '', confirm: '' });
    notify('Password changed');
  };

  return (
    <div>
      <SectionHeader title="Account settings" text="Keep your contact details and password up to date." />

      <form onSubmit={saveProfile} noValidate className="max-w-md space-y-4">
        <h3 className="font-bold text-slate-900">Your details</h3>
        <Field label="Full name" error={profileErrors.name}>
          <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputCls(profileErrors.name)} />
        </Field>
        <Field label="Email address" error={profileErrors.email}>
          <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputCls(profileErrors.email)} />
        </Field>
        <Field label="Mobile number" error={profileErrors.phone}>
          <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="98XXXXXXXX" className={inputCls(profileErrors.phone)} />
        </Field>
        <button type="submit" className={`px-5 py-2 text-sm font-semibold rounded-lg ${BRAND}`}>Save changes</button>
      </form>

      <form onSubmit={changePassword} noValidate className="max-w-md space-y-4 mt-10 pt-8 border-t border-slate-200">
        <h3 className="font-bold text-slate-900">Change password</h3>
        <Field label="Current password" error={pwErrors.current}>
          <input type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} className={inputCls(pwErrors.current)} />
        </Field>
        <Field label="New password" error={pwErrors.next}>
          <input type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className={inputCls(pwErrors.next)} />
        </Field>
        <Field label="Confirm new password" error={pwErrors.confirm}>
          <input type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className={inputCls(pwErrors.confirm)} />
        </Field>
        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800">
          Update password
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------
export default function UserProfile() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const requested = params.get('tab');
  const tab = TABS.some((t) => t.id === requested) ? requested : 'orders';
  const setTab = (id) => setParams({ tab: id }, { replace: true });

  const [user, setUser] = useState(buildUser);
  const [orders] = useState(DEMO ? INITIAL_ORDERS : []);
  const [prescriptions, setPrescriptions] = useState(DEMO ? INITIAL_RX : []);
  const [saved, setSaved] = useState(DEMO ? INITIAL_SAVED : []);
  const [addresses, setAddresses] = useState(DEMO ? INITIAL_ADDRESSES : []);

  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const notify = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const handleLogout = () => {
    logout(); // clears token + user and tells the Navbar
    navigate('/Auth/Login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-full bg-[#187A6B] text-white text-lg font-bold flex items-center justify-center shrink-0">
              {initials(user.name)}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">{user.name}</h1>
              <p className="text-sm text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg px-3.5 py-2 hover:bg-slate-50 shrink-0"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        {/* Mobile tabs */}
        <nav aria-label="Account sections" className="lg:hidden -mx-4 sm:mx-0 mb-6 border-b border-slate-200 overflow-x-auto">
          <div className="flex gap-1 px-4 sm:px-0 min-w-max">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id ? 'page' : undefined}
                className={`px-3 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${
                  tab === id ? 'border-[#187A6B] text-[#187A6B]' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <nav aria-label="Account sections" className="sticky top-28 flex flex-col border-l border-slate-200">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id ? 'page' : undefined}
                className={`flex items-center gap-3 text-left text-sm font-medium px-4 py-2.5 -ml-px border-l-2 ${
                  tab === id
                    ? 'border-[#187A6B] text-[#187A6B] bg-[#187A6B]/5'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          {tab === 'orders' && <OrdersTab orders={orders} />}
          {tab === 'prescriptions' && (
            <PrescriptionsTab items={prescriptions} setItems={setPrescriptions} notify={notify} />
          )}
          {tab === 'saved' && <SavedTab items={saved} setItems={setSaved} notify={notify} />}
          {tab === 'addresses' && (
            <AddressesTab items={addresses} setItems={setAddresses} notify={notify} />
          )}
          {tab === 'settings' && <SettingsTab user={user} setUser={setUser} notify={notify} />}
        </main>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-full shadow-xl flex items-center gap-2 max-w-[92vw]"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toast}</span>
        </div>
      )}
    </div>
  );
}