// מיפוי צוות · impactos · עזרים משותפים לשאלון ולדף המנהל/ת
// השרת: זמנית בחשבון mlypeleg@gmail.com. במעבר לחשבון של impactos מחליפים רק את הכתובת הזו.
var MIPUI_API = 'https://script.google.com/macros/s/AKfycbwnA84k5md-4Tf4whV8WymV5ZVorJgXFZFXWwQN6-qSW7XKR0Tei2MY9gi_4iP1ONW-/exec';
var MIPUI_BASE = 'https://impactos.co.il/mipui/';
// הלידים נכנסים לאותה טבלה של האתר, ומשם יוצאת ההתראה במייל
var MIPUI_SB = 'https://rllbiktbrkzhzsjhahxb.supabase.co';
var MIPUI_SB_KEY = 'sb_publishable_rb8KDlA3TBSOdAUaxZwYZg_7s1Sxs_p';

function mEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function mStore(key, val) {
  try {
    if (val === undefined) { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val));
  } catch (e) { return null; }
}

// GET עם זמן קצוב. Apps Script לפעמים נתקע במופע חדש, אז מנסים שוב פעם אחת.
function mGet(params, timeoutMs) {
  var qs = Object.keys(params).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&');
  var url = MIPUI_API + '?' + qs;
  function once(ms) {
    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var t = ctl ? setTimeout(function () { ctl.abort(); }, ms) : null;
    return fetch(url, ctl ? { signal: ctl.signal } : {}).then(function (r) { if (t) clearTimeout(t); return r.json(); });
  }
  return once(timeoutMs || 25000).catch(function () { return once(30000); });
}

// POST בגוף text/plain כדי שלא תהיה בקשת preflight. השרת מחזיר JSON.
function mPost(body) {
  return fetch(MIPUI_API, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  }).then(function (r) { return r.json(); });
}

// ליד לטבלת האתר (site_leads), באותה דרך כמו טופס הוובינר
function mLead(row) {
  if (!window.supabase) return Promise.reject(new Error('supabase'));
  return window.supabase.createClient(MIPUI_SB, MIPUI_SB_KEY).from('site_leads').insert(row).then(function (r) {
    if (r.error) throw r.error;
    return true;
  });
}

function mRid() {
  var a = '';
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var buf = (window.crypto && crypto.getRandomValues) ? crypto.getRandomValues(new Uint8Array(20)) : null;
  for (var i = 0; i < 20; i++) a += chars[(buf ? buf[i] : Math.floor(Math.random() * 256)) % chars.length];
  return a;
}
