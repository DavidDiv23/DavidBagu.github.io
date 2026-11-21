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
    moon: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M62 14 A36 36 0 1 0 62 86 A40 40 0 0 1 62 14 Z" fill="currentColor"/></svg>`,
    key: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="28" cy="50" r="14" stroke="currentColor" stroke-width="6"/><path d="M42 50 H88 M72 50 V64 M84 50 V60" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
    blade: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6 L58 56 H42 Z" fill="currentColor"/><rect x="30" y="56" width="40" height="6" rx="3" fill="currentColor"/><rect x="46" y="62" width="8" height="22" rx="2" fill="currentColor"/><circle cx="50" cy="89" r="5" fill="currentColor"/></svg>`,
    cup: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M24 14 H76 C76 44 64 58 50 58 C36 58 24 44 24 14 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M50 58 V80 M32 88 H68" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M30 28 H70" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
    star: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6 L61 38 L95 38 L67 58 L78 92 L50 71 L22 92 L33 58 L5 38 L39 38 Z" fill="currentColor"/></svg>`,
    eye: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M6 50 C22 24 78 24 94 50 C78 76 22 76 6 50 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="50" r="13" fill="currentColor"/></svg>`,
    sun: `<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="18" fill="currentColor"/><g stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M50 8 V20 M50 80 V92 M8 50 H20 M80 50 H92 M20 20 L28 28 M72 72 L80 80 M80 20 L72 28 M28 72 L20 80"/></g></svg>`,
    play: `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#1B1717" fill-opacity=".6" stroke="#EDEBDD" stroke-width="2"/><path d="M26 20 L46 32 L26 44 Z" fill="#EDEBDD"/></svg>`,
    chev: `<svg class="chev" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };
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

  window.Site = { ROOT, ICONS, icon, esc, slug, fmtDate, url, link, highlight, toast, applyTheme, themeColors, loadProjects, renderChrome, collectNews, contactParts, openContact };
})();
