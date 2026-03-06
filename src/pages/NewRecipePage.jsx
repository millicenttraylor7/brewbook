import { useNavigate } from "react-router-dom";
import RecipeForm from "../features/recipes/components/RecipeForm";
import { useRecipes } from "../features/recipes/hooks/useRecipes";
import { makeId } from "../features/recipes/utils/id";
import {
  toIngredients,
  toSteps,
} from "../features/recipes/utils/recipeTransforms";
import Card from "../shared/components/Card";
import PageHeader from "../shared/components/PageHeader";

function toRecipe(formValues) {
  return {
    id: makeId(),
    name: formValues.name.trim(),
    method: formValues.method,
    timeMinutes: formValues.timeMinutes,
    servings: formValues.servings,
    ingredients: toIngredients(formValues.ingredientRows),
    steps: toSteps(formValues.stepRows),
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
      <PageHeader
        title="Add Recipe"
        subtitle="Create a new coffee recipe"
        actions={
          <button
            type="button"
            className="btn-link"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        }
      />

      <Card>
        <RecipeForm
          submitLabel="Create recipe"
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </Card>
    </section>
  );
}
