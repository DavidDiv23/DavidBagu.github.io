/* =====================================================================
   Shared code for every page: icons, colors, header/footer, helpers.
   You normally never need to edit this file. Content lives in /data.
   ===================================================================== */
(function () {
  const ROOT = window.ROOT || "";

  /* ---------- icons (tarot symbols + UI) ---------- */
  function wheelSVG() {
    const P = (r, a) => [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
    const arc = (r, c, span) => { const a0 = (c - span / 2) * Math.PI / 180, a1 = (c + span / 2) * Math.PI / 180; const [x0, y0] = P(r, a0), [x1, y1] = P(r, a1); return `<path d="M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>`; };
    let s = `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="5"/>`;
    [30, 150, 270].forEach(c => s += arc(37, c, 88));
    [90, 210, 330].forEach(c => s += arc(27, c, 88));
    s += `<circle cx="50" cy="50" r="17" fill="none" stroke="currentColor" stroke-width="5"/>`;
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; const [qx, qy] = P(6, a + 0.9); const [ex, ey] = P(10, a); s += `<path d="M50 50 Q${qx.toFixed(2)} ${qy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/>`; }
    return s + `</svg>`;
  }
  const ICONS = {
    wheel: wheelSVG(),
    moon: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(1.1667) translate(-49.400 -50.000)"><path d="M74.75 17.16 A36 36 0 1 0 74.75 82.84 A33 33 0 0 1 74.75 17.16 Z" fill="currentColor"/></g></svg>`,
    key: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="28" cy="50" r="14" stroke="currentColor" stroke-width="6"/><path d="M42 50 H88 M72 50 V64 M84 50 V60" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
    blade: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(0.9130) translate(-50.000 -50.000)"><path d="M50 4 L55 13 L55 66 L45 66 L45 13 Z" fill="currentColor"/><path d="M35 69 H65" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><rect x="46" y="71" width="8" height="15" rx="2" fill="currentColor"/><circle cx="50" cy="91" r="5" fill="currentColor"/></g></svg>`,
    sword: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(0.9130) translate(-50.000 -50.000)"><path d="M50 4 L55 13 L55 66 L45 66 L45 13 Z" fill="currentColor"/><path d="M35 69 H65" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><rect x="46" y="71" width="8" height="15" rx="2" fill="currentColor"/><circle cx="50" cy="91" r="5" fill="currentColor"/></g></svg>`,
    wand: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(1.0133) translate(-50.300 -50.150)"><g transform="rotate(25 50 50)"><path d="M50.00 92.00 L50.00 12.00" stroke="currentColor" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M0 0 Q7 -8 0 -17 Q-7 -8 0 0 Z" fill="currentColor" transform="translate(50 30) rotate(-55) scale(0.9)"/><path d="M0 0 Q7 -8 0 -17 Q-7 -8 0 0 Z" fill="currentColor" transform="translate(50 46) rotate(50) scale(0.9)"/><path d="M0 0 Q7 -8 0 -17 Q-7 -8 0 0 Z" fill="currentColor" transform="translate(50 62) rotate(-55) scale(0.75)"/><circle cx="50" cy="10" r="5" fill="currentColor"/></g></g></svg>`,
    pentacle: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(0.9032) translate(-50.000 -50.000)"><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="5"/><path d="M50.00 12.00 L72.34 80.74 L13.86 38.26 L86.14 38.26 L27.66 80.74 Z" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" fill="none"/></g></svg>`,
    cup: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(1.0500) translate(-50.000 -51.000)"><path d="M24 14 H76 C76 44 64 58 50 58 C36 58 24 44 24 14 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round" fill="none"/><path d="M30 28 H70 C68 44 60 52 50 52 C40 52 32 44 30 28 Z" fill="currentColor"/><path d="M50.00 58.00 L50.00 80.00" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M32.00 88.00 L68.00 88.00" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/></g></svg>`,
    star: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6 L61 38 L95 38 L67 58 L78 92 L50 71 L22 92 L33 58 L5 38 L39 38 Z" fill="currentColor"/></svg>`,
    eye: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M6 50 C22 24 78 24 94 50 C78 76 22 76 6 50 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="50" r="13" fill="currentColor"/></svg>`,
    sun: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform="translate(50 50) scale(0.8936) translate(-50.000 -50.000)"><circle cx="50" cy="50" r="17.5" fill="currentColor"/><polygon points="50.00,3.00 46.86,29.24 53.14,29.24" fill="currentColor"/><polygon points="68.00,18.82 57.66,30.45 63.10,33.59" fill="currentColor"/><polygon points="90.70,26.50 66.41,36.90 69.55,42.34" fill="currentColor"/><polygon points="86.00,50.00 70.76,46.86 70.76,53.14" fill="currentColor"/><polygon points="90.70,73.50 69.55,57.66 66.41,63.10" fill="currentColor"/><polygon points="68.00,81.18 63.10,66.41 57.66,69.55" fill="currentColor"/><polygon points="50.00,97.00 53.14,70.76 46.86,70.76" fill="currentColor"/><polygon points="32.00,81.18 42.34,69.55 36.90,66.41" fill="currentColor"/><polygon points="9.30,73.50 33.59,63.10 30.45,57.66" fill="currentColor"/><polygon points="14.00,50.00 29.24,53.14 29.24,46.86" fill="currentColor"/><polygon points="9.30,26.50 30.45,42.34 33.59,36.90" fill="currentColor"/><polygon points="32.00,18.82 36.90,33.59 42.34,30.45" fill="currentColor"/></g></svg>`,
    play: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#1B1717" fill-opacity=".6" stroke="#EDEBDD" stroke-width="2"/><path d="M26 20 L46 32 L26 44 Z" fill="#EDEBDD"/></svg>`,
    chev: `<svg class="chev" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };
  /* Cards only use the six suit symbols. Older names map onto them; anything else becomes a pentacle. */
  const SUITS = ["moon", "sun", "sword", "wand", "cup", "pentacle"];
  const SUIT_ALIAS = { blade: "sword", wheel: "pentacle", star: "pentacle", eye: "sun", key: "wand" };
  const suit = name => SUITS.includes(name) ? name : (SUIT_ALIAS[name] || "pentacle");
  /* Cards use the four classic suits in a fixed order by position: 1 sword, 2 wand, 3 cup, 4 pentacle, 5 sword again… */
  const CARD_SUITS = ["sword", "wand", "cup", "pentacle"];
  const cardSuit = i => CARD_SUITS[((i % 4) + 4) % 4];
  /* Short label shown on a tarot card: `short`, or the system name. */
  const cardLabel = sys => sys.short || sys.name || "";

  /* Back of a tarot card (lattice). Uses the page colors, so it follows each game's theme. */
  let backId = 0;
  function cardBack() {
    const id = "lat" + (++backId);
    let lines = "";
    for (let k = -240; k < 400; k += 16) lines += `M${k} 0 L${k + 230} 230 M${k + 230} 0 L${k} 230 `;
    return `<svg viewBox="0 0 150 230" fill="none" aria-hidden="true">
      <defs><clipPath id="${id}"><rect x="9" y="9" width="132" height="212" rx="6"/></clipPath></defs>
      <rect x="1" y="1" width="148" height="228" rx="10" style="fill:var(--noir-2);stroke:var(--line)" stroke-width="2"/>
      <g clip-path="url(#${id})"><path d="${lines}" style="stroke:var(--line)" stroke-width="1.2"/></g>
      <rect x="9" y="9" width="132" height="212" rx="6" style="stroke:var(--cherry)" stroke-width="1.5"/>
    </svg>`;
  }
  const icon = (name, cls) => {
    const svg = ICONS[name] || ICONS.wheel;
    return cls ? svg.replace("<svg ", `<svg class="${cls}" `) : svg;
  };

  /* ---------- helpers ---------- */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = d => { if (!d) return ""; const [y, m, day] = String(d).split("-"); return (day ? +day + " " : "") + (m ? MONTHS[+m - 1] + " " : "") + y; };
  const url = p => !p ? "" : /^(https?:|mailto:|#)/.test(p) ? p : ROOT + p;
  const isExternal = u => /^https?:/.test(u);

  /* A link that still has no address shows a friendly message instead of going nowhere. */
  function link(href, label, cls = "btn", extra = "") {
    if (!href) return `<a class="${cls}" href="#" data-missing="${esc(label)}" ${extra}>${label}</a>`;
    const u = url(href);
    return `<a class="${cls}" href="${esc(u)}" ${isExternal(u) ? 'target="_blank" rel="noopener"' : ""} ${extra}>${label}</a>`;
  }

  function highlight(code) {
    const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(public|private|protected|class|abstract|override|readonly|void|float|int|bool|string|new|return|if|else|for|foreach|while|this|null|true|false|var|static|using|interface|in|out|get|set|const|enum|struct|async|await|yield)\b|\b(\d+(?:\.\d+)?f?)\b|\b([A-Z][A-Za-z0-9_]*)\b/gm;
    let out = "", last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? "c" : m[2] ? "s" : m[3] ? "k" : m[4] ? "n" : "t";
      out += `<span class="tok-${cls}">${esc(m[0])}</span>`;
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }

  let toastTimer;
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, 2600);
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-missing]");
    if (a) { e.preventDefault(); toast(`Coming soon: ${a.dataset.missing.replace(/<[^>]+>/g, "")}`); }
    const c = e.target.closest("[data-copy]");
    if (c) {
      e.preventDefault();
      const text = c.dataset.copy;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast("Email copied")).catch(() => toast(text));
    }
  });

  /* ---------- per-project colors: same saturation and lightness, new hue ---------- */
  const BASE = {
    accent: { "--red": "#D42A2A", "--cherry": "#810100", "--maroon": "#630000", "--code-k": "#E46A6A" },
    neutral: { "--noir": "#1B1717", "--noir-2": "#231E1E", "--noir-3": "#2E2727", "--line": "#3D3333", "--cotton": "#EDEBDD", "--cotton-muted": "#B3AC9F" }
  };
  function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2; let h = 0, s = 0;
    if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); h = (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60; }
    return [h, s, l];
  }
  function hslToHex(h, s, l) {
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return "#" + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
  }
  function themeColors(theme) {
    const out = {};
    for (const [group, key] of [["accent", "accentHue"], ["neutral", "neutralHue"]]) {
      for (const [v, hex] of Object.entries(BASE[group])) {
        if (!theme || theme[key] == null) { out[v] = hex; continue; }
        // Optional theme.neutralSat: multiplies the saturation of the dark/light neutrals (1 = default, 3 = much more color).
        const [, s, l] = hexToHsl(hex), boost = group === "neutral" && theme.neutralSat ? theme.neutralSat : 1;
        out[v] = hslToHex(theme[key], Math.min(1, s * boost), l);
      }
    }
    const n = parseInt(out["--red"].slice(1), 16);
    out["--glow"] = `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0.42)`;
    return out;
  }
  function applyTheme(theme, el = document.documentElement) {
    const c = themeColors(theme);
    for (const [k, v] of Object.entries(c)) el.style.setProperty(k, v);
  }

  /* ---------- loading project files ---------- */
  window.PROJECTS = window.PROJECTS || {};
  window.registerProject = p => { window.PROJECTS[p.id] = p; };
  const loadScript = src => new Promise(res => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => { console.warn("Could not load " + src); res(); }; document.head.appendChild(s); });
  const loadProjects = ids => Promise.all(ids.map(id => window.PROJECTS[id] ? null : loadScript(`${ROOT}data/projects/${id}.js`)));

  /* ---------- header + footer ---------- */
  function renderChrome() {
    const S = window.SITE, L = S.links || {};
    const h = document.getElementById("site-header");
    if (h) h.innerHTML = `
      <div class="wrap">
        <a class="brand" href="${ROOT}index.html">${icon("wheel")}${esc(S.name)}</a>
        <nav class="nav" aria-label="Main">
          <a href="${ROOT}index.html#about">About</a>
          <a href="${ROOT}index.html#news">News</a>
          <a href="${ROOT}index.html#projects">Projects</a>
          ${S.status && S.status.show
            ? (isHome ? `<a class="pill-status" href="#contact">${esc(S.status.text)}</a>`
                      : `<button class="pill-status" data-open-contact aria-haspopup="dialog">${esc(S.status.text)}</button>`)
            : ""}
        </nav>
      </div>`;
    const f = document.getElementById("site-footer");
    if (f) f.innerHTML = `
      <div class="wrap">
        <div class="left">${icon("wheel")}© ${esc(S.name)} ${new Date().getFullYear()}</div>
        <nav class="links" aria-label="Elsewhere">
          ${link(L.github, "GitHub", "")}
          ${link(L.linkedin, "LinkedIn", "")}
          ${link(L.itch, "itch.io", "")}
          ${link(S.cv, "CV", "")}
        </nav>
      </div>`;
  }

  /* ---------- internship / contact info: a section on the homepage, a pop-up everywhere else ---------- */
  const isHome = !window.PROJECT_ID;
  function contactParts() {
    const S = window.SITE, L = S.links || {};
    const email = L.email
      ? `<button class="btn primary" data-copy="${esc(L.email)}" title="Copy email address"><span class="copy-email">${esc(L.email)}</span></button>`
      : link("", "Email", "btn primary");
    return { title: S.contact.title, text: S.contact.text, buttons: email + link(L.linkedin, "LinkedIn") + link(S.cv, "CV") };
  }
  let contactReturn = null;
  function openContact() {
    let shade = document.getElementById("contact-shade");
    if (!shade) {
      const c = contactParts();
      shade = document.createElement("div");
      shade.id = "contact-shade"; shade.className = "modal-shade"; shade.hidden = true;
      shade.innerHTML = `
        <div class="modal contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <div class="modal-top">
            <div class="modal-title">${icon("wheel")}<span class="eyebrow">${esc(window.SITE.status.text)}</span></div>
            <button class="close" data-close-contact aria-label="Close">✕</button>
          </div>
          <div class="contact-pop">
            <h2 id="contact-title">${esc(c.title)}</h2>
            <p>${esc(c.text)}</p>
            <div class="btn-row">${c.buttons}</div>
          </div>
        </div>`;
      document.body.appendChild(shade);
      shade.addEventListener("click", e => { if (e.target === shade || e.target.closest("[data-close-contact]")) closeContact(); });
    }
    contactReturn = document.activeElement;
    shade.hidden = false; document.body.style.overflow = "hidden";
    shade.querySelector("[data-close-contact]").focus();
  }
  function closeContact() {
    const shade = document.getElementById("contact-shade");
    if (!shade || shade.hidden) return false;
    shade.hidden = true; document.body.style.overflow = "";
    contactReturn?.focus?.();
    return true;
  }
  document.addEventListener("click", e => { if (e.target.closest("[data-open-contact]")) { e.preventDefault(); openContact(); } });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeContact(); });

  /* ---------- news: every dated version of every project ---------- */
  function collectNews() {
    const S = window.SITE, items = [];
    for (const id of S.projects) {
      const p = window.PROJECTS[id]; if (!p) continue;
      for (const v of p.versions || []) {
        if (!v.date || v.planned) continue;
        items.push({ date: v.date, project: p, title: `${p.title}: ${v.name}`, text: v.news || v.details, href: `projects/${id}.html?v=${v.id}`, tag: v.newsTag || "Update" });
      }
    }
    for (const n of S.news || []) items.push({ date: n.date, title: n.title, text: n.text, href: n.link || "", tag: n.tag || "News" });
    return items.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }

  window.Site = { ROOT, ICONS, icon, cardBack, suit, SUITS, CARD_SUITS, cardSuit, cardLabel, esc, slug, fmtDate, url, link, highlight, toast, applyTheme, themeColors, loadProjects, renderChrome, collectNews, contactParts, openContact };
})();
