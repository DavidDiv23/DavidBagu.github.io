/* [Medical client game] — LITE page, first draft from the Unity project (MobilePrototype).
   [EDIT ME] = David must fill in. [CHECK] = guess from the code or git history, David must confirm.
   CHECK: may this be shown publicly? Is the client's name allowed on the page?
   Git history (Mar–Jun 2025): ivos 87 commits, HydroHydraa 40, DavidDiv23 23, casperxp 8, Robin-hffmnn 7, borcya 2.
   David's files: S_BloodPressure/UI_BloodPressure.cs, S_Crafting (UI_Crafting, button), ProximityCanvas, ItemPickup2, small inventory edits.
   WARNING: those dates are Year 1 semester 2, not Year 2 semester 2 as CLAUDE.md says. Is this the right project? */
registerProject({
  id: "medical-client-game",
  title: "[Medical client game]",
  year: "[CHECK: Year 1 or 2? git dates say Mar–Jun 2025]",
  course: "Semester 2 team project",
  engine: "Unity",
  team: "Team project",
  symbol: "sun",
  theme: null,
  cover: "",
  hook: "A cozy village game where you play a nurse.",
  summary: "A cozy 3D game for a medical client. You play a nurse and look after patients. It has an Animal Crossing look. [CHECK]",
  cardChips: ["Unity", "Real client", "Team"],
  links: [
    { label: "Organization page", url: "" },   // [EDIT ME]
    { label: "Socials", url: "" }              // [EDIT ME]
  ],

  versions: [
    {
      id: "v1-0", name: "v1.0 · Client release", details: "Team project",
      chips: ["Role · [EDIT ME]", "Team project", "Real client"],
      glance: [
        "[EDIT ME: what the client wanted, in one line]",
        "I built: [CHECK: the blood pressure minigame, the crafting screen and parts of the inventory (from git)]",
        "Made for a medical client in a team of [CHECK: 6]."
      ],
      play: null,
      date: null,
      trailer: { caption: "Gameplay video: v1.0 · Client release" },
      systems: ["blood-pressure"]
    }
  ],

  systems: {
    "blood-pressure": {
      short: "Blood pressure",
      name: "Blood pressure minigame",
      symbol: "sun",
      overview: "A small minigame for taking a patient's blood pressure. A bar drops all the time, and you press a button to push it back up. Keep it in the green zone to fill the score fast. Yellow fills it slowly and red gives nothing. When the score reaches 100% the minigame closes. All zones, speeds and scores can be tuned in the inspector.",
      media: [
        { caption: "The blood pressure minigame: video or GIF" }
      ],
      deepDive: "[EDIT ME: what was the hardest part? The git history says the minigame first had to be linked to patient care.]",
      code: `void Update()
{
    if (!gameActive) return;

    pressureBar.value -= decayRate * Time.deltaTime;
    pressureBar.value = Mathf.Clamp01(pressureBar.value);

    UpdateBarColor();
    UpdateScore();
    UpdateSpriteDisplay();
}

void OnButtonPressed()
{
    if (!gameActive) return;
    pressureBar.value += pressGain;
}`,
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    }
  }
});
