/* Brown Sugar Rush — FULL page.
   Drafted from the real Unity code (v1.0: Brown-Sugar-Rush, v1.1: MobileDev-Final).
   [EDIT ME] = David must fill in. [CHECK] = guess from the code, David must confirm. */
registerProject({
  id: "brown-sugar-rush",
  title: "Brown Sugar Rush",
  year: "Year 2",
  course: "Game Design course, remade for mobile",
  engine: "Unity",
  team: "Solo",
  symbol: "cup",
  theme: { accentHue: 343, neutralHue: 22, neutralSat: 3 },   // v1.1 game colors: pink E8648A (hue 343), dark brown 2E2018 (hue 22)
  cover: "assets/img/brown-sugar-rush/01-title.png",
  hook: "Run a boba shop for one day: tap, mix, stir, slice and serve.",
  summary: "A boba shop game. It started as a PC prototype for the Game Design course, then I rebuilt it for Android with touch minigames and a customer rush. A love letter to the real boba shop T voor Thee (instagram.com/tvoorthee).",
  cardChips: ["Unity", "PC", "Android"],
  links: [{ label: "View code on GitHub", url: "" }],   // [EDIT ME: repo link, if the repos may be public]

  versions: [
    {
      id: "v1-0", name: "v1.0 · PC prototype", details: "Game Design course · PC",
      date: null,                                // add e.g. "2025-12" to show it in News
      chips: ["Role · Developer", "Solo", "PC", "Unity"],
      trailer: { caption: "Gameplay video: v1.0 PC prototype" },
      glance: [
        "Make boba drinks for 10 customers, one button step at a time.",
        "I built: the drink mixing steps, the order check and the live drink picture.",
        "Made for the Game Design course (December 2025)."
      ],
      play: { label: "Play v1.0 on itch.io", url: "" },
      systems: ["drink-mixing"]
    },
    {
      id: "v1-1", name: "v1.1 · Mobile remake", details: "Mobile Development course · Android",
      date: "2026-10",
      news: "Remade for mobile (Android)",
      newsTag: "New version",
      chips: ["Role · Developer", "Solo", "Android", "Unity"],
      trailer: { caption: "Gameplay video: v1.1 mobile" },
      glance: [
        "Run a boba shop for one day (about 6 minutes): take orders, make the drink, serve it.",
        "I built: the mix station, the customer rush and the touch minigames.",
        "New in v1.1: rebuilt for Android with drag and drop, minigames, tips and a day timer."
      ],
      play: { label: "Play v1.1 on itch.io", url: "https://divdavid.itch.io/brown-sugar-rush" },
      patch: {
        from: "v1.0 · PC prototype", to: "v1.1 · Mobile remake", fromShort: "v1.0", toShort: "v1.1",
        before: "", after: "",                   // screenshot paths for the slider
        added: [
          "A day with a clock: tap the sign to open, tap it again at closing time",
          "Customers arrive in a queue. Tips bring more of them, wrong drinks slow them down",
          "Speed-based tips",
          "Touch minigames: slice fruit, stir tapioca, drizzle syrup, measure powder",
          "Drag and drop to fill the cup",
          "A menu of 19 drinks"
        ],
        reworked: [
          "Mixing: from one button per choice to a 4-step station (Tea, Fruit, Toppings, Assembly)",
          "Order check: v1.0 only checked category and size. v1.1 checks the liquids, sugar, syrup and the order of the cup",
          "Drinks and ingredients: from enums in code to ScriptableObject data"
        ],
        fixed: [
          "[EDIT ME: a bug or performance fix you remember]"
        ]
      },
      systems: ["mix-station", "day-and-rush", "touch-minigames"]
    }
  ],

  systems: {
    /* ───────────── v1.0 ───────────── */
    "drink-mixing": {
      numeral: "I", short: "Drinks", name: "Drink mixing", symbol: "cup",
      tags: { all: ["v1.0", "UI", "Data-driven"] },
      overview: "A customer asks for a drink. You build it one step at a time: size, drink type, boba, ice, sugar, milk and cream. Each choice changes the picture of the cup right away. When you serve, the game checks your cup against the order.",
      media: [{ caption: "Mixing a drink: video" }, { caption: "The cup changes with each step: GIF" }],
      diagram: {
        key: "B",
        nodes: { A: "CustomerManager", B: "MixingController", C: "CupState", D: "DrinkVisualController", E: "DrinkRecipeSO", F: "DrinkEnums" },
        labels: { AB: "currentOrder", BC: "stores choices", BD: "SetSize(), SetMilk()…", DE: "colors" }
      },
      scripts: {
        CustomerManager: {
          role: "picks the order",
          resp: "Picks a random DrinkRecipeSO as the current order and writes it as text on the ticket.",
          code: `public void NextCustomer()
{
    var recipe = possibleRecipes[Random.Range(0, possibleRecipes.Length)];
    currentOrder = new CustomerOrder { recipe = recipe };

    orderText.text = BuildOrderText(recipe);
}`
        },
        MixingController: {
          role: "runs the steps",
          resp: "Shows one step group at a time (size, category, boba, ice, sugar, milk, cream). Every choice goes into the CupState and into the cup picture. Serve checks the cup against the order.",
          code: `private void ShowStep(int step)
{
    currentStep = step;

    stepSizeGroup.SetActive(step == 0);
    stepCategoryGroup.SetActive(step == 1);
    stepBobaGroup.SetActive(step == 2);
    stepIceGroup.SetActive(step == 3);
    stepSweetnessGroup.SetActive(step == 4);
    stepMilkGroup.SetActive(step == 5);
    stepCreamGroup.SetActive(step == 6);
}`,
          learned: "[EDIT ME]"
        },
        CupState: {
          role: "the cup you are making",
          resp: "Plain C# class (not a MonoBehaviour) that holds the current choices. Matches() compares them with the order. In v1.0 it only compares category and size.",
          code: `public bool Matches(CustomerOrder order)
{
    // For now, still only category + size.
    return category == order.recipe.category &&
           size == order.recipe.size;
}`
        },
        DrinkVisualController: {
          role: "draws the cup",
          resp: "Switches the cup layers on and off (liquid, boba, milk, ice, cream) and tints them. It handles both cup sizes.",
          code: `public void SetMilk(bool enabled)
{
    if (smallMilk) smallMilk.enabled = enabled && !IsLargeActive();
    if (largeMilk) largeMilk.enabled = enabled && IsLargeActive();
}`
        },
        DrinkRecipeSO: {
          role: "one drink on the menu",
          resp: "A ScriptableObject: category, size, boba, ice, sugar, milk and cream. New drinks are new assets, no new code.",
          code: `[CreateAssetMenu(menuName = "Boba/Drink Recipe")]
public class DrinkRecipeSO : ScriptableObject
{
    public string displayName;

    public DrinkCategory category;
    public DrinkSize size;

    public BobaType requiredBoba = BobaType.None;
    public IceAmount requiredIce = IceAmount.Regular;
    public SugarLevel requiredSugar = SugarLevel.Sugar100;

    public bool requiresMilk = false;
    public bool requiresCream = false;
}`
        },
        DrinkEnums: {
          role: "the choices",
          resp: "Enums for drink category, size, boba, ice and sugar level.",
          code: `public enum DrinkCategory { MilkTea, FruitTea, Matcha, Chocolate, HotDrink }
public enum DrinkSize { Medium, Large }
public enum BobaType { None, Tapioca, Strawberry, Lychee, Mango }`
        }
      },
      deepDive: "[EDIT ME: what was hard here? The code shows that the first version only checked category and size, even though the cup stores more. Why did you stop there?]",
      learned: "[EDIT ME]",
      improve: "Check every choice, not only category and size. v1.1 does this."
    },

    /* ───────────── v1.1 ───────────── */
    "mix-station": {
      numeral: "I", short: "Mixing", name: "Mix station", symbol: "cup",
      tags: { all: ["v1.1", "Gameplay", "Touch UI", "Data-driven"] },
      overview: "Every drink is made at the mix station in four steps: Tea, Fruit, Toppings and Assembly. You drag things from the tray into the cup, and the order you drop them in matters. When you finish, the game checks the liquids, the sugar level, the syrup and the order of the cup.",
      media: [
        { caption: "Step 1: measure the tea", src: "assets/img/brown-sugar-rush/03-tea-measuring-cup.png" },
        { caption: "Step 3: scoop the toppings", src: "assets/img/brown-sugar-rush/06-toppings.png" },
        { caption: "Step 4: drag everything into the cup, in order", src: "assets/img/brown-sugar-rush/08-assembly.png" },
        { caption: "The finished drink", src: "assets/img/brown-sugar-rush/09-drink-complete.png" }
      ],
      diagram: {
        key: "B",
        nodes: { A: "MixSteps", B: "ServiceController", C: "OrderEvaluator", D: "MixView", E: "DrinkRecipe", F: "Ingredient", G: "Order" },
        labels: { AB: "CommitLiquids()", BC: "Evaluate()", BD: "Changed", DE: "reads", DF: "reads", DG: "reads" }
      },
      scripts: {
        MixSteps: {
          role: "the four steps",
          resp: "Shows one step area at a time and moves on with one Next button. There are no tabs to hunt for. A new order always starts at step 1. Leaving the Tea step hands the measured tea to the tray.",
          code: `public void Next()
{
    if (service.State != ServiceState.Making || Current >= areas.Length - 1) return;
    if (Current == 0) service.CommitLiquids();   // the measured tea goes onto the tray
    Show(Current + 1);
}`,
          learned: "[EDIT ME]"
        },
        ServiceController: {
          role: "the drink-making loop",
          resp: "Holds everything about the drink in progress (tray, cup, poured liquid, syrup, sugar level) and moves through the states NoCustomer, CustomerWaiting, Making and DrinkReady. It has no UI code. Views listen to its Changed event and redraw.",
          code: `public void PlaceInCup(Ingredient i)
{
    if (State != ServiceState.Making) return;
    Tray.Remove(i);
    Cup.Add(i);
    CupPlaced?.Invoke();
    Changed?.Invoke();
}`,
          learned: "[EDIT ME]"
        },
        OrderEvaluator: {
          role: "checks the drink",
          resp: "A static class with only logic. It builds the list of what an order needs, checks the finished cup against it and works out the tip. A wrong drink still gets served, but earns no price and no tip.",
          code: `bool correct = syrup == recipe.syrup
               && sugarPercent == order.sugarPercent
               && LiquidsMatch(recipe, poured)
               && MatchesOrder(RequiredAssembly(order, s), placed);

float tip = 0f;
if (correct)
{
    // 1 when fast, 0 when slow, linear in between.
    float speed = 1f - Mathf.InverseLerp(s.fastServeSeconds, s.slowServeSeconds, secondsTaken);
    tip = s.maxTip * speed * Mathf.Clamp01(quality);
}`,
          learned: "[EDIT ME]"
        },
        MixView: {
          role: "draws the station",
          resp: "Redraws the tray, the cup list and the buttons whenever ServiceController says something changed. The cup is the drop zone that accepts ingredients.",
          code: `cupZone.Accepts = p => service.State == ServiceState.Making && p.kind == PayloadKind.Ingredient;
cupZone.Dropped += p => service.PlaceInCup(p.ingredient);`
        },
        DrinkRecipe: {
          role: "one drink on the menu",
          resp: "A ScriptableObject with liquids (and how many increments of each), fruit, fixed toppings, a choice of toppings, syrup and extras. The ticket and the checks are generated from this data.",
          code: `[CreateAssetMenu(menuName = "Brown Sugar Rush/Drink Recipe")]
public class DrinkRecipe : ScriptableObject
{
    public string displayName;
    public float price = 4f;
    public LiquidAmount[] liquids = new LiquidAmount[0];
    public Ingredient[] fruits = new Ingredient[0];
    public Ingredient[] toppings = new Ingredient[0];
    public Ingredient[] toppingChoices = new Ingredient[0];
    public Ingredient syrup;
    public Ingredient[] extras = new Ingredient[0];

    public int TotalIncrements => liquids.Sum(l => l.increments);
}`
        },
        Ingredient: {
          role: "one pickable item",
          resp: "A ScriptableObject: name, shelf category, sprite, tint and whether it needs stirring. The menu can grow without code changes.",
          code: `public class Ingredient : ScriptableObject
{
    public string displayName;
    public IngredientCategory category;
    public Sprite sprite;
    public Color tint = Color.white;
    public bool needsStir;
}`
        },
        Order: {
          role: "one customer's order",
          resp: "The drink plus the choices every customer makes at random: sugar level, ice and a topping of choice. It also remembers when the order was taken, for the tip.",
          code: `public static Order Create(DrinkRecipe recipe)
{
    var o = new Order
    {
        recipe = recipe,
        sugarPercent = SugarLevels[Random.Range(0, SugarLevels.Length)],
        ice = (IceLevel)Random.Range(0, 3)
    };
    if (recipe.toppingChoices != null && recipe.toppingChoices.Length > 0)
        o.chosenTopping = recipe.toppingChoices[Random.Range(0, recipe.toppingChoices.Length)];
    return o;
}`
        }
      },
      deepDive: "[EDIT ME: how did you decide to keep logic (ServiceController, OrderEvaluator) apart from the views? What went wrong before you did it?]",
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    },

    "day-and-rush": {
      numeral: "II", short: "Customers", name: "Day and customer rush", symbol: "sun",
      tags: { all: ["v1.1", "Gameplay", "Balance"] },
      overview: "One shop day is about six minutes. You tap the sign to open the shop and a clock counts down. Customers arrive in a queue of up to three. Fast, correct drinks earn tips, and tips bring customers faster. Wrong drinks slow them down. That is the only punishment. At closing time you tap the sign again and see your stats.",
      media: [
        { caption: "A customer waits at the counter", src: "assets/img/brown-sugar-rush/02-counter-customer.png" },
        { caption: "Serving a drink earns coins and a tip", src: "assets/img/brown-sugar-rush/10-serve-coins.png" },
        { caption: "End-of-day stats", src: "assets/img/brown-sugar-rush/11-day-complete.png" }
      ],
      diagram: {
        key: "A",
        nodes: { A: "DayManager", B: "CustomerQueue", C: "ServiceController", D: "GameSettings", E: "StatsScreen" },
        labels: { AB: "OrderServed", BC: "Peek()", AD: "reads" }
      },
      scripts: {
        DayManager: {
          role: "the day",
          resp: "Owns the flow: waiting to open, open, ended. It counts the clock down and keeps the day's totals (customers, correct drinks, money, tips). It sends events so other scripts do not need to ask it every frame.",
          code: `public void RecordOrder(OrderResult r)
{
    CustomersServed++;
    if (r.correct) DrinksCorrect++;
    TotalMoney += r.price + r.tip;
    Tips += r.tip;
    OrderServed?.Invoke(r);
}`,
          learned: "[EDIT ME]"
        },
        CustomerQueue: {
          role: "the rush",
          resp: "Spawns customers on a cooldown. After every served order the cooldown changes: a tip makes it shorter, a wrong drink makes it longer. The cooldown stays between a minimum and a maximum.",
          code: `void OnOrderServed(OrderResult r)
{
    var s = day.Settings;
    if (!r.correct) cooldown += s.cooldownPenaltyPerWrong;
    else if (r.tip > 0f) cooldown -= s.cooldownReductionPerTip;
    cooldown = Mathf.Clamp(cooldown, s.minCooldown, s.maxCooldown);
}`,
          learned: "[EDIT ME]"
        },
        GameSettings: {
          role: "all the balance numbers",
          resp: "One ScriptableObject holds the day length, cooldowns, tip times and the menu. The day can be tuned without touching code.",
          code: `[Header("Customer rush (spawn cooldown, seconds)")]
public float startCooldown = 20f;
public float minCooldown = 8f;
public float maxCooldown = 30f;
public float cooldownReductionPerTip = 2f;
public float cooldownPenaltyPerWrong = 5f;
public int maxQueue = 3;`
        }
      },
      deepDive: "[EDIT ME: how did you find the numbers? Did friends or other testers change them?]",
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    },

    "touch-minigames": {
      numeral: "III", short: "Minigames", name: "Touch minigames", symbol: "moon",
      tags: { all: ["v1.1", "Mobile", "Touch input"] },
      overview: "Slicing fruit, stirring tapioca, drizzling syrup and measuring powder are short touch minigames. Each one gives a score from 0 to 1. A sloppy score only lowers the tip. It never fails the drink. The same code works with touch and with a mouse.",
      media: [
        { caption: "Slicing fruit: swipe along the dotted lines", src: "assets/img/brown-sugar-rush/05-slice-fruit.png" },
        { caption: "Stirring the tapioca: circle your finger", src: "assets/img/brown-sugar-rush/07-stir-tapioca.png" },
        { caption: "Measuring powder", src: "assets/img/brown-sugar-rush/04-powder-bowl.png" }
      ],
      diagram: {
        key: "B",
        nodes: { A: "ServiceController", B: "Minigame", D: "CutMinigame", E: "StirMinigame", F: "SyrupMinigame", G: "PowderMinigame" },
        labels: { AB: "AddQuality()" }
      },
      scripts: {
        Minigame: {
          role: "base class",
          resp: "A pop-up panel over the mix area. It reads pointer input from Unity's event system, so touch and mouse behave the same. A subclass calls Finish(score) and the score goes back through a callback.",
          code: `protected void Finish(float quality)
{
    var callback = onDone;
    onDone = null;
    panel.SetActive(false);
    Closed?.Invoke(this, true);
    callback?.Invoke(Mathf.Clamp01(quality));
}`,
          learned: "[EDIT ME]"
        },
        CutMinigame: {
          role: "slice the fruit",
          resp: "Swipe down along three dotted lines. A swipe counts if it is long enough, mostly vertical and close to a line that is not cut yet. The score is how close the swipes were.",
          code: `float meanX = (minX + maxX) * 0.5f;       // horizontal centre of the swipe
int best = -1;
float bestDist = Tolerance;
for (int i = 0; i < LineX.Length; i++)
{
    if (cut[i]) continue;
    float d = Mathf.Abs(meanX - LineX[i]);
    if (d <= bestDist) { bestDist = d; best = i; }
}
if (best < 0) return;`
        },
        StirMinigame: {
          role: "stir the tapioca",
          resp: "Move your finger in circles around the pot. The script adds up the angle you turned. Two full turns finish it, and a faster stir scores higher.",
          code: `float a = Angle(p);
travelled += Mathf.DeltaAngle(lastAngle, a);
lastAngle = a;

float progress = Mathf.Clamp01(Mathf.Abs(travelled) / (360f * TurnsNeeded));
SetProgress(progress);`
        },
        DraggableItem: {
          role: "drag and drop",
          resp: "A copy (ghost) follows the finger while the original stays put, so a failed drop snaps back. Inside the scrolling tray, a mostly-vertical drag scrolls the list instead of picking the item up.",
          code: `scrolling = scroll != null && Mathf.Abs(e.delta.y) > Mathf.Abs(e.delta.x);
if (scrolling) { ExecuteEvents.Execute(scroll.gameObject, e, ExecuteEvents.beginDragHandler); return; }`
        }
      },
      deepDive: "[EDIT ME: what went wrong on a real phone that you did not see in the Unity editor?]",
      learned: "[EDIT ME]",
      improve: "[EDIT ME]"
    }
  }
});
