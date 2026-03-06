import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../features/recipes/hooks/useRecipes";
import Card from "../shared/components/Card";
import PageHeader from "../shared/components/PageHeader";

function formatIngredient(ing) {
  const amount = ing.amount ?? "";
  const unit = ing.unit ?? "";
  const item = ing.item ?? "";

  const parts = [];
  if (amount) parts.push(amount);
  if (unit) parts.push(unit);

  const qty = parts.join(" ");
  return qty ? `${qty} ${item}` : item;
}

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, loading, error, deleteRecipe } = useRecipes();
  const [isDeleting, setIsDeleting] = useState(false);

  const recipe = useMemo(() => recipes.find((r) => r.id === id), [recipes, id]);

  if (loading) return <p>Loading recipe…</p>;
  if (error) return <p role="alert">{error}</p>;

  if (!recipe) {
    return (
      <section>
        <h1>Recipe not found</h1>
        <Link className="btn-link" to="/">
          Back to Home
        </Link>
      </section>
    );
  }

  async function handleDelete() {
    const ok = window.confirm(
      `Delete "${recipe.name}"? This cannot be undone.`,
    );
    if (!ok) return;

    setIsDeleting(true);
    try {
      deleteRecipe(recipe.id);
      navigate("/");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section>
      <PageHeader
        title={recipe.name}
        subtitle={`${recipe.method} • ${recipe.timeMinutes} minutes • Serves ${recipe.servings}`}
        actions={
          <>
            <Link className="btn-link" to={`/recipes/${recipe.id}/edit`}>
              Edit
            </Link>

            <button
              type="button"
              className="btn-danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>

            <Link className="btn-link" to="/">
              Home
            </Link>
          </>
        }
      />

      <div className="detail-grid">
        <Card title="Ingredients">
          {recipe.ingredients?.length ? (
            <ul className="list">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id}>{formatIngredient(ing)}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">No ingredients listed.</p>
          )}
        </Card>

        <Card title="Steps">
          {recipe.steps?.length ? (
            <ol className="list">
              {recipe.steps.map((step) => (
                <li key={step.id}>{step.text}</li>
              ))}
            </ol>
          ) : (
            <p className="muted">No steps listed.</p>
          )}
        </Card>
      </div>

      {recipe.notes ? (
        <Card title="Notes">
          <p>{recipe.notes}</p>
        </Card>
      ) : null}
    </section>
  );
}
