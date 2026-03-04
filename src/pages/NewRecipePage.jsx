import { useNavigate } from "react-router-dom";
import RecipeForm from "../features/recipes/components/RecipeForm";
import { useRecipes } from "../features/recipes/hooks/useRecipes";
import { makeId } from "../features/recipes/utils/id";

function parseLines(text) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toRecipe(formValues) {
  const ingredients = parseLines(formValues.ingredientsText).map((line) => {
    // Keep it simple: store as a string item for now
    return { item: line, amount: "", unit: "" };
  });

  const steps = parseLines(formValues.stepsText);

  return {
    id: makeId(),
    name: formValues.name.trim(),
    method: formValues.method,
    timeMinutes: formValues.timeMinutes,
    servings: formValues.servings,
    ingredients,
    steps,
    notes: formValues.notes.trim(),
  };
}

export default function NewRecipePage() {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();

  async function handleSubmit(values) {
    const recipe = toRecipe(values);
    addRecipe(recipe);
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <section>
      <h1>Add Recipe</h1>
      <RecipeForm
        submitLabel="Create recipe"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </section>
  );
}
