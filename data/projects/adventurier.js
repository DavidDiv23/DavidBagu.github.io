/* Adventurier — LITE page, first draft from the Unity project (Zoo-Game).
   [EDIT ME] = David must fill in. [CHECK] = guess from the code or git history, David must confirm.
   The bubble minigame is NOT on the repo's main branch. It lives on the branches Demo / Testing / MergingSafari
   (example game 1/Assets/Script/Arctic/BUBBLE ARCTIC/). Git credits most of the arctic scripts to "Jaime Rojas";
   DavidDiv23 changed Bubble Spawner.cs ("Bubble spawning change", 2024-06-08). David says the bubble minigame is his work.
   If the GitHub link is added, point it at the Demo branch or merge it into main first.
   Dates: the team's commits are from May-June 2024. Check the Year / Semester fields. */
registerProject({
  id: "adventurier",
  title: "Adventurier",
  year: "Year 1",
  course: "Semester 2",
  engine: "Unity · 3D",
  team: "Team project",
  symbol: "moon",
  theme: null,
  cover: "",
  hook: "A 3D zoo adventure with a minigame at every animal area, played by touch.",
  summary: "A 3D zoo adventure for touch screens. You ride a bus to the arctic, safari and jungle, and every area has its own minigame. [CHECK: is this the right description?]",
  cardChips: ["Unity", "3D", "Touch", "Team"],
  links: [{ label: "View code on GitHub", url: "" }],   // [EDIT ME: repo link, see the note at the top]

  versions: [
    {
      id: "v1-0", name: "v1.0 · Semester project", details: "Year 1 · Semester 2",
      chips: ["Role · [EDIT ME]", "Unity", "3D", "Touch", "Team project"],
      glance: [
        "Ride a bus through a zoo and play a minigame in each area: arctic, safari and jungle.",
        "I built: the arctic bubble minigame. Tap the bubbles around the seal to pop them.",
        "A full-semester team project."
      ],
      play: null,
      date: null,
      trailer: { caption: "Gameplay video: v1.0 · Semester project" },
      systems: ["bubble-minigame"]
    }
  ],

  systems: {
    "bubble-minigame": {
      short: "Bubble pop",
      name: "Arctic bubble minigame",
      symbol: "moon",
      overview: "In the arctic area, bubbles float up in front of a seal. You tap a bubble to pop it. Each pop adds to your score. At 10 points the minigame ends: the bubbles disappear, the seal plays an animation, the joystick comes back and the game tells you where to go next.",
      media: [
        { caption: "Popping the bubbles in the arctic: video or GIF" },
        { caption: "The seal animation at the end: GIF" }
      ],
      deepDive: "[CHECK] My first spawner counted frames to decide when to make a bubble, so the speed depended on the frame rate of the device. I changed it to a timer that uses Time.deltaTime, so bubbles come at the same pace everywhere.",
      code: `// BubbleSpawner.cs: a bubble every "speed" seconds, at a random spot
timer += Time.deltaTime;
if (timer >= speed)
{
    timer = 0;
    Vector3 randomSpawnPosition = new Vector3(z, y, x);
    GameObject spawnedBubble = Instantiate(Bubble, randomSpawnPosition, rotation);
    Destroy(spawnedBubble, bubbleLifetime);
}

// BubbleDestroy.cs: tap a bubble to pop it
if (Input.touchCount > 0)
{
    Touch touch = Input.GetTouch(0);
    if (touch.phase == TouchPhase.Began)
    {
        Ray ray = Camera.main.ScreenPointToRay(touch.position);
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit))
        {
            if (hit.collider != null && hit.collider.gameObject.CompareTag("Bubble"))
            {
                Destroy(hit.collider.gameObject);
                i++;
                UpdateScoreText();
            }
        }
    }
}`,
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    }
  }
});
