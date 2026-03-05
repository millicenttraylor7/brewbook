export default function Card({ title, children }) {
  return (
    <article className="panel">
      {title ? <h2>{title}</h2> : null}
      {children}
    </article>
  );
}
