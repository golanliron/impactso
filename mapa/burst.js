// מפזר את כרטיסי הבלגן סביב המרכז. a = זווית במעלות (0 = ימין, 90 = למטה), d = מרחק יחסי מהמרכז.
(function () {
  var SHARDS = [
    { a: 200, d: .80, r: -14, html: '<div class="sh-card sh-mail"><b>Re: Re: Fwd: דחוף</b>שלחת כבר את הטופס?</div>' },
    { a: 338, d: .78, r: 11, html: '<div class="sh-card sh-xls"><div class="hd">סופי_באמת_v7.xlsx</div><table><tr><td class="h">A</td><td class="h">B</td><td class="h">C</td></tr><tr><td>64</td><td class="err">#REF!</td><td>?</td></tr><tr><td>576</td><td>—</td><td class="err">#N/A</td></tr><tr><td></td><td class="err">#DIV/0!</td><td></td></tr></table></div>' },
    { a: 155, d: .84, r: 9, html: '<div class="sh-card sh-notif"><i>23</i><span><b>טלפון</b>שיחות שלא נענו</span></div>' },
    { a: 25, d: .80, r: -9, html: '<div class="sh-sticky">לא לשכוח!!!<br>לתזכר את כולם</div>' },
    { a: 250, d: .72, r: 7, html: '<div class="sh-card sh-wa">מי מעדכן את הקובץ??</div>' },
    { a: 292, d: .74, r: -8, html: '<div class="sh-card sh-form"><b>טפסים שהוחזרו</b>7 מתוך 64<div class="bar"><span></span></div></div>' },
    { a: 112, d: .78, r: -12, html: '<div class="sh-card sh-cal"><b>יום שלישי</b><div style="background:#F00678">ישיבה</div><div style="background:#12C7C7">ישיבה</div><div style="background:#FF7A1A">עוד ישיבה</div></div>' },
    { a: 62, d: .80, r: 13, html: '<div class="sh-card"><b>דוח חודשי</b>לאסוף ידנית מ-12 קבצים</div>' },
    { a: 178, d: .98, r: -4, b: '1.5px', s: .8, o: .75, html: '<div class="sh-card sh-file"><i></i>דוח_נוכחות_סופי(3).xlsx</div>' },
    { a: 8, d: 1.0, r: 6, b: '2px', s: .75, o: .7, html: '<div class="sh-card sh-mail"><b>תזכורת שלישית</b>עוד לא קיבלנו ממך</div>' },
    { a: 225, d: 1.02, r: 18, b: '2.5px', s: .7, o: .6, html: '<div class="sh-sticky">להתקשר ל-40 הורים</div>' },
    { a: 318, d: 1.0, r: -16, b: '2px', s: .7, o: .65, html: '<div class="sh-card sh-wa">אפשר לשלוח שוב את הקישור?</div>' },
    { a: 135, d: 1.04, r: -20, b: '3px', s: .65, o: .55, html: '<div class="sh-card"><b>הערה</b>איפה הגרסה המעודכנת?</div>' },
    { a: 90, d: 1.05, r: 4, b: '2.5px', s: .7, o: .6, html: '<div class="sh-card sh-notif"><i>!</i><span>מועד ההגשה עבר</span></div>' },
    { a: 270, d: 1.0, r: -3, b: '2px', s: .7, o: .6, html: '<div class="sh-card sh-file"><i style="background:#2B579A"></i>נוהל_עדכני_2019.docx</div>' },
    { a: 45, d: 1.08, r: 0, b: '0', s: 1, html: '<div class="sh-big">23:40<small>ועדיין במיילים</small></div>' }
  ];

  function place(host) {
    var W = host.clientWidth, H = host.clientHeight;
    var rx = W / 2 * (+host.dataset.spreadX || .92), ry = H / 2 * (+host.dataset.spreadY || .86);
    var sc = +host.dataset.scale || 1;
    host.innerHTML = '';
    SHARDS.forEach(function (s, i) {
      var rad = s.a * Math.PI / 180, el = document.createElement('div');
      el.className = 'shard';
      el.style.setProperty('--x', (Math.cos(rad) * rx * s.d).toFixed(0) + 'px');
      el.style.setProperty('--y', (Math.sin(rad) * ry * s.d).toFixed(0) + 'px');
      el.style.setProperty('--r', s.r + 'deg');
      el.style.setProperty('--s', ((s.s || 1) * sc).toFixed(2));
      el.style.setProperty('--b', s.b || '0');
      el.style.setProperty('--o', s.o || 1);
      el.style.setProperty('--d', (i * 0.05) + 's');
      el.style.setProperty('--trail', (s.a + 180 - s.r) + 'deg');
      el.innerHTML = s.html;
      host.appendChild(el);
      avoid(host, el, s, rad, rx, ry);
    });
  }

  // דוחף רסיס החוצה לאורך הקרן שלו עד שהוא לא מכסה את הטקסט (data-avoid = סלקטור)
  function avoid(host, el, s, rad, rx, ry) {
    var sel = host.dataset.avoid; if (!sel) return;
    var boxes = [].map.call(host.parentNode.querySelectorAll(sel), function (n) { return n.getBoundingClientRect(); });
    if (!boxes.length) return;
    var pad = 14, d = s.d;
    el.style.animation = 'none';
    for (var k = 0; k < 40; k++) {
      var r = el.getBoundingClientRect(), hit = boxes.some(function (b) {
        return r.left < b.right + pad && r.right > b.left - pad && r.top < b.bottom + pad && r.bottom > b.top - pad;
      });
      if (!hit) break;
      d += .05;
      el.style.setProperty('--x', (Math.cos(rad) * rx * d).toFixed(0) + 'px');
      el.style.setProperty('--y', (Math.sin(rad) * ry * d).toFixed(0) + 'px');
    }
    el.style.animation = '';
  }

  function all() { document.querySelectorAll('.shards').forEach(place); }
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(all, 150); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all); else all();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
})();
