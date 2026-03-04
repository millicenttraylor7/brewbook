import { useParams } from "react-router-dom";
import { useRecipes } from "../features/recipes/hooks/useRecipes";

export default function RecipePage() {
  const { id } = useParams();
  const { recipes, loading, error } = useRecipes();

  if (loading) return <p>Loading recipe…</p>;
  if (error) return <p>{error}</p>;

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <section>
      <h1>{recipe.name}</h1>

      <p>
        {recipe.method} • {recipe.timeMinutes} minutes • Serves{" "}
        {recipe.servings}
      </p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>
            {ing.amount} {ing.unit} {ing.item}
          </li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {recipe.notes && (
        <>
          <h3>Notes</h3>
          <p>{recipe.notes}</p>
        </>
      )}
    </section>
  );
}
