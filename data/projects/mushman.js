/* Mushman — LITE page, fourth draft.
   Source: GML exported from the build (C:\Users\xxxba\OneDrive\Desktop\MUSHMAN (1)\gml_*.gml via UndertaleModTool).
   There is still no GameMaker project and no repo.
   David (Nov 2026): he worked on the COMBAT mechanics, with help from a teammate. Someone else made the abilities
   (double jump, dash, push, spike). So the system on this page is Combat, not abilities.
   [EDIT ME] = David must fill in. [CHECK] = David must confirm.
   LootLocker files (sprLL*, objLL*, LootLocker*, LL* scripts) are the LootLocker leaderboard example, not David's.
   WARNING: obj_character Create_0 and LootLockerInitialize contain the LootLocker game key.
   Never put that code on the site or in a public repo. The snippets below do not include it. */
registerProject({
  id: "mushman",
  title: "Mushman",
  year: "Year 1",
  course: "Semester 1, block 2",
  engine: "GameMaker Studio 2 · 2D",
  team: "Team project",
  symbol: "wand",
  theme: null,
  cover: "assets/img/mushman/MushmanCoverr_edited.jpg",
  hook: "Three mushroom tribes, one portal and an evil spirit. Fight through caves and skies as Mushman.",
  summary: "My first digital game: a 2D pixel-art platformer where a small mushroom fights through a cave world and a sky world. Beat the enemies and upload your score to an online leaderboard. [CHECK]",
  cardChips: ["GameMaker Studio 2", "2D", "Team"],
  links: [],

  versions: [
    {
      id: "v1-0", name: "v1.0 · Course version", details: "Year 1 · Semester 1, block 2",
      chips: ["Role · [EDIT ME]", "GameMaker Studio 2", "2D", "Team project"],
      glance: [
        "A 2D platformer. Move with A and D, jump with Space, attack with the mouse. You have 6 hearts and checkpoints.",
        "Fight foxes, bats and birds, take an ability and post your score on an online leaderboard.",
        "I built: the combat. The sword swing, hits, damage and knockback, with help from a teammate. My first digital game."
      ],
      play: null,                                   // [EDIT ME: link to a download of the build, see the note at the top]
      date: null,
      trailer: { caption: "Gameplay video: v1.0 · Course version" },
      systems: ["combat"]
    }
  ],

  systems: {
    "combat": {
      short: "Combat",
      name: "Combat",
      symbol: "wand",
      overview: "Click to swing. The swing creates a hitbox in front of Mushman for a moment, and every enemy it touches loses health. A hit enemy slides back and shows a damage sprite. If an enemy touches you, you lose a heart, get knocked back and can't be hit again for two seconds. Attacks have a short cooldown, so you can't spam them.",
      media: [
        { caption: "The tutorial level: controls and the first jump", src: "assets/img/mushman/MushmanTutorial.png" },
        { caption: "Fighting an enemy: video or GIF" }
      ],
      deepDive: "I built the combat with help from a teammate. [EDIT ME: what did they help with, and what was the hardest part?] Each attack makes a short-lived hitbox object. It remembers who made it, how much damage it does and how far it pushes. Each enemy type has its own collision script that decides what a hit does.",
      code: `// obj_character, Step: left click swings the sword, then waits for the cooldown
if (mouse_check_button_pressed(mb_left) && attack_delay == 1 && !global.pushing)
{
    global.attacking = true;
    global.hit_dir = 0;

    if (dir == 0)
        global.hit_dir = 1;
    else if (dir == 1)
        global.hit_dir = -1;

    if (!gothitSprite)
        create_hitbox(x, y, self, swing_hitbox, cknockback, hit_lifespan, cdamage, global.hit_dir);

    attack_delay = 0;
    alarm[5] = 50;   // Alarm 5 sets attack_delay back to 1
}

// create_hitbox(): one hitbox object per swing
function create_hitbox()
{
    var x_position = argument0;
    var y_position = argument1;
    var creator = argument2;
    var sprite = argument3;
    var knockback = argument4;
    var lifespan = argument5;
    var damage = argument6;
    var xscale = argument7;
    var hitbox = instance_create_layer(x_position, y_position, "Enemies", obj_hitbox);
    hitbox.sprite_index = sprite;
    hitbox.creator = creator;
    hitbox.knockback = knockback;
    hitbox.alarm[0] = lifespan;   // Alarm 0 destroys the hitbox
    hitbox.damage = damage;
    hitbox.image_xscale = xscale;
}

// obj_hitbox, collision with obj_fox: the fox loses health
other.foxhp--;

// obj_fox, Step: a hit makes the fox slide back for 35 steps
if (place_meeting(x, y, obj_hitbox))
    Pushed = -35;`,
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    }
  }
});
