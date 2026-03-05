import { useCallback, useEffect, useState } from "react";
import { seedRecipes } from "../data/seedRecipes";
import { makeId } from "../utils/id";

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

  // useEffect #1: load from localStorage on startup (with a tiny async delay)
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 150));

        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;

        if (!cancelled) {
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecipes(ensureIds(parsed));
          } else {
            setRecipes(ensureIds(seedRecipes));
          }
        }
      } catch {
        if (!cancelled) setError("Could not load recipes. Please refresh.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // useEffect #2: persist to localStorage when recipes change
  useEffect(() => {
    if (loading) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch {
      // Keep UI running even if storage fails
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
