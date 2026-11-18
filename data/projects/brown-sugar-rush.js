/* Brown Sugar Rush — FULL page (placeholders marked [EDIT ME] / [CHECK]) */
registerProject({
  id: "brown-sugar-rush",
  title: "Brown Sugar Rush",
  year: "Year 2",
  course: "Game Design course, remade for mobile",
  engine: "Unity",
  team: "[CHECK: solo or team]",
  symbol: "cup",
  theme: { accentHue: 335, neutralHue: 25 },   // pink accents, cocoa background
  cover: "",                                   // e.g. "assets/img/brown-sugar-rush/cover.jpg"
  hook: "[EDIT ME: one-line hook. What the game is and why it’s fun]",
  summary: "A boba shop game. Started as a PC prototype for the Game Design course, then remade for mobile.",
  cardChips: ["Unity", "PC", "Android"],
  links: [{ label: "View code on GitHub", url: "" }],

  versions: [
    {
      id: "v1-0", name: "v1.0 · PC prototype", details: "Game Design course · PC",
      date: null,                                // e.g. "2026-01" — add a date to show it in News
      chips: ["Role · [your role]", "PC", "Unity"],
      trailer: { caption: "Gameplay video: v1.0 PC prototype" },
      glance: ["[What the game is, in one line]", "I built: [systems]", "Made for the Game Design course"],
      play: { label: "Play v1.0 on itch.io", url: "" },
      systems: ["drink-mixing", "day-loop"]
    },
    {
      id: "v1-1", name: "v1.1 · Mobile remake", details: "Mobile Development course · Android",
      date: "2026-10",
      news: "Remade for mobile (Android)",
      newsTag: "New version",
      chips: ["Role · [your role]", "Android", "Unity"],
      trailer: { caption: "Gameplay video: v1.1 mobile" },
      glance: ["[What the game is, in one line]", "I built: [systems]", "New in v1.1: rebuilt for Android with touch controls [CHECK]"],
      play: { label: "Play v1.1 on itch.io", url: "" },
      patch: {
        from: "v1.0 · PC prototype", to: "v1.1 · Mobile remake", fromShort: "v1.0", toShort: "v1.1",
        before: "", after: "",                   // screenshot paths for the slider
        added: ["Touch controls [CHECK]", "[New feature]"],
        reworked: ["[System you rebuilt]"],
        fixed: ["[Bug or performance fix]"]
      },
      systems: ["drink-mixing", "day-loop", "touch-controls"]
    }
  ],

  systems: {
    "drink-mixing": {
      numeral: "I", card: "The Cup", name: "Drink mixing [CHECK]", symbol: "cup",
      tags: { all: ["[EDIT ME: tags]"] },
      overview: "[EDIT ME: how the mix stations work (toppings, fruit, liquids, assembly) and what you programmed.]",
      media: [{ caption: "Mixing a drink: video" }, { caption: "Toppings: GIF" }, { caption: "Assembly: GIF" }],
      deepDive: "[EDIT ME: how you built it, which problem you hit and how you solved it.]",
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    },
    "day-loop": {
      numeral: "II", card: "The Sun", name: "Day loop [CHECK]", symbol: "sun",
      tags: { all: ["[EDIT ME: tags]"] },
      overview: "[EDIT ME: how a shop day runs, from the first customer to the end-of-day stats.]",
      media: [{ caption: "A full day: video" }],
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    },
    "touch-controls": {
      numeral: "III", card: "The Moon", name: "Touch controls [CHECK]", symbol: "moon",
      tags: { all: ["Added in v1.1", "Mobile"] },
      overview: "[EDIT ME: how you moved the controls from mouse to touch.]",
      media: [{ caption: "Touch controls: video" }],
      learned: "[EDIT ME]"
    }
  }
});
