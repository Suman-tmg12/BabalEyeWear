// Every word in the query must appear somewhere in the product text.
// Matches that start with the first word, or contain every word in the name, rank higher.
export function searchProducts(list = [], query = '', limit = 6) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return { items: [], total: 0 };

  const matches = [];

  for (const p of list) {
    const name = (p.name || '').toLowerCase();
    const haystack = [p.name, p.brand, p.shape, p.description]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (!terms.every((t) => haystack.includes(t))) continue;

    let score = 0;
    if (name.startsWith(terms[0])) score += 3;
    if (terms.every((t) => name.includes(t))) score += 2;

    matches.push({ product: p, score });
  }

  matches.sort(
    (a, b) =>
      b.score - a.score || (a.product.name || '').localeCompare(b.product.name || '')
  );

  return {
    items: matches.slice(0, limit).map((m) => m.product),
    total: matches.length,
  };
}