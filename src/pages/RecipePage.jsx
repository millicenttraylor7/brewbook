import { useParams } from "react-router-dom";

export default function RecipePage() {
  const { id } = useParams();

  return (
    <section>
      <h1>Recipe Details</h1>
      <p>Recipe ID: {id}</p>
    </section>
  );
}
