/** Short framing text above a simulated coding challenge. */
export default function ProblemStatement({ title, description }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 style={{ marginBottom: 4 }}>{title}</h3>
      <p className="text-secondary" style={{ fontSize: 14 }}>{description}</p>
    </div>
  );
}
