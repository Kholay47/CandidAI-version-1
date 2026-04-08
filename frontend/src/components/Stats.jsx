const Stats = ({ results }) => {
  if (!results.length) return null;

  const avg =
    results.reduce((acc, r) => acc + r.match_score, 0) /
    results.length;

  const top = results[0]?.match_score || 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <p>Total Candidates</p>
        <h2 className="text-xl font-bold">{results.length}</h2>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p>Average Score</p>
        <h2 className="text-xl font-bold">{avg.toFixed(1)}%</h2>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p>Top Score</p>
        <h2 className="text-xl font-bold text-green-600">
          {top}%
        </h2>
      </div>
    </div>
  );
};

export default Stats;