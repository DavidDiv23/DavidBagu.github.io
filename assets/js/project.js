/* Project page. Everything shown comes from data/projects/<id>.js */
(async function () {
  const { icon, esc, slug, link, url, highlight, toast, applyTheme, loadProjects, renderChrome, ROOT } = Site;
  const S = window.SITE, id = window.PROJECT_ID;
  renderChrome();
  await loadProjects([id]);
  const P = window.PROJECTS[id];
  const main = document.getElementById("page");
  if (!P) { main.innerHTML = `<div class="card empty">This project could not be loaded. Check data/projects/${esc(id)}.js</div>`; return; }

  document.title = `${P.title} | ${S.name}`;
  applyTheme(P.theme);

  const systems = P.systems || {};
  const playable = P.versions.filter(v => !v.planned);
  const latest = playable[playable.length - 1];
  const params = new URLSearchParams(location.search);
  let version = playable.find(v => v.id === params.get("v")) || latest;
  const sysIn = v => (v.systems || Object.keys(systems)).filter(s => systems[s]);
  let systemId = null;
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- page skeleton ---------- */
  const multiVersion = P.versions.length > 1;
  const showPatch = playable.length > 1 || P.versions.some(v => v.patch);
  const allSystemIds = Object.keys(systems);
  main.innerHTML = `
    <section class="hero" aria-labelledby="project-title">
      <a class="crumb" href="${ROOT}index.html#projects">← All projects</a>
      <div class="title-row">
        <div class="title-col">
          <p class="eyebrow">${esc([P.year, P.course].filter(Boolean).join(" · "))}</p>
          <h1 id="project-title">${esc(P.title)}</h1>
          ${P.hook ? `<p class="hook">${esc(P.hook)}</p>` : ""}
        </div>
        <div class="version">
          <button class="version-btn ${multiVersion ? "" : "static"}" id="version-btn" ${multiVersion ? 'aria-haspopup="listbox" aria-expanded="false" aria-controls="version-menu"' : 'tabindex="-1"'}>
            ${icon("moon", "moon")}
            <span class="vtext"><span class="vlabel">Version</span><span class="vname" id="version-name"></span></span>
            ${multiVersion ? icon("chev").replace('class="chev"', 'class="chev"') : ""}
          </button>
          <div class="version-menu" id="version-menu" role="listbox" aria-label="Project versions" hidden></div>
        </div>
      </div>
      <div class="chips" id="meta-chips"></div>
      <div class="overview-row">
        <div id="trailer"></div>
        <div class="card glance">
          <div style="display:flex;flex-direction:column;gap:12px">
            <p class="eyebrow">At a glance</p>
            <ul class="bullets" id="glance"></ul>
          </div>
          <div class="links" id="links"></div>
        </div>
      </div>
    </section>
    ${showPatch ? `
    <section aria-labelledby="patch-title">
      <div class="section-head">
        <h2 class="section-title" id="patch-title">${icon("wheel")}Patch notes</h2>
        <p class="small muted" id="patch-sub"></p>
      </div>
      <div id="patch-body"></div>
    </section>` : ""}
    ${allSystemIds.length ? `
    <section aria-labelledby="systems-title" id="systems">
      <div class="section-head">
        <h2 class="section-title" id="systems-title">${icon("wheel")}${allSystemIds.length > 1 ? "Systems I built" : "What I built"}</h2>
        ${allSystemIds.length > 1 ? `<p class="small muted">Pick a card to open the full breakdown of that system.</p>` : ""}
      </div>
      <div class="tabs" role="tablist" aria-label="Systems" id="tabs" ${allSystemIds.length > 1 || (P.upcoming || []).length ? "" : "hidden"}></div>
      <div class="card system" id="system" role="tabpanel"></div>
    </section>` : ""}
    <div class="sys-nav">
      <a class="btn" href="${ROOT}index.html#projects">← All projects</a>
      ${nextProjectLink()}
    </div>`;

  function nextProjectLink() {
    const ids = S.projects, i = ids.indexOf(id), next = ids[(i + 1) % ids.length];
    if (!next || next === id) return "";
    return `<a class="btn" href="${next}.html">Next project →</a>`;
  }

  /* ---------- media ---------- */
  function media(m, fallback) {
    if (!m) m = { caption: fallback || "Media coming soon" };
    if (typeof m === "string") m = { caption: m };
    if (!m.src) return `<div class="media">${icon("play")}<span>${esc(m.caption || fallback || "Media coming soon")}</span></div>`;
    const src = url(m.src), cap = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";
    if (m.type === "youtube") return `<figure class="media filled"><iframe src="https://www.youtube-nocookie.com/embed/${esc(m.src)}" title="${esc(m.caption || P.title)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></figure>`;
    if (m.type === "video" || /\.(mp4|webm)$/i.test(m.src)) return `<figure class="media filled"><video src="${esc(src)}" ${m.poster ? `poster="${esc(url(m.poster))}"` : ""} controls muted playsinline preload="metadata"></video>${cap}</figure>`;
    return `<figure class="media filled"><img src="${esc(src)}" alt="${esc(m.caption || "")}" loading="lazy">${cap}</figure>`;
  }

  /* ---------- render ---------- */
  function render() {
    document.getElementById("version-name").textContent = version.name + (multiVersion && version === latest && playable.length > 1 ? " (latest)" : "");
    const chips = [...(P.status === "in-development" ? ["In development"] : []), ...(version.chips || P.chips || [])];
    document.getElementById("meta-chips").innerHTML = chips.map((c, i) => `<span class="chip ${P.status === "in-development" && i === 0 ? "accent" : ""}">${esc(c)}</span>`).join("");
    document.getElementById("trailer").innerHTML = media(version.trailer, `Gameplay video: ${version.name}`);
    document.getElementById("glance").innerHTML = (version.glance || P.glance || []).map(g => `<li>${esc(g)}</li>`).join("");
    const play = version.play || P.play;
    document.getElementById("links").innerHTML =
      (play ? link(play.url, esc(play.label), "btn primary") : "") +
      (P.links || []).map(l => link(l.url, esc(l.label))).join("");
    if (multiVersion) renderMenu();
    if (showPatch) renderPatch();
    if (allSystemIds.length) { if (!sysIn(version).includes(systemId)) systemId = sysIn(version)[0]; renderTabs(); renderSystem(); }
  }

  function renderMenu() {
    document.getElementById("version-menu").innerHTML = P.versions.map(v => `
      <button class="version-item" role="option" data-version="${esc(v.id)}" ${v.planned ? "disabled" : ""} aria-current="${v.id === version.id}" aria-selected="${v.id === version.id}">
        <span><span class="vn">${esc(v.name)}</span><span class="vd">${esc(v.details || "")}</span></span>
        ${v.id === version.id ? '<span class="tick" aria-hidden="true">✓</span>' : ""}
      </button>`).join("") + `<div class="version-foot">Each version has its own video, notes and systems.</div>`;
  }

  function renderPatch() {
    const p = version.patch;
    if (!p) {
      document.getElementById("patch-sub").textContent = "This is the first version, so there is nothing to compare yet.";
      const next = playable[playable.indexOf(version) + 1];
      document.getElementById("patch-body").innerHTML = `<div class="card original-note">${icon("moon")}<p>${esc(version.name)} is the original. ${next ? `Pick <b>${esc(next.name)}</b> in the version menu to see what changed.` : ""}</p></div>`;
      return;
    }
    document.getElementById("patch-sub").textContent = `What changed from ${p.from} → ${p.to}.`;
    const group = (t, items) => items && items.length ? `<div><p class="eyebrow">${t}</p><ul class="bullets" style="margin-top:6px">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>` : "";
    const bg = src => src ? `style="background-image:url('${esc(url(src))}')"` : "";
    document.getElementById("patch-body").innerHTML = `
      <div class="patch-row">
        <div class="card notes">${group("Added", p.added)}${group("Reworked", p.reworked)}${group("Fixed", p.fixed)}</div>
        <div class="compare-col">
          <div class="compare" id="compare" style="--pos:50%">
            <div class="layer before" ${bg(p.before)}><span>Before · ${esc(p.fromShort || "old")}</span></div>
            <div class="layer after" ${bg(p.after)}><span>After · ${esc(p.toShort || "new")}</span></div>
            <div class="divider"></div>
            <div class="handle"><svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M16 14 L10 20 L16 26 M24 14 L30 20 L24 26" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <input type="range" id="compare-range" min="0" max="100" value="50" aria-label="Compare before and after">
          </div>
          <span class="small muted">Drag to compare.</span>
        </div>
      </div>`;
    document.getElementById("compare-range").addEventListener("input", e => document.getElementById("compare").style.setProperty("--pos", e.target.value + "%"));
  }

  function renderTabs() {
    const avail = sysIn(version);
    document.getElementById("tabs").innerHTML = allSystemIds.map(sid => {
      const s = systems[sid], ok = avail.includes(sid);
      const later = P.versions.find(v => (v.systems || []).includes(sid));
      return `<button class="tarot" role="tab" id="tab-${esc(sid)}" data-system="${esc(sid)}" aria-selected="${sid === systemId}" aria-controls="system" ${ok ? "" : "disabled"} title="${ok ? "Open " + esc(s.name) : "Not in this version"}">
        <span class="inner"><span class="num">${esc(s.numeral || "")}</span>${icon(s.symbol)}<span class="names"><span class="ttl">${esc(s.card || "")}</span><span class="sys">${ok ? esc(s.name) : "Added in " + esc(later ? later.name.split(" ")[0] : "a later version")}</span></span></span>
      </button>`;
    }).join("") + (P.upcoming || []).map(u => `
      <div class="tarot placeholder" aria-hidden="true"><span class="inner"><span class="num">${esc(u.numeral || "")}</span>${icon(u.symbol)}<span class="names"><span class="ttl">${esc(u.card || "")}</span><span class="sys">${esc(u.name || "")}</span></span></span></div>`).join("");
  }

  /* ---------- class diagram: 7 fixed slots, any of them can be left out ---------- */
  const SLOTS = { A: [20, 48], B: [340, 48], C: [660, 48], D: [340, 178], E: [100, 300], F: [340, 300], G: [580, 300] };
  const EDGES = [["A", "B"], ["B", "C"], ["B", "D"], ["D", "E"], ["D", "F"], ["D", "G"]];
  const W = 200, H = 64;
  function diagramSVG(sys) {
    const d = sys.diagram, n = d.nodes, has = k => !!n[k], labels = d.labels || {};
    const cx = k => SLOTS[k][0] + W / 2, top = k => SLOTS[k][1], bot = k => SLOTS[k][1] + H, mid = k => SLOTS[k][1] + H / 2;
    const right = (x1, x2, y) => `<path class="edge" d="M${x1} ${y} H${x2 - 9}"/><path class="arrow" d="M${x2} ${y} l-10 -5.5 v11 z"/>`;
    const down = (x, y1, y2) => `<path class="edge" d="M${x} ${y1} V${y2 - 9}"/><path class="arrow" d="M${x} ${y2} l-5.5 -10 h11 z"/>`;
    const kids = ["E", "F", "G"].filter(has);
    const height = kids.length ? 400 : has("D") ? 270 : 150;
    let s = `<svg class="diagram" viewBox="0 0 880 ${height}" role="img" aria-label="Class diagram of ${esc(sys.name)}">`;
    if (has("A") && has("B")) s += right(SLOTS.A[0] + W, SLOTS.B[0], mid("A")) + (labels.AB ? `<text class="elabel" x="${SLOTS.A[0] + W + 8}" y="${mid("A") - 10}">${esc(labels.AB)}</text>` : "");
    if (has("B") && has("C")) s += right(SLOTS.B[0] + W, SLOTS.C[0], mid("B")) + (labels.BC ? `<text class="elabel" x="${SLOTS.B[0] + W + 8}" y="${mid("B") - 10}">${esc(labels.BC)}</text>` : "");
    if (has("B") && has("D")) s += down(cx("B"), bot("B"), top("D")) + (labels.BD ? `<text class="elabel" x="${cx("B") + 10}" y="${bot("B") + 34}">${esc(labels.BD)}</text>` : "");
    if (has("D") && kids.length) {
      const xs = kids.map(cx);
      s += `<path class="edge" d="M${cx("D")} ${bot("D")} V270 M${Math.min(...xs, cx("D"))} 270 H${Math.max(...xs, cx("D"))}"/>`;
      kids.forEach(k => s += down(cx(k), 270, top(k)));
    }
    for (const [k, name] of Object.entries(n)) {
      const info = (sys.scripts || {})[name] || {}, [x, y] = SLOTS[k];
      s += `<g class="node ${info.builtin ? "builtin" : ""} ${k === d.key ? "key" : ""}" tabindex="0" role="button" data-script="${esc(name)}" aria-label="Open ${esc(name)}">
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="8"/>
        <text class="cls" x="${x + W / 2}" y="${y + (info.role ? 28 : 37)}" text-anchor="middle">${esc(name)}</text>
        ${info.role ? `<text class="role" x="${x + W / 2}" y="${y + 47}" text-anchor="middle">${esc(info.role)}</text>` : ""}</g>`;
    }
    return s + `</svg>`;
  }

  function renderSystem() {
    const sys = systems[systemId];
    const order = sysIn(version), next = order[order.indexOf(systemId) + 1];
    const tags = (sys.tags && (sys.tags[version.id] || sys.tags.all)) || [];
    const h = t => `<h3>${icon("wheel")}${t}</h3>`;
    const m = sys.media || [];
    const keyScript = sys.diagram && sys.diagram.nodes[sys.diagram.key];
    const code = sys.code || (keyScript && sys.scripts && sys.scripts[keyScript] && sys.scripts[keyScript].code);
    const el = document.getElementById("system");
    el.setAttribute("aria-labelledby", "tab-" + systemId);
    el.innerHTML = `
      <div class="sys-head">
        ${sys.numeral || sys.card ? `<p class="eyebrow">${esc(["System " + (sys.numeral || ""), sys.card].filter(Boolean).join(" · "))}</p>` : ""}
        <h2>${esc(sys.name)}</h2>
        <div class="chips">${tags.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </div>
      ${sys.overview ? `<div class="part">${h("Overview")}<p class="muted">${esc(sys.overview)}</p></div>` : ""}
      ${m.length ? `<div class="part">${h("Media")}
        <div class="media-row ${m.length === 1 ? "single" : ""}">${media(m[0])}${m.length > 1 ? `<div class="side">${m.slice(1, 3).map(x => media(x)).join("")}</div>` : ""}</div>
      </div>` : ""}
      ${sys.diagram ? `<div class="part">${h("Architecture")}
        <p class="small muted diagram-hint"><span class="dot"></span>Class diagram: each box is a script and the arrows show who calls whom. Click a box to open its code.</p>
        <div class="diagram-scroll">${diagramSVG(sys)}</div>
      </div>` : ""}
      ${sys.deepDive || code ? `<div class="part">${h("How I built it")}${sys.deepDive ? `<p class="muted">${esc(sys.deepDive)}</p>` : ""}
        ${code ? `<pre class="code"><code>${highlight(code)}</code></pre>` : ""}
      </div>` : ""}
      ${sys.learned || sys.improve ? `<div class="part">${h("What I learned")}
        <div class="learn-row">${sys.learned ? `<div class="card"><h4>What I learned</h4><p class="muted">${esc(sys.learned)}</p></div>` : ""}${sys.improve ? `<div class="card"><h4>What I’d improve</h4><p class="muted">${esc(sys.improve)}</p></div>` : ""}</div>
      </div>` : ""}
      ${order.length > 1 ? `<div class="sys-nav">
        <button class="btn" data-goto="systems">← All systems</button>
        ${next ? `<button class="btn primary" data-goto-system="${esc(next)}">Next: ${esc(systems[next].numeral || "")} · ${esc(systems[next].card || systems[next].name)} →</button>` : ""}
      </div>` : ""}`;
  }

  function setSystem(sid, scroll) {
    if (!sysIn(version).includes(sid)) return;
    systemId = sid;
    history.replaceState(null, "", location.pathname + location.search + "#" + sid);
    renderTabs(); renderSystem();
    if (scroll) document.getElementById("system").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  }
  function setVersion(vid) {
    version = playable.find(v => v.id === vid) || version;
    const q = new URLSearchParams(location.search); q.set("v", version.id);
    history.replaceState(null, "", location.pathname + "?" + q + (systemId ? "#" + systemId : ""));
    render();
  }

  /* ---------- code pop-up ---------- */
  let lastFocus = null;
  const shade = document.getElementById("modal-shade"), modal = document.getElementById("modal");
  function openScript(name) {
    const sys = systems[systemId], info = (sys.scripts || {})[name] || { role: "" };
    const nodes = sys.diagram.nodes, k = Object.keys(nodes).find(x => nodes[x] === name), links = [];
    EDGES.forEach(([a, b]) => { if (!nodes[a] || !nodes[b]) return; if (a === k) links.push(["→", nodes[b]]); if (b === k) links.push(["←", nodes[a]]); });
    const hasCode = !!info.code;
    modal.innerHTML = `
      <div class="modal-top">
        <div class="modal-title">${icon("wheel")}<h3 id="modal-name">${esc(name)}${info.builtin ? "" : ".cs"}</h3>
          <span class="chip">${info.builtin ? "Built-in component" : "Script"}</span><span class="chip">${esc(sys.name)}</span></div>
        <button class="close" id="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <div class="col">
          <p class="eyebrow">${info.builtin ? "Built into the engine" : "Code"}</p>
          ${hasCode ? `<pre class="code"><code>${highlight(info.code)}</code></pre>${info.file ? `<span class="small muted">${esc(info.file)}</span>` : ""}`
                    : `<div class="builtin-note muted">${info.builtin ? "No custom code here; this is part of the engine." : "Code for this script is coming soon."}</div>`}
        </div>
        <div class="info">
          ${info.resp ? `<section><p class="eyebrow">Responsibility</p><p class="small muted">${esc(info.resp)}</p></section>` : ""}
          ${links.length ? `<section><p class="eyebrow">Connected to</p><div class="chips">${links.map(([a, n]) => `<button class="chip" data-open-script="${esc(n)}">${a} ${esc(n)}</button>`).join("")}</div></section>` : ""}
          ${info.learned ? `<section><p class="eyebrow">What I learned</p><p class="small muted">${esc(info.learned)}</p></section>` : ""}
          ${hasCode ? link(info.url, "View on GitHub ↗") : ""}
        </div>
      </div>`;
    if (shade.hidden) lastFocus = document.activeElement;
    shade.hidden = false; document.body.style.overflow = "hidden";
    document.getElementById("modal-close").focus();
  }
  function closeModal() { shade.hidden = true; document.body.style.overflow = ""; lastFocus?.focus?.(); }

  /* ---------- events ---------- */
  const vBtn = document.getElementById("version-btn"), vMenu = document.getElementById("version-menu");
  function toggleMenu(open) { vMenu.hidden = !open; vBtn.setAttribute("aria-expanded", String(open)); if (open) vMenu.querySelector('[aria-current="true"]')?.focus(); }
  if (multiVersion) {
    vBtn.addEventListener("click", () => toggleMenu(vMenu.hidden));
    vMenu.addEventListener("click", e => {
      const b = e.target.closest("[data-version]"); if (!b || b.disabled) return;
      toggleMenu(false); vBtn.focus();
      if (b.dataset.version !== version.id) { setVersion(b.dataset.version); toast(`Showing ${version.name}`); }
    });
    document.addEventListener("click", e => { if (!vMenu.hidden && !e.target.closest(".version")) toggleMenu(false); });
  }
  main.addEventListener("click", e => {
    const t = e.target.closest("[data-system]"); if (t && !t.disabled) return setSystem(t.dataset.system, true);
    const node = e.target.closest(".node"); if (node) return openScript(node.dataset.script);
    const go = e.target.closest("[data-goto]"); if (go) return document.getElementById(go.dataset.goto).scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
    const gs = e.target.closest("[data-goto-system]"); if (gs) setSystem(gs.dataset.gotoSystem, true);
  });
  main.addEventListener("keydown", e => {
    const node = e.target.closest(".node"); if (node && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openScript(node.dataset.script); return; }
    if (!e.target.closest("#tabs") || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const tabs = [...document.querySelectorAll(".tarot[data-system]:not([disabled])")], i = tabs.indexOf(document.activeElement); if (i < 0) return;
    const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); setSystem(n.dataset.system, false);
  });
  shade.addEventListener("click", e => {
    if (e.target === shade || e.target.closest("#modal-close")) return closeModal();
    const s = e.target.closest("[data-open-script]"); if (s) openScript(s.dataset.openScript);
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (!shade.hidden) closeModal(); else if (multiVersion && !vMenu.hidden) { toggleMenu(false); vBtn.focus(); }
  });
  modal.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;
    const f = [...modal.querySelectorAll("button, a[href], [tabindex]")]; if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- start ---------- */
  const h = location.hash.slice(1);
  if (systems[h]) { if (!sysIn(version).includes(h)) version = playable.find(v => sysIn(v).includes(h)) || version; systemId = h; }
  render();
})();
