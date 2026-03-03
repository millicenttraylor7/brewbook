export const seedRecipes = [
  {
    id: "a1b2c3",
    name: "Iced Latte",
    method: "espresso",
    timeMinutes: 5,
    servings: 1,
    ingredients: [
      { item: "Espresso", amount: 2, unit: "shots" },
      { item: "Milk", amount: 8, unit: "oz" },
      { item: "Ice", amount: 1, unit: "cup" },
    ],
    steps: [
      "Pull espresso shots.",
      "Fill a glass with ice.",
      "Add milk, then espresso.",
    ],
    notes: "Use oat milk for a sweeter taste.",
  },
  {
    id: "d4e5f6",
    name: "French Press",
    method: "french-press",
    timeMinutes: 8,
    servings: 2,
    ingredients: [
      { item: "Coffee (coarse grind)", amount: 4, unit: "tbsp" },
      { item: "Hot water", amount: 16, unit: "oz" },
    ],
    steps: [
      "Add coffee to press.",
      "Pour in hot water and stir.",
      "Steep 4 minutes.",
      "Press slowly and serve.",
    ],
    notes: "Best around 200°F water.",
  },
];
