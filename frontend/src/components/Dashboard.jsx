import Stats from "./Stats";
import CandidateCard from "./CandidateCard";

const Dashboard = ({ results }) => {
  if (!results.length) return null;

  return (
    <div>
      <Stats results={results} />

      <h2 className="text-xl font-semibold mb-3">
        Ranked Candidates
      </h2>

      {results.map((r, i) => (
        <CandidateCard key={i} candidate={r} />
      ))}
    </div>
  );
};

export default Dashboard;