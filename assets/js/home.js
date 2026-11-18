/* Homepage: about, news, project grid, contact. Content comes from data/site.js and data/projects/. */
(async function () {
  const { icon, esc, fmtDate, link, url, themeColors, loadProjects, renderChrome, collectNews } = Site;
  const S = window.SITE, L = S.links || {};
  renderChrome();
  await loadProjects(S.projects);

  const emailBtn = cls => L.email
    ? `<button class="${cls}" data-copy="${esc(L.email)}" title="Copy email address"><span class="copy-email">${esc(L.email)}</span></button>`
    : link("", "Email", cls);

  /* ---------- about ---------- */
  document.getElementById("about").innerHTML = `
    <div class="intro">
      <div>
        <p class="eyebrow">${esc(S.role)}</p>
        <h1>${esc(S.name)}</h1>
        <p class="tagline">${esc(S.tagline)}</p>
        <div class="about">${S.about.map(p => `<p>${p}</p>`).join("")}</div>
        <div class="btn-row">
          ${link(S.cv, "Download CV", "btn primary")}
          ${link(L.github, "GitHub")}
          ${link(L.linkedin, "LinkedIn")}
          ${link(L.itch, "itch.io")}
        </div>
      </div>
      <div class="portrait" aria-hidden="${S.photo ? "false" : "true"}">
        <div class="inner">
          <span class="num">0</span>
          <div class="photo">${S.photo ? `<img src="${esc(url(S.photo))}" alt="Photo of ${esc(S.name)}">` : icon("wheel")}</div>
          <span class="ttl">The Programmer</span>
        </div>
      </div>
    </div>`;

  /* ---------- news ---------- */
  const news = collectNews().slice(0, S.newsCount || 5);
  document.getElementById("news").innerHTML = `
    <div class="section-head">
      <h2 class="section-title">${icon("wheel")}News</h2>
      <p class="small muted">New versions and updates to my projects.</p>
    </div>
    <div class="news">
      ${news.length ? news.map(n => {
        const accent = n.project ? themeColors(n.project.theme)["--red"] : "";
        const inner = `<time datetime="${esc(n.date)}">${esc(fmtDate(n.date))}</time>
          <span class="what"><b>${esc(n.title)}</b><span>${esc(n.text || "")}</span></span>
          <span class="tag">${esc(n.tag)}</span>`;
        return n.href
          ? `<a class="news-item" href="${esc(url(n.href))}" style="${accent ? `--item-accent:${accent}` : ""}">${inner}</a>`
          : `<div class="news-item">${inner}</div>`;
      }).join("") : `<div class="card empty">No updates yet.</div>`}
    </div>`;

  /* ---------- projects ---------- */
  const cards = S.projects.map(id => window.PROJECTS[id]).filter(Boolean).map(p => {
    const c = themeColors(p.theme);
    const versions = (p.versions || []).filter(v => !v.planned);
    const badge = p.status === "in-development" ? "In development" : versions.length > 1 ? `${versions.length} versions` : "";
    const meta = [p.year, p.engine, p.team].filter(Boolean).join(" · ");
    return `
      <a class="pcard" href="projects/${p.id}.html" style="--pc-accent:${c["--red"]};--pc-deep:${c["--maroon"]};--pc-glow:${c["--glow"]}">
        <div class="cover">
          ${p.cover ? `<img src="${esc(url(p.cover))}" alt="" loading="lazy">` : icon(p.symbol || "wheel")}
          ${badge ? `<span class="badge">${esc(badge)}</span>` : ""}
        </div>
        <div class="body">
          <h3>${esc(p.title)}</h3>
          <span class="meta">${esc(meta)}</span>
          <p>${esc(p.summary || p.hook || "")}</p>
          <div class="chips">${(p.cardChips || []).map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        </div>
      </a>`;
  }).join("");
  document.getElementById("projects").innerHTML = `
    <div class="section-head">
      <h2 class="section-title">${icon("wheel")}Projects</h2>
      <p class="small muted">Each project page breaks down the systems I built, with code and what I learned.</p>
    </div>
    <div class="projects">${cards}</div>`;

  /* ---------- contact ---------- */
  document.getElementById("contact").innerHTML = `
    <div>
      <h2>${esc(S.contact.title)}</h2>
      <p>${esc(S.contact.text)}</p>
    </div>
    <div class="btn-row">
      ${emailBtn("btn primary")}
      ${link(L.linkedin, "LinkedIn")}
      ${link(S.cv, "CV")}
    </div>`;
})();
