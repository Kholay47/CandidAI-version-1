const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-5">
      <h2 className="text-xl font-bold text-blue-600 mb-6">
        CandidAI
      </h2>

      <ul className="space-y-3">
        <li className="text-gray-700 font-medium">Dashboard</li>
        <li className="text-gray-500">Candidates</li>
        <li className="text-gray-500">Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;