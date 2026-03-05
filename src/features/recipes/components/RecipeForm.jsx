import { useMemo, useState } from "react";
import { makeId } from "../utils/id";
import { validateRecipe } from "../utils/validateRecipe";
import { toIngredientRows, toStepRows } from "../utils/recipeTransforms";

const METHOD_OPTIONS = [
  { value: "espresso", label: "Espresso" },
  { value: "french-press", label: "French Press" },
  { value: "pour-over", label: "Pour Over" },
  { value: "cold-brew", label: "Cold Brew" },
  { value: "drip", label: "Drip" },
];

function normalizeInitialValues(initialValues) {
  return {
    name: initialValues?.name ?? "",
    method: initialValues?.method ?? "espresso",
    timeMinutes: initialValues?.timeMinutes ?? 5,
    servings: initialValues?.servings ?? 1,
    notes: initialValues?.notes ?? "",
    ingredientRows: toIngredientRows(
      initialValues?.ingredients ?? [
        { id: makeId(), amount: "", unit: "", item: "" },
      ],
    ),
    stepRows: toStepRows(initialValues?.steps ?? [{ id: makeId(), text: "" }]),
  };
}

export default function RecipeForm({
  initialValues,
  submitLabel = "Save",
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState(() =>
    normalizeInitialValues(initialValues),
  );
  const [touched, setTouched] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const errors = useMemo(() => validateRecipe(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function updateIngredient(id, field, nextValue) {
    setValues((prev) => ({
      ...prev,
      ingredientRows: prev.ingredientRows.map((row) =>
        row.id === id ? { ...row, [field]: nextValue } : row,
      ),
    }));
  }

  function addIngredientRow() {
    setValues((prev) => ({
      ...prev,
      ingredientRows: [
        ...prev.ingredientRows,
        { id: makeId(), amount: "", unit: "", item: "" },
      ],
    }));
  }

  function removeIngredientRow(id) {
    setValues((prev) => ({
      ...prev,
      ingredientRows: prev.ingredientRows.filter((row) => row.id !== id),
    }));
  }

  function updateStep(id, nextValue) {
    setValues((prev) => ({
      ...prev,
      stepRows: prev.stepRows.map((row) =>
        row.id === id ? { ...row, text: nextValue } : row,
      ),
    }));
  }

  function addStepRow() {
    setValues((prev) => ({
      ...prev,
      stepRows: [...prev.stepRows, { id: makeId(), text: "" }],
    }));
  }

  function removeStepRow(id) {
    setValues((prev) => ({
      ...prev,
      stepRows: prev.stepRows.filter((row) => row.id !== id),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, method: true, timeMinutes: true, servings: true });

    const nextErrors = validateRecipe(values);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">Recipe name</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Iced Latte"
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby={
            touched.name && errors.name ? "name-error" : undefined
          }
        />
        {touched.name && errors.name ? (
          <p className="form-error" id="name-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="form-row">
        <label htmlFor="method">Method</label>
        <select
          id="method"
          name="method"
          value={values.method}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {METHOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="timeMinutes">Time (minutes)</label>
          <input
            id="timeMinutes"
            name="timeMinutes"
            type="number"
            min="1"
            value={values.timeMinutes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.timeMinutes && errors.timeMinutes ? (
            <p className="form-error" role="alert">
              {errors.timeMinutes}
            </p>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="servings">Servings</label>
          <input
            id="servings"
            name="servings"
            type="number"
            min="1"
            value={values.servings}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.servings && errors.servings ? (
            <p className="form-error" role="alert">
              {errors.servings}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-row">
        <div className="row-header">
          <label>Ingredients</label>
          <button type="button" className="mini" onClick={addIngredientRow}>
            + Add ingredient
          </button>
        </div>

        <div className="stack">
          {values.ingredientRows.map((row) => (
            <div className="line-row" key={row.id}>
              <input
                className="line-row__amount"
                value={row.amount}
                onChange={(e) =>
                  updateIngredient(row.id, "amount", e.target.value)
                }
                placeholder="Amount"
              />
              <input
                className="line-row__unit"
                value={row.unit}
                onChange={(e) =>
                  updateIngredient(row.id, "unit", e.target.value)
                }
                placeholder="Unit"
              />
              <input
                className="line-row__item"
                value={row.item}
                onChange={(e) =>
                  updateIngredient(row.id, "item", e.target.value)
                }
                placeholder="Ingredient"
              />

              <button
                type="button"
                className="mini danger"
                onClick={() => removeIngredientRow(row.id)}
                aria-label="Remove ingredient"
                disabled={values.ingredientRows.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="row-header">
          <label>Steps</label>
          <button type="button" className="mini" onClick={addStepRow}>
            + Add step
          </button>
        </div>

        <div className="stack">
          {values.stepRows.map((row) => (
            <div className="line-row" key={row.id}>
              <input
                className="line-row__item"
                value={row.text}
                onChange={(e) => updateStep(row.id, e.target.value)}
                placeholder="Describe the step…"
              />

              <button
                type="button"
                className="mini danger"
                onClick={() => removeStepRow(row.id)}
                aria-label="Remove step"
                disabled={values.stepRows.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={values.notes}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSaving || hasErrors}>
          {isSaving ? "Saving…" : submitLabel}
        </button>

        <button
          type="button"
          className="secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
