const Results = ({ results }) => {
  if (!results.length) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Results</h2>

      {results.map((r, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>
            🏆 Rank {r.rank} — {r.resume_name}
          </h3>

          <p><strong>Summary:</strong> {r.summary}</p>

          <p><strong>Match Score:</strong> {r.match_score}%</p>

          <p><strong>Skills Found:</strong> {r.skills_found.join(", ")}</p>

          <p><strong>Missing Skills:</strong> {r.missing_skills.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;