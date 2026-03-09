import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const { id, name, method, timeMinutes, servings, image } = recipe;

  return (
    <article className="recipe-card">
      {image ? (
        <img
          src={image}
          alt={name}
          className="recipe-card__image"
          loading="lazy"
        />
      ) : null}

      <header className="recipe-card__header">
        <h2 className="recipe-card__title">{name}</h2>
        <span className="recipe-card__tag">{method}</span>
      </header>

      <p className="recipe-card__meta">
        {timeMinutes} min • Serves {servings}
      </p>

      <div className="recipe-card__actions">
        <Link className="recipe-card__link" to={`/recipes/${id}`}>
          View recipe
        </Link>
        <Link className="recipe-card__link" to={`/recipes/${id}/edit`}>
          Edit
        </Link>
      </div>
    </article>
  );
}
