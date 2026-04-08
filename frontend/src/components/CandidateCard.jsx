const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border mb-4">
      <h3 className="font-bold text-lg">
        Rank {candidate.rank} — {candidate.resume_name}
      </h3>

      <p className="text-sm text-gray-600 mb-2">
        {candidate.summary}
      </p>

      <p>
        <strong>Score:</strong>{" "}
        <span className="text-green-600 font-bold">
          {candidate.match_score}%
        </span>
      </p>

      <p>
        <strong>Skills:</strong>{" "}
        {candidate.skills_found.join(", ")}
      </p>

      <p className="text-red-500">
        <strong>Missing:</strong>{" "}
        {candidate.missing_skills.join(", ")}
      </p>
    </div>
  );
};

export default CandidateCard;