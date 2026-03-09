export async function fetchCoffeeCocktails() {
  try {
    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=coffee",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch cocktail recipes.");
    }

    const data = await res.json();

    if (!data?.drinks) return [];

    return data.drinks.map((drink) => {
      const ingredients = [];

      for (let i = 1; i <= 15; i++) {
        const item = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (item) {
          ingredients.push({
            id: crypto.randomUUID(),
            item: item.trim(),
            amount: measure ? measure.trim() : "",
            unit: "",
          });
        }
      }

      return {
        id: drink.idDrink,
        name: drink.strDrink,
        method: "cocktail",
        timeMinutes: 5,
        servings: 1,
        ingredients,
        steps: drink.strInstructions
          ? [
              {
                id: crypto.randomUUID(),
                text: drink.strInstructions.trim(),
              },
            ]
          : [],
        notes: "Imported from TheCocktailDB",
      };
    });
  } catch (error) {
    console.error("Cocktail API error:", error);
    return [];
  }
}
