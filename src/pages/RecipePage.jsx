import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../features/recipes/hooks/useRecipes";

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

function getStepText(step) {
  if (typeof step === "string") return step;
  return step?.text ?? "";
}

function getStepKey(step, fallbackKey) {
  if (typeof step === "string") return fallbackKey;
  return step?.id ?? fallbackKey;
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
      <div className="page-header">
        <div>
          <h1>{recipe.name}</h1>
          <p className="muted">
            {recipe.method} • {recipe.timeMinutes} minutes • Serves{" "}
            {recipe.servings}
          </p>
        </div>

        <div className="page-actions">
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
        </div>
      </div>

      <div className="detail-grid">
        <article className="panel">
          <h2>Ingredients</h2>
          {recipe.ingredients?.length ? (
            <ul className="list">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id}>{formatIngredient(ing)}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">No ingredients listed.</p>
          )}
        </article>

        <article className="panel">
          <h2>Steps</h2>
          {recipe.steps?.length ? (
            <ol className="list">
              {recipe.steps.map((step) => (
                <li key={getStepKey(step, `${recipe.id}-${getStepText(step)}`)}>
                  {getStepText(step)}
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted">No steps listed.</p>
          )}
        </article>
      </div>

      {recipe.notes ? (
        <article className="panel" style={{ marginTop: 16 }}>
          <h2>Notes</h2>
          <p>{recipe.notes}</p>
        </article>
      ) : null}
    </section>
  );
}
