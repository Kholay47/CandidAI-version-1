import { useState } from "react";
import Sidebar from "./components/Sidebar";
import UploadPanel from "./components/UploadPanel";
import Dashboard from "./components/Dashboard";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          CandidAI Recruiter Dashboard
        </h1>

        <UploadPanel setResults={setResults} />

        <Dashboard results={results} />
      </div>
    </div>
  );
}

export default App;