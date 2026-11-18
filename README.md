# David-Mihai Bagu – portfolio

Plain HTML/CSS/JS, hosted on GitHub Pages. No build step: edit a file, push, done.
Double-click `index.html` to preview locally.

## Where things live

| What | File |
|---|---|
| Name, About text, links, CV, project order, extra news | `data/site.js` |
| One project's content (versions, systems, media, code) | `data/projects/<project>.js` |
| Images, videos, CV | `assets/img/…`, `assets/files/…` |
| Look and layout (you rarely need these) | `assets/css/site.css`, `assets/js/*.js` |

## Add or update a project

**New version (shows up in News automatically):** in the project's file, add an entry to `versions` with a `date` like `"2026-12"` or `"2026-12-06"`. Versions with `planned: true` show in the menu as "coming soon" and don't appear in News.

**New system:** add an entry to `systems` and put its id in the `systems` list of each version that has it.
A system can have any of: `overview`, `media`, `diagram`, `deepDive`, `code`, `learned`, `improve`, `scripts`. Parts you leave out simply don't show.

**Media:** `{ caption: "…", src: "assets/img/…/clip.mp4" }` (mp4/webm, or png/jpg/gif), or a YouTube video: `{ type: "youtube", src: "VIDEO_ID", caption: "…" }`. Without `src` a placeholder is shown.

**Class diagram:** 7 fixed spots, use any of them:

```
A → B → C
    ↓
    D
  ↙ ↓ ↘
 E  F  G
```

```js
diagram: { key: "B", nodes: { A: "PlayerInput", B: "WeaponController", D: "Weapon", E: "Pistol" },
           labels: { AB: "OnFirePressed()", BD: "TryFire()" } },
scripts: { WeaponController: { role: "equips & fires", resp: "…", code: `…`, learned: "…", url: "https://github.com/…" } }
```

**Colors per game:** `theme: { accentHue: 335, neutralHue: 25 }` (hue 0–360). `theme: null` keeps the brand red.

**Brand new project:** copy a file in `data/projects/`, copy a page in `projects/` and change the id in it, then add the id to `projects` in `data/site.js`.

Tarot symbols: `wheel`, `moon`, `key`, `blade`, `cup`, `star`, `eye`, `sun`.
