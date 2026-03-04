import RecipeCard from "../features/recipes/components/RecipeCard";
import { useRecipes } from "../features/recipes/hooks/useRecipes";

export default function HomePage() {
  const { recipes, loading, error } = useRecipes();

  // Loading state
  if (loading) {
    return <p>Loading recipes…</p>;
  }

  // Error state
  if (error) {
    return <p role="alert">{error}</p>;
  }

  // Empty state
  if (recipes.length === 0) {
    return <p>No recipes yet. Add one!</p>;
  }

  return (
    <section>
      <h1>BrewBook</h1>
      <p>Pick a recipe to get started.</p>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
