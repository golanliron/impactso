/* IMPACT OS · טופס לידים + מונה כניסות
   הלידים נשמרים ב-Supabase (site_leads, RLS: הכנסה בלבד לאנונימי).
   אם השמירה נכשלת מכל סיבה — הטופס נופל לוואטסאפ עם כל הפרטים,
   כך שאף ליד לא הולך לאיבוד. */
(function () {
  'use strict';
  var SB_URL = 'https://rllbiktbrkzhzsjhahxb.supabase.co';
  var SB_KEY = 'sb_publishable_rb8KDlA3TBSOdAUaxZwYZg_7s1Sxs_p'; // מפתח פומבי (publishable) — מוגן ב-RLS
  var WA_PHONE = '972536256653';

  function sbHeaders() {
    return {
      'Content-Type': 'application/json',
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY
    };
  }

  /* ── מונה כניסות: (יום, דף) בלבד — בלי קוקיז ובלי מידע אישי ── */
  try {
    fetch(SB_URL + '/rest/v1/rpc/log_site_visit', {
      method: 'POST',
      headers: sbHeaders(),
      body: JSON.stringify({ p_page: location.pathname }),
      keepalive: true
    }).catch(function () {});
  } catch (e) {}

  /* ── טופס הלידים ── */
  var form = document.querySelector('form.lead-form');
  if (!form) return;

  var product = form.getAttribute('data-product') || 'site';
  var msgBox = form.querySelector('.lead-msg');
  var btn = form.querySelector('button[type="submit"]');

  function show(kind, html) {
    if (!msgBox) return;
    msgBox.className = 'lead-msg ' + kind;
    msgBox.innerHTML = html;
    msgBox.hidden = false;
  }

  function waFallbackLink(data) {
    var text = 'היי, אשמח לערכת ההתנסות בחינם של ' + product + '.\n' +
      'שם: ' + data.full_name +
      (data.org_name ? '\nארגון: ' + data.org_name : '') +
      (data.phone ? '\nטלפון: ' + data.phone : '') +
      (data.email ? '\nאימייל: ' + data.email : '');
    return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(text);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var data = {
      product: product,
      full_name: (form.full_name.value || '').trim(),
      org_name: (form.org_name.value || '').trim() || null,
      phone: (form.phone.value || '').trim() || null,
      email: (form.email.value || '').trim() || null,
      source_page: location.href.slice(0, 300)
    };
    if (!data.full_name) { show('err', 'רק שם חסר לנו 🙂'); return; }
    if (!data.phone && !data.email) { show('err', 'צריך טלפון או אימייל — כדי שיהיה לאן לחזור אליכם.'); return; }

    if (btn) { btn.disabled = true; btn.textContent = 'שולחים…'; }

    fetch(SB_URL + '/rest/v1/site_leads', {
      method: 'POST',
      headers: Object.assign(sbHeaders(), { 'Prefer': 'return=minimal' }),
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.querySelectorAll('.lead-fields, .lead-submit').forEach(function (el) { el.hidden = true; });
      show('ok', '🎁 <b>קיבלנו!</b> נחזור אליכם בהקדם עם ערכת ההתנסות — בחינם וללא התחייבות.');
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = 'אני רוצה ערכת התנסות בחינם'; }
      show('err',
        'לא הצלחנו לשמור כרגע — אבל אל דאגה, אפשר לשלוח לנו את הפרטים בוואטסאפ בלחיצה אחת: ' +
        '<a href="' + waFallbackLink(data) + '" target="_blank" rel="noopener">📲 שליחה בוואטסאפ</a>');
    });
  });
})();
