/* IMPACT OS · טופס "בואו נדבר" בדף הבית ובעמודי התחום
   ------------------------------------------------------------------
   הפנייה נשמרת ב-Supabase (site_leads) — וטריגר במסד שולח מיד
   התראת מייל ל-mlypeleg@gmail.com. אם השמירה נכשלת מכל סיבה,
   הטופס נופל לקישור mailto עם כל הפרטים, כך שאף פנייה לא הולכת לאיבוד.
   (הוואטסאפ נשאר רק כמספר בפוטר — לא כערוץ הפנייה הראשי.) */
(function () {
  'use strict';

  var SB_URL = 'https://rllbiktbrkzhzsjhahxb.supabase.co';
  var SB_KEY = 'sb_publishable_rb8KDlA3TBSOdAUaxZwYZg_7s1Sxs_p'; // מפתח פומבי — מוגן ב-RLS
  var TO_MAIL = 'mlypeleg@gmail.com';

  var form = document.querySelector('form.contact-form');
  if (!form) return;

  var product = form.getAttribute('data-product') || 'site';
  var statusBox = form.querySelector('.cf-status');
  var btn = form.querySelector('button[type="submit"]');
  var btnHtml = btn ? btn.innerHTML : '';

  function show(kind, html) {
    if (!statusBox) return;
    statusBox.className = 'cf-status ' + kind;
    statusBox.innerHTML = html;
    statusBox.hidden = false;
  }

  function val(name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : '';
  }

  function mailtoLink(data) {
    var body = 'שם: ' + data.full_name +
      (data.org_name ? '\nארגון: ' + data.org_name : '') +
      (data.email ? '\nאימייל: ' + data.email : '') +
      (data.phone ? '\nטלפון: ' + data.phone : '') +
      (data.message ? '\n\n' + data.message : '') +
      '\n\n(נשלח מהאתר impactos.co.il)';
    return 'mailto:' + TO_MAIL +
      '?subject=' + encodeURIComponent('פנייה מהאתר · ' + data.full_name) +
      '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var data = {
      product: product,
      full_name: val('full_name'),
      org_name: val('org_name') || null,
      phone: val('phone') || null,
      email: val('email') || null,
      message: val('message') || null,
      source_page: location.href.slice(0, 300)
    };

    if (!data.full_name) { show('err', 'רק השם חסר לנו 🙂'); return; }
    if (!data.phone && !data.email) {
      show('err', 'צריך אימייל או טלפון — כדי שיהיה לאן לחזור אליכם.');
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = 'שולחים…'; }

    fetch(SB_URL + '/rest/v1/site_leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var grid = form.querySelector('.cf-grid');
      var actions = form.querySelector('.cf-actions');
      var note = form.querySelector('.cf-note');
      if (grid) grid.hidden = true;
      if (actions) actions.hidden = true;
      if (note) note.hidden = true;
      show('ok', '✅ <b>הפנייה הגיעה אלינו.</b> נחזור אליכם בהקדם.');
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.innerHTML = btnHtml; }
      show('err',
        'לא הצלחנו לשלוח כרגע — אבל אפשר לשלוח את אותם פרטים ישירות במייל: ' +
        '<a href="' + mailtoLink(data) + '">✉️ פתיחת מייל אלינו</a>');
    });
  });
})();
