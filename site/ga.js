/* Google Analytics 4 — impactos.co.il
   נטען רק אם: (1) הוגדר Measurement ID  (2) המבקר אישר קוקיז בבאנר.
   כדי להפעיל: ליצור נכס GA4 ב-analytics.google.com, להעתיק את המזהה
   (מתחיל ב-G-) ולהדביק אותו בשורה הבאה במקום המחרוזת הריקה. */
(function () {
  var GA_ID = '';                       /* ← להדביק כאן, למשל 'G-XXXXXXXXXX' */
  if (!GA_ID) return;                   /* אין מזהה — לא נטען כלום */
  var consent;
  try { consent = localStorage.getItem('cookie-choice'); } catch (e) { return; }
  if (consent !== 'accepted') return;   /* המבקר לא אישר קוקיז אנליטיים */

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
})();
