import { useCallback, useEffect, useState } from "react";
import { seedRecipes } from "../data/seedRecipes";

const STORAGE_KEY = "brewbook.recipes";

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
        // simulate async (also meets “async communication” pattern)
        await new Promise((resolve) => setTimeout(resolve, 150));

        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;

        if (!cancelled) {
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecipes(parsed);
          } else {
            setRecipes(seedRecipes);
          }
        }
      } catch {
        // ignore the error but keep UI responsive
        if (!cancelled) setError("Could not load recipes. Please refresh.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    // cleanup as appropriate ✅
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
    setRecipes((prev) => [newRecipe, ...prev]);
  }, []);

  const updateRecipe = useCallback((updated) => {
    setRecipes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }, []);

  const deleteRecipe = useCallback((id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { recipes, loading, error, addRecipe, updateRecipe, deleteRecipe };
}
