export const escapeHtml = (value) => {
  if (value == null) return '';
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('`', '&#96;');
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isValidEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidIndianPhone = (value) =>
  typeof value === 'string' && /^\d{10}$/.test(value.trim());

export const normalizeUrl = (value) => (typeof value === 'string' ? value.trim().replace(/\/+$/, '') : '');
