import { useRecipes } from "../features/recipes/hooks/useRecipes";

export default function HomePage() {
  const { recipes, loading, error } = useRecipes();

  if (loading) {
    return <p>Loading recipes…</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes yet. Add one!</p>;
  }

  return (
    <section>
      <h1>BrewBook</h1>
      <p>Pick a recipe to get started.</p>

      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong> — {r.method} • {r.timeMinutes} min
          </li>
        ))}
      </ul>
    </section>
  );
}
