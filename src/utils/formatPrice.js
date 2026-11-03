export function formatPrice(amount, currency = 'NPR') {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '';
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);
  return `${currency} ${formatted}`;
}