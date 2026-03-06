import { useMemo, useState } from "react";
import RecipeCard from "../features/recipes/components/RecipeCard";
import { useRecipes } from "../features/recipes/hooks/useRecipes";
import Card from "../shared/components/Card";

export default function HomePage() {
  const { recipes, loading, error } = useRecipes();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;

    return recipes.filter((r) => {
      const name = (r.name ?? "").toLowerCase();
      const method = (r.method ?? "").toLowerCase();
      return name.includes(q) || method.includes(q);
    });
  }, [recipes, query]);

  if (loading) return <p>Loading recipes…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h1>BrewBook</h1>
      <p>Search and manage your favorite coffee recipes.</p>

      <div className="search-row">
        <label className="sr-only" htmlFor="recipe-search">
          Search recipes
        </label>
        <input
          id="recipe-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or method (e.g., latte, cold-brew)"
        />
        {query ? (
          <button
            type="button"
            className="secondary"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        ) : null}
      </div>

      <Card title="All Recipes">
        {filtered.length === 0 ? (
          <p className="muted">No recipes match “{query.trim()}”.</p>
        ) : (
          <div className="recipe-grid">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}
