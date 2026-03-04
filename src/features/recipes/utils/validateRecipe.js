export function validateRecipe(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Recipe name is required.";
  }

  if (!values.method.trim()) {
    errors.method = "Method is required.";
  }

  if (!Number.isFinite(values.timeMinutes) || values.timeMinutes <= 0) {
    errors.timeMinutes = "Time must be a number greater than 0.";
  }

  if (!Number.isFinite(values.servings) || values.servings <= 0) {
    errors.servings = "Servings must be a number greater than 0.";
  }

  return errors;
}
