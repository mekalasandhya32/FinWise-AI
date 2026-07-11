/* Small utility helpers used across pages. */
window.FW = window.FW || {};

FW.qs = (sel, root = document) => root.querySelector(sel);
FW.qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

FW.formatCurrency = (value, currency = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(value) || 0);

FW.debounce = (fn, wait = 200) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
};
