import { useCallback, useEffect, useState } from "react";
import { seedRecipes } from "../data/seedRecipes";
import { makeId } from "../utils/id";
import { fetchCoffeeCocktails } from "../api/cocktailApi";

const STORAGE_KEY = "brewbook.recipes";

function ensureIds(list) {
  if (!Array.isArray(list)) return [];

  return list.map((r) => ({
    ...r,
    ingredients: (r.ingredients ?? []).map((ing) => ({
      id: ing.id ?? makeId(),
      amount: ing.amount ?? "",
      unit: ing.unit ?? "",
      item: ing.item ?? "",
    })),
    steps: (r.steps ?? []).map((s) =>
      typeof s === "string"
        ? { id: makeId(), text: s }
        : { id: s.id ?? makeId(), text: s.text ?? "" },
    ),
  }));
}

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 150));

        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;

        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!cancelled) {
            setRecipes(ensureIds(parsed));
          }
          return;
        }

        const starterRecipes = ensureIds(seedRecipes);

        let apiRecipes = [];
        try {
          apiRecipes = ensureIds(await fetchCoffeeCocktails());
        } catch {
          apiRecipes = [];
        }

        const combinedRecipes = [...starterRecipes, ...apiRecipes];

        if (!cancelled) {
          setRecipes(combinedRecipes);
          if (apiRecipes.length === 0) {
            setError(
              "Could not load cocktail recipes. Showing starter recipes instead.",
            );
          }
        }
      } catch {
        if (!cancelled) {
          setRecipes(ensureIds(seedRecipes));
          setError("Could not load recipes. Showing starter recipes instead.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch {
      // keep UI running even if localStorage fails
    }
  }, [recipes, loading]);

  const addRecipe = useCallback((newRecipe) => {
    setRecipes((prev) => [ensureIds([newRecipe])[0], ...prev]);
  }, []);

  const updateRecipe = useCallback((updated) => {
    const normalized = ensureIds([updated])[0];
    setRecipes((prev) =>
      prev.map((r) => (r.id === normalized.id ? normalized : r)),
    );
  }, []);

  const deleteRecipe = useCallback((id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { recipes, loading, error, addRecipe, updateRecipe, deleteRecipe };
}
