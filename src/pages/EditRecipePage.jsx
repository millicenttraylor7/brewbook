import { useParams } from "react-router-dom";

export default function EditRecipePage() {
  const { id } = useParams();

  return (
    <section>
      <h1>Edit Recipe</h1>
      <p>Editing recipe ID: {id}</p>
    </section>
  );
}
