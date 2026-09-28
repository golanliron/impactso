/* IMPACT OS · מונה כניסות + מקור הגעה
   בלי קוקיז ובלי מידע אישי — נרשמים רק (יום, דף, כמה) ו-(יום, מקור, כמה).
   המקור: utm_source/utm_campaign מהקישור, ואם אין — הדומיין שממנו הגיעו
   (google, linkedin…), ואם גם זה אין — direct. נרשם פעם אחת בביקור
   (sessionStorage), רק בדף הנחיתה, כך שמעבר בין דפי האתר לא נספר כמקור.
   data-source-only על תגית הסקריפט = לא לספור את הדף (כבר נספר בדף עצמו). */
(function () {
  'use strict';
  var SB = 'https://rllbiktbrkzhzsjhahxb.supabase.co/rest/v1/rpc/log_site_visit';
  var K = 'sb_publishable_rb8KDlA3TBSOdAUaxZwYZg_7s1Sxs_p'; // מפתח פומבי — מוגן ב-RLS
  var me = document.currentScript;
  var sourceOnly = !!(me && me.hasAttribute('data-source-only'));

  function log(page) {
    try {
      fetch(SB, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': K, 'Authorization': 'Bearer ' + K },
        body: JSON.stringify({ p_page: page }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  function clean(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').slice(0, 40);
  }

  function refSource() {
    var host;
    try { host = new URL(document.referrer).hostname.replace(/^www\./, ''); } catch (e) { return 'direct'; }
    if (!host) return 'direct';
    if (host === location.hostname.replace(/^www\./, '')) return null; // ניווט פנימי
    if (/(^|\.)google\./.test(host)) return 'google';
    if (/linkedin\.com$|^lnkd\.in$/.test(host)) return 'linkedin';
    if (/facebook\.com$|^fb\.me$/.test(host)) return 'facebook';
    if (/instagram\.com$/.test(host)) return 'instagram';
    if (/whatsapp\.com$/.test(host)) return 'whatsapp';
    if (/^t\.co$|(^|\.)x\.com$|twitter\.com$/.test(host)) return 'x';
    if (/bing\.com$/.test(host)) return 'bing';
    if (/mail\.|outlook\./.test(host)) return 'email';
    return clean(host);
  }

  if (!sourceOnly) log(location.pathname);

  try {
    if (sessionStorage.getItem('impact-src')) return;
    sessionStorage.setItem('impact-src', '1');
  } catch (e) { return; }

  var q = new URLSearchParams(location.search);
  var src = q.get('utm_source') ? clean(q.get('utm_source')) : refSource();
  if (!src) return;
  var camp = q.get('utm_campaign') ? '|' + clean(q.get('utm_campaign')) : '';
  log('src:' + src + camp + '|' + location.pathname.slice(0, 100));
})();
