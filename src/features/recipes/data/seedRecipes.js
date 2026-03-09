export const seedRecipes = [
  {
    id: "a1b2c3",
    name: "Iced Latte",
    method: "espresso",
    timeMinutes: 5,
    servings: 1,
    image: "",

    ingredients: [
      {
        id: "ing-1",
        item: "Espresso",
        amount: 2,
        unit: "shots",
      },
      {
        id: "ing-2",
        item: "Milk",
        amount: 8,
        unit: "oz",
      },
      {
        id: "ing-3",
        item: "Ice",
        amount: 1,
        unit: "cup",
      },
    ],

    steps: [
      { id: "step-1", text: "Pull espresso shots." },
      { id: "step-2", text: "Fill a glass with ice." },
      { id: "step-3", text: "Add milk, then espresso." },
    ],

    notes: "Use oat milk for a sweeter taste.",
  },

  {
    id: "d4e5f6",
    name: "French Press",
    method: "french-press",
    timeMinutes: 8,
    servings: 2,
    image: "",

    ingredients: [
      {
        id: "ing-4",
        item: "Coffee (coarse grind)",
        amount: 4,
        unit: "tbsp",
      },
      {
        id: "ing-5",
        item: "Hot water",
        amount: 16,
        unit: "oz",
      },
    ],

    steps: [
      { id: "step-4", text: "Add coffee to press." },
      { id: "step-5", text: "Pour in hot water and stir." },
      { id: "step-6", text: "Steep 4 minutes." },
      { id: "step-7", text: "Press slowly and serve." },
    ],

    notes: "Best around 200°F water.",
  },
];
