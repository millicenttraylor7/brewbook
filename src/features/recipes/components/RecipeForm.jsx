import { useMemo, useState } from "react";
import { validateRecipe } from "../utils/validateRecipe";

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
    ingredientsText: initialValues?.ingredientsText ?? "",
    stepsText: initialValues?.stepsText ?? "",
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
        {touched.method && errors.method ? (
          <p className="form-error" role="alert">
            {errors.method}
          </p>
        ) : null}
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
        <label htmlFor="ingredientsText">Ingredients (one per line)</label>
        <textarea
          id="ingredientsText"
          name="ingredientsText"
          value={values.ingredientsText}
          onChange={handleChange}
          placeholder={"Espresso - 2 shots\nMilk - 8 oz\nIce - 1 cup"}
          rows={5}
        />
      </div>

      <div className="form-row">
        <label htmlFor="stepsText">Steps (one per line)</label>
        <textarea
          id="stepsText"
          name="stepsText"
          value={values.stepsText}
          onChange={handleChange}
          placeholder={
            "Pull espresso shots\nAdd ice to glass\nPour milk and espresso"
          }
          rows={5}
        />
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
