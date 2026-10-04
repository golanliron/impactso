// מיפוי צוות · impactos · השאלון (גרסה 1, אוקטובר 2026)
// שתי תבניות מאותו בסיס: s = בית ספר, n = עמותה או ארגון.
// טקסט שונה בין התבניות כתוב כ-{ s: '...', n: '...' }. אפשרות או שאלה רק לתבנית אחת: only: 's' / 'n'.
// התשובות נשמרות לפי id. לא לשנות id קיים אחרי שהשאלון יצא, כי הדשבורד וההשוואות נשענים עליו.
var MIPUI_SURVEY = {
  id: 'ai1',
  title: 'איך הצוות שלנו משתמש ב-AI',
  intro: { s: 'שאלון קצר, כ-4 דקות. הנהלת בית הספר תראה את התשובות שלך, כדי לבנות לצוות ליווי שבאמת עוזר.',
           n: 'שאלון קצר, כ-4 דקות. הנהלת הארגון תראה את התשובות שלך, כדי לבנות לצוות ליווי שבאמת עוזר.' },
  questions: [
    { id: 'name', type: 'name', q: 'מה השם המלא שלך?' },
    { id: 'role', type: 'one', q: { s: 'מה התפקיד או תחום ההוראה העיקרי שלך?', n: 'מה התפקיד העיקרי שלך בארגון?' },
      opts: [
        { id: 'math', only: 's', t: 'מתמטיקה ומדעים' },
        { id: 'lang', only: 's', t: 'שפות (עברית, ערבית, אנגלית)' },
        { id: 'hum', only: 's', t: 'מקצועות הומניים וחברה' },
        { id: 'tech', only: 's', t: 'מקצוע טכנולוגי או מגמה' },
        { id: 'edu', only: 's', t: 'חינוך, ייעוץ וריכוז' },
        { id: 'mng', t: 'הנהלה' },
        { id: 'prog', only: 'n', t: 'ניהול תוכניות ורכזות' },
        { id: 'field', only: 'n', t: 'עבודה ישירה עם משתתפים או לקוחות' },
        { id: 'fund', only: 'n', t: 'גיוס משאבים, שיווק ותקשורת' },
        { id: 'ops', t: 'כספים, מנהלה ותפעול' },
        { id: 'oth', t: 'אחר' }
      ] },
    { id: 'sen', type: 'one', q: { s: 'כמה שנים את/ה בחינוך?', n: 'כמה שנים את/ה בתפקיד הנוכחי?' },
      opts: [
        { id: 's1', t: 'עד 3 שנים' },
        { id: 's2', t: '4 עד 10' },
        { id: 's3', t: '11 עד 20' },
        { id: 's4', t: 'יותר מ-20' }
      ] },
    { id: 'freq', type: 'one', q: 'בחודש האחרון, באיזו תדירות השתמשת בכלי AI בעבודה?',
      opts: [
        { id: 'never', t: 'אף פעם' },
        { id: 'tried', t: 'ניסיתי פעם או פעמיים' },
        { id: 'week', t: 'בערך כל שבוע' },
        { id: 'day', t: 'כמעט כל יום' }
      ] },
    { id: 'tools', type: 'many', max: 3, skipIf: { freq: 'never' }, q: 'באילו כלים השתמשת?', hint: 'עד 3',
      opts: [
        { id: 'chatgpt', t: 'ChatGPT' },
        { id: 'gemini', t: 'Gemini' },
        { id: 'claude', t: 'Claude' },
        { id: 'copilot', t: 'Copilot' },
        { id: 'notebooklm', t: 'NotebookLM' },
        { id: 'canva', t: 'Canva (כלי ה-AI)' },
        { id: 'magic', only: 's', t: 'MagicSchool' },
        { id: 'inapp', t: 'AI בתוך תוכנה שכבר יש לנו' },
        { id: 'other', t: 'כלי אחר' }
      ] },
    { id: 'use', type: 'many', max: 3, skipIf: { freq: 'never' }, q: 'לשם מה?', hint: 'עד 3',
      opts: [
        { id: 'prep', only: 's', t: 'הכנת שיעורים וחומרים' },
        { id: 'tests', only: 's', t: 'מבחנים ומשימות' },
        { id: 'feedback', only: 's', t: 'משוב לתלמידים' },
        { id: 'diff', only: 's', t: 'התאמה לתלמידים שונים' },
        { id: 'write', only: 'n', t: 'כתיבה: מיילים, פוסטים ומכתבים' },
        { id: 'meet', only: 'n', t: 'סיכומי ישיבות ומסמכים' },
        { id: 'data', only: 'n', t: 'דוחות, נתונים וטבלאות' },
        { id: 'grant', only: 'n', t: 'בקשות למענקים ופניות לתורמים' },
        { id: 'plan', only: 'n', t: 'תכנון פעילויות ותוכניות' },
        { id: 'visual', t: 'מצגות, תמונות וסרטונים' },
        { id: 'admin', only: 's', t: 'מנהלה: מיילים, דוחות, הודעות' }
      ] },
    { id: 'class', type: 'one', only: 's', q: 'בחודש האחרון, כמה פעמים תלמידים שלך עבדו עם AI במשימה שתכננת?',
      opts: [
        { id: 'c0', t: 'אף פעם' },
        { id: 'c1', t: 'פעם אחת' },
        { id: 'c2', t: '2 עד 3 פעמים' },
        { id: 'c3', t: 'כל שבוע' }
      ] },
    { id: 'conf', type: 'scale', q: 'עד כמה את/ה מרגיש/ה בטוח/ה בשימוש ב-AI?', ends: ['בכלל לא', 'מאוד'] },
    { id: 'right', type: 'grid', q: 'עד כמה המשפטים נכונים לגבייך?', ends: ['לא נכון', 'נכון מאוד'],
      items: [
        { id: 'r1', t: 'אני יודע/ת לבדוק את מה שה-AI מייצר לפני שאני משתמש/ת בו' },
        { id: 'r2', t: 'אני יודע/ת אילו פרטים אסור להכניס ל-AI' },
        { id: 'r3', t: { s: 'אני יודע/ת מה מותר ומה אסור בבית הספר שלנו בנושא AI', n: 'אני יודע/ת מה מותר ומה אסור בארגון שלנו בנושא AI' } }
      ] },
    { id: 'ready', type: 'scale', q: 'כמה את/ה מוכן/ה לנסות משהו חדש השנה?', ends: ['בכלל לא', 'מאוד'] },
    { id: 'place', type: 'grid', q: { s: 'ובבית הספר שלנו…', n: 'ובארגון שלנו…' }, ends: ['לא נכון', 'נכון מאוד'],
      items: [
        { id: 'sc1', t: 'יש לי למי לפנות כשאני נתקע/ת עם כלי AI' },
        { id: 'sc2', t: 'בצוות שלנו משתפים ולומדים יחד על AI' },
        { id: 'sc3', t: { s: 'בית הספר מעודד לנסות דרכים חדשות ללמד', n: 'הארגון מעודד לנסות דרכים חדשות לעבוד' } }
      ] },
    { id: 'block', type: 'many', max: 3, q: 'מה מעכב אותך?', hint: 'עד 3',
      opts: [
        { id: 'time', t: 'אין לי זמן ללמוד את זה' },
        { id: 'know', t: 'לא יודע/ת מאיפה להתחיל' },
        { id: 'cheat', only: 's', t: 'חשש שתלמידים יעתיקו' },
        { id: 'quality', only: 'n', t: 'חשש מטעויות ומאיכות התוצאה' },
        { id: 'ethics', t: 'שאלות של אתיקה ופרטיות' },
        { id: 'access', t: 'אין ציוד או גישה מתאימה' },
        { id: 'policy', t: { s: 'לא ברור מה מותר בבית הספר', n: 'לא ברור מה מותר בארגון' } },
        { id: 'noneed', t: 'לא רואה בזה צורך' },
        { id: 'none', t: 'שום דבר, אני כבר בפנים', solo: true }
      ] },
    { id: 'learn', type: 'many', max: 2, q: 'איך הכי נוח לך ללמוד כלי חדש?', hint: 'עד 2',
      opts: [
        { id: 'meeting', t: 'בישיבת צוות, כולנו יחד' },
        { id: 'peer', t: 'עמית/ה שיושב/ת לידי ליד המחשב' },
        { id: 'video', t: 'סרטון קצר שאפשר לחזור אליו' },
        { id: 'course', t: 'הדרכה מסודרת' },
        { id: 'alone', t: 'לבד, בקצב שלי' }
      ] },
    { id: 'help', type: 'text', q: 'מה הכי היה עוזר לך השנה בנושא הזה?' },
    { id: 'story', type: 'text', optional: true, q: 'ספר/י על פעם ש-AI עזר לך, או על התלבטות שיש לך', hint: 'לא חובה' },
    { id: 'first', type: 'one', q: 'רוצה להיות בצוות הראשון שמנסה?',
      opts: [
        { id: 'yes', t: 'כן, אשמח' },
        { id: 'maybe', t: 'אולי, ספרו לי עוד' },
        { id: 'no', t: 'לא כרגע' }
      ] }
  ]
};

// הטקסט לפי סוג הארגון
function mT(x, type) { return x == null ? '' : (typeof x === 'string' ? x : (x[type] || x.s)); }

// השאלון של סוג ארגון מסוים: בלי מה שלא שייך אליו, וכל הטקסטים כבר מחרוזות
function mSurvey(type) {
  function keep(o) { return !o.only || o.only === type; }
  return {
    id: MIPUI_SURVEY.id,
    title: mT(MIPUI_SURVEY.title, type),
    intro: mT(MIPUI_SURVEY.intro, type),
    questions: MIPUI_SURVEY.questions.filter(keep).map(function (q) {
      var c = { id: q.id, type: q.type, q: mT(q.q, type) };
      ['max', 'skipIf', 'optional', 'ends'].forEach(function (k) { if (q[k] != null) c[k] = q[k]; });
      if (q.hint) c.hint = mT(q.hint, type);
      if (q.opts) c.opts = q.opts.filter(keep).map(function (o) { return { id: o.id, t: mT(o.t, type), solo: o.solo }; });
      if (q.items) c.items = q.items.map(function (it) { return { id: it.id, t: mT(it.t, type) }; });
      return c;
    })
  };
}
