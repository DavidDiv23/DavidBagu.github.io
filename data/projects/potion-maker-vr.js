/* Potion Maker VR — LITE page, first draft from the Unity project (The_3_Muskateers).
   [EDIT ME] = David must fill in. [CHECK] = guess from the code or git history, David must confirm.
   Git history: DavidDiv23 43 commits, Stefan Mandita 7, XxBroglexX 1. David committed most of the potion scripts. */
registerProject({
  id: "potion-maker-vr",
  title: "Potion Maker VR",
  year: "Year 2",
  course: "Block 1",
  engine: "Unity · VR",
  team: "Team project [CHECK: git shows 3 people]",
  symbol: "pentacle",
  theme: null,
  cover: "",
  hook: "Grab two potions, drop them in the reactor and see what you brew.",
  summary: "A VR game about mixing potions with your hands. Two potions go into the reactor and a new one comes out.",
  cardChips: ["Unity", "VR", "Team"],
  links: [{ label: "View code on GitHub", url: "" }],   // [EDIT ME: repo link, if it may be public]

  versions: [
    {
      id: "v1-0", name: "v1.0 · Course version", details: "Year 2 · Block 1",
      chips: ["Role · [EDIT ME]", "Unity", "VR", "Team project"],
      glance: [
        "Pick up potions in VR, mix two in the reactor and get a new potion.",
        "I built most of it: the potion data and recipes, the reactor, breaking potions and the levers.",
        "Made in a team of [CHECK: 3] for Block 1, Year 2."
      ],
      play: null,
      date: null,                                   // add e.g. "2025-11" to show it in News
      trailer: { caption: "Gameplay video: v1.0 · Course version" },
      systems: ["potion-mixing"]
    }
  ],

  systems: {
    "potion-mixing": {
      short: "Mixing",
      name: "Potion mixing",
      symbol: "pentacle",
      overview: "Every potion is a data asset: a name, tags, a color and a list of recipes. Put two potions in the two sockets of the reactor and it looks up the recipe. It does not matter which one goes in first. The result appears at the output point, and the two base potions respawn on the shelf. Potions also break when they hit something fast enough, and they show their name and tags when you hold them.",
      media: [
        { caption: "Mixing two potions in the reactor: video" },
        { caption: "A potion breaking and splashing: GIF" }
      ],
      deepDive: "The reactor asks both potions for a recipe, in both directions, so the order does not matter. If there is no recipe, nothing happens.",
      code: `private PotionData FindMixResult(PotionData dataA, PotionData dataB)
{
    // Check both directions since mixing should be order-independent
    PotionData result = dataA.GetMixResult(dataB);

    // If no result or it's the default, check the reverse
    if (result == null || result == dataA.defaultMixResult)
    {
        result = dataB.GetMixResult(dataA);
    }

    // If still no valid result or it's the other potion's default, return null
    if (result == null || result == dataB.defaultMixResult)
    {
        return null;
    }

    return result;
}`,
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    }
  }
});
