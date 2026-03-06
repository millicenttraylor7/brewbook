import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../features/recipes/components/RecipeForm";
import { useRecipes } from "../features/recipes/hooks/useRecipes";
import {
  toIngredients,
  toSteps,
} from "../features/recipes/utils/recipeTransforms";
import Card from "../shared/components/Card";
import PageHeader from "../shared/components/PageHeader";

function toFormInitialValues(recipe) {
  return {
    name: recipe.name ?? "",
    method: recipe.method ?? "espresso",
    timeMinutes: recipe.timeMinutes ?? 5,
    servings: recipe.servings ?? 1,
    notes: recipe.notes ?? "",
    ingredients: recipe.ingredients ?? [],
    steps: recipe.steps ?? [],
  };
}

function toUpdatedRecipe(recipe, formValues) {
  return {
    ...recipe,
    name: formValues.name.trim(),
    method: formValues.method,
    timeMinutes: formValues.timeMinutes,
    servings: formValues.servings,
    notes: formValues.notes.trim(),
    ingredients: toIngredients(formValues.ingredientRows),
    steps: toSteps(formValues.stepRows),
  };
}

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, loading, error, updateRecipe } = useRecipes();

  const recipe = useMemo(() => recipes.find((r) => r.id === id), [recipes, id]);

  if (loading) return <p>Loading recipe…</p>;
  if (error) return <p role="alert">{error}</p>;

  if (!recipe) {
    return (
      <section>
        <PageHeader
          title="Recipe not found"
          actions={
            <Link className="btn-link" to="/">
              Back to Home
            </Link>
          }
        />
      </section>
    );
  }

  async function handleSubmit(values) {
    const updated = toUpdatedRecipe(recipe, values);
    updateRecipe(updated);
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <section>
      <PageHeader
        title="Edit Recipe"
        subtitle={`Update ${recipe.name}`}
        actions={
          <Link className="btn-link" to={`/recipes/${recipe.id}`}>
            Back to Recipe
          </Link>
        }
      />

      <Card>
        <RecipeForm
          initialValues={toFormInitialValues(recipe)}
          submitLabel="Save changes"
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/recipes/${recipe.id}`)}
        />
      </Card>
    </section>
  );
}
