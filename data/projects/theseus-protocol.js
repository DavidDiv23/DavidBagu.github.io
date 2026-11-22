/* Theseus Protocol — COMING SOON page (David: "it's not going to be available yet").
   status "coming-soon" shows a "Coming soon" badge on the homepage card and a chip on this page.
   When it is ready: change status to "in-development" or remove it, and fill in the real content. */
registerProject({
  id: "theseus-protocol",
  title: "Theseus Protocol",
  year: "Current",
  course: "Narrative design course",
  engine: "Unity",
  team: "Solo [CHECK]",
  status: "coming-soon",
  symbol: "sword",
  theme: null,
  cover: "",
  hook: "Coming soon.",
  summary: "A robot gains other robots' parts during a war, seeing both sides. The parts it wears change how it acts and who it is. Coming soon.",
  cardChips: ["Narrative design", "Unity"],
  links: [],

  versions: [
    {
      id: "s1", name: "Submission 1", details: "Narrative design course",
      chips: ["Narrative design", "Unity"],
      glance: [
        "A robot gains other robots' parts during a war, seeing both sides.",
        "The parts it wears change how it acts and who it is.",
        "This project is not available yet."
      ],
      play: null,
      date: null,
      trailer: { caption: "Coming soon" },
      systems: ["main"]
    },
    {
      id: "s2", name: "Submission 2", details: "Coming soon", planned: true, date: null,
      trailer: { caption: "Coming soon" }
    }
  ],

  systems: {
    "main": {
      short: "Coming soon",
      name: "Coming soon",
      symbol: "sword",
      overview: "I am still working on this project. It will be shown here when it is ready.",
      media: [{ caption: "Coming soon" }]
    }
  }
});
