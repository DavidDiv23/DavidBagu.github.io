# CLAUDE.md – David's portfolio site

Context for Claude Code. Read this first, then `README.md` for the content format.

## What this is

Portfolio site for **David-Mihai Bagu**, a game programming student (Creative Media and Game Technologies, Hanze University of Applied Sciences, Groningen; graduates 2028). Its job: get him a **game programming internship starting February 2027**.

- Repo: `DavidDiv23/DavidBagu.github.io`, local clone at `C:\David\Uni\Github\DavidBagu.github.io`
- Hosted on GitHub Pages from **`main`**. Live at `https://daviddiv23.github.io/DavidBagu.github.io/` (shorter URL only if the repo is renamed to `DavidDiv23.github.io`; all paths are relative, so either works).
- David is new to HTML/CSS/JS. Explain changes in plain words, and walk him through git steps when he does them himself. When he asks you to publish: test first, commit with a clear message, push to `main`.

## How the site works

Plain HTML, CSS and JS. **No build step, no frameworks, no npm.** Must keep working when `index.html` is opened directly (file://) and with VS Code Live Server.

```
index.html                 homepage shell (about, news, projects, contact)
projects/<id>.html         one tiny shell per project; sets window.PROJECT_ID and ROOT="../"
data/site.js               name, about text, links, CV path, project order, extra news
data/projects/<id>.js      ALL content for one project: registerProject({...})
assets/css/site.css        all styling; design tokens at the top
assets/js/site.js          shared: icons, hue themes, header/footer, contact pop-up, news, helpers
assets/js/home.js          renders the homepage
assets/js/project.js       renders a project page
assets/img/, assets/files/ media and the CV
design/hekate-wheels/      10 candidate wheel symbols (SVG), not used by the site yet
style.css (root)           OLD, unused. Safe to delete.
```

Rules:
- **Content goes in `data/`.** Change `assets/js` or `assets/css` only for real feature or design changes, and keep every existing data option working.
- News on the homepage is automatic: every project version with a `date` (and not `planned`) becomes a news item linking to `projects/<id>.html?v=<versionId>`.
- Project pages read `?v=` for the version and `#<systemId>` for the open system.
- Adding a project = new `data/projects/<id>.js` + copy of a `projects/*.html` shell with the new id + add the id to `projects` in `data/site.js`.
- Before pushing: open the homepage and at least one project page in a browser (Playwright is fine), check the console for errors and check phone width (~390px) for horizontal scroll.

## Design system

Dark, witchy, professional. "Functionally professional with personality."

- Palette (brand): noir `#1B1717` background, `#231E1E` / `#2E2727` surfaces, line `#3D3333`, cotton `#EDEBDD` text, muted `#B3AC9F`, cherry `#810100`, maroon `#630000`, red pop `#D42A2A`. Inspired by a "Cotton / Cherry Red / Maroon / Noir Black" palette.
- Fonts: Cinzel (headings), Inter (body), JetBrains Mono (code), Cormorant Garamond italic (one-line hooks/flavor).
- **Hekate's wheel** marks every section heading and is the logo. **Tarot cards** are the system tabs on project pages and the homepage portrait frame.
- **Tarot symbols** (chosen by David, Nov 2026; final SVGs in `design/tarot-symbols/final/`, live in `ICONS` in `assets/js/site.js`): **moon** (plain thin crescent), **sun** (star sun, small gap around the center disc, option B), **sword** (longsword with a short straight crossguard; `blade` is the same icon), **wand** (leafed wand), **cup** (chalice, filled), **pentacle** (classic pentagram in a circle). All six are scaled to the same 84-unit square inside the 100 viewBox so they look equally big; keep that for new symbols. **wheel** (classic Hekate's wheel) stays the logo and section marker. `key`, `star` and `eye` are older extras still used by some lite pages.
- **Card labels:** a tarot card shows only its numeral, its suit symbol and a short label of 1–2 words (`short` in the data, e.g. "Drinks", "Customers", "NPCs", "Weapons"). No "The Seer"-style card names.
- **Card suits (David, Nov 2026):** only the four classic suits, in a fixed order by position: card 1 sword, 2 wand, 3 cup, 4 pentacle, 5 sword again, and so on (`Site.cardSuit(i)`). Project-card covers on the homepage follow the same order by project position. The `symbol` field in data files is ignored for now; moon and sun stay in `ICONS` but aren't used on cards.
- **Card back:** lattice only (`Site.cardBack()`), used for systems listed under `upcoming` in a project file. Follows the page's theme colors.
- `design/elements.html` shows every element of the site; `design/tarot-symbols.html` shows all symbol options that were considered.
- **Per-project colors:** each project has `theme: { accentHue, neutralHue }`. Accent and neutral colors keep their saturation and lightness; only the hue shifts (Brown Sugar Rush = pink 335 / cocoa 25). Subtle is intended. The header logo and the status dot always stay brand red (`--brand`).
- Decisions already made, don't undo them:
  - No sticky "Overview / Media / Architecture…" pill bar on system sections (David found it weird; removed).
  - On every page except the homepage, the "Open to internships" pill opens a contact **pop-up** instead of navigating away.
  - Full page vs lite page: lite = overview, role, media, one system; full = versions + patch notes + 2–4 systems with class diagrams and code pop-ups.
- David designs visual changes in Figma (free Starter plan, very limited MCP calls; avoid using the Figma connector unless he asks) or describes them; you implement.

## Content rules

- **Never invent facts about David's projects.** Unknowns stay as `[EDIT ME: …]`; guesses are marked `[CHECK]` until he confirms.
- Code snippets must come from his real project code (or be clearly marked as examples).
- Writing style: plain, short, active sentences, written from the reader's side. No buzzwords.
- The CV in `assets/files/` is a **placeholder** (courier CV with his phone number). An internship CV matching the site is planned separately. Remind him to swap it before he starts applying.

## Projects (in this order on the site)

| id | Project | Known facts | Launch depth |
|---|---|---|---|
| brown-sugar-rush | Brown Sugar Rush | Boba shop game. v1.0 PC prototype for the Game Design course; v1.1 mobile (Android) remake for the Mobile Development course, Oct 2026. Unity. | **Full** |
| medical-client-game | [name unknown] | Year 2 semester 2 team game for a real medical client, successful; has an organization page and socials. Ask if it may be shown publicly. | Lite |
| potion-maker-vr | Potion Maker VR | Year 2 block 1, Unity VR. | Lite |
| robot | [name unknown] | Robotics course; has videos; David is rebuilding it with optimizations = v1.1 (planned, first news post). | Lite |
| gdd-minor | [name unknown] | Current game design minor, big team, repo on Azure DevOps (private). David is scrum master, developer and on the integration team (merging branches, linking mechanics in Unity). In development. | Lite |
| theseus-protocol | Theseus Protocol | Narrative design course project in Unity: a robot gains other robots' parts during a war, seeing both sides; the parts it wears change how it acts and who it is. Two submissions = two versions. In development. | Lite |
| adventurier | Adventurier | Year 1 semester 2, team, full-semester Unity 3D project. | Lite |
| mushman | Mushman | Year 1 semester 1 block 2, 2D, GameMaker Studio 2. | Lite |

Later, not now: projects for courses he failed.

## Open items

- Pick the Hekate's wheel (options in `design/hekate-wheels/`), maybe a detailed one plus a simple one for small sizes / favicon.
- About text: one line about him outside programming. He doesn't know yet what kind of programming he wants to focus on; help him formulate it after going through his projects.
- Questions for David: may the medical game be public? may team-repo snippets be shown? old builds for itch.io? rename repo for the shorter URL?
- Launch checklist: every project has a page, all links work, internship CV in place, phone check, link preview image + favicon, portfolio link on GitHub profile and LinkedIn.

## Next task

**Brown Sugar Rush full page.** Ask David for the folder paths of the v1.0 PC prototype and the v1.1 mobile remake (Unity projects). Read their `Assets/Scripts`, then draft in `data/projects/brown-sugar-rush.js`:
- 2–4 systems he built (current guesses: drink mixing / mix stations, day loop, touch controls, all `[CHECK]`)
- a class diagram per system (7 fixed slots, see README), script roles and responsibilities
- real code snippets for the pop-ups
- patch notes for v1.0 → v1.1

Then ask him what he can't tell from code: his role, solo or team, what he learned, and media (screenshots, clips).

Links: GitHub `https://github.com/DavidDiv23`, LinkedIn `https://www.linkedin.com/in/david-mihai-b%C3%A2gu-1920a2309/`, itch.io `https://divdavid.itch.io/`.
