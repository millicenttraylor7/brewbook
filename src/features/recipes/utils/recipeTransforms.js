import { makeId } from "./id";

export function toIngredientRows(ingredients = []) {
  // Convert recipe.ingredients -> editable rows
  return ingredients.map((ing) => ({
    id: ing.id ?? makeId(),
    amount: ing.amount ?? "",
    unit: ing.unit ?? "",
    item: ing.item ?? "",
  }));
}

export function toStepRows(steps = []) {
  // steps can be strings or objects
  return steps.map((s) => {
    if (typeof s === "string") {
      return { id: makeId(), text: s };
    }
    return { id: s.id ?? makeId(), text: s.text ?? "" };
  });
}

export function toIngredients(rows) {
  return rows
    .map((r) => ({
      id: r.id,
      amount: r.amount,
      unit: r.unit,
      item: r.item.trim(),
    }))
    .filter((r) => r.item.length > 0);
}

export function toSteps(rows) {
  return rows
    .map((r) => ({ id: r.id, text: r.text.trim() }))
    .filter((r) => r.text.length > 0);
}
