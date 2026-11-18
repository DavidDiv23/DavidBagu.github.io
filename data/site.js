/* =====================================================================
   SITE SETTINGS — your name, links, About text and project order.
   Anything left as "" shows a "Coming soon" message instead of a broken link.
   ===================================================================== */
window.SITE = {
  name: "David-Mihai Bagu",
  role: "Game programmer",
  tagline: "Game programming student at Hanze, Groningen",

  // A few short paragraphs. <strong>…</strong> makes words bold.
  about: [
    "Hi, I'm David, a <strong>game programmer</strong> studying Creative Media and Game Technologies at <strong>Hanze University of Applied Sciences</strong> in Groningen.",
    "I've built games in Unity, GameMaker Studio 2 and VR, solo and in teams, including a game for a real medical client.",
    "[EDIT ME: one line about you outside programming]"
  ],

  photo: "",                      // e.g. "assets/img/me.jpg"
  cv: "assets/files/David-Mihai-Bagu-CV.pdf",   // PLACEHOLDER: replace with the internship CV before applying

  status: { show: true, text: "Open to internships · Feb 2027" },

  links: {
    github: "https://github.com/DavidDiv23",
    linkedin: "https://www.linkedin.com/in/david-mihai-b%C3%A2gu-1920a2309/",
    itch: "https://divdavid.itch.io/",
    email: "david.mihai.bagu23@gmail.com"
  },

  contact: {
    title: "Looking for a programming internship from February 2027",
    text: "I'm looking for a game programming internship starting in February 2027. The easiest way to reach me is by email or LinkedIn."
  },

  // Order of the project cards. Each name matches a file in data/projects/ and a page in projects/.
  projects: [
    "brown-sugar-rush",
    "medical-client-game",
    "potion-maker-vr",
    "robot",
    "gdd-minor",
    "theseus-protocol",
    "adventurier",
    "mushman"
  ],

  newsCount: 5,

  // Extra news that isn't a project version (project versions with a date show up automatically).
  // Example: { date: "2026-12-06", title: "Portfolio launched", text: "Eight projects online.", tag: "Site" }
  news: []
};
