import { useState } from "react";
import { processResumes } from "../api";

const UploadPanel = ({ setResults }) => {
  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    if (!files.length || !jd) {
      alert("Upload resumes and add job description");
      return;
    }

    try {
      setLoading(true);
      const data = await processResumes(files, jd, skills);
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error processing resumes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>

      {/* File Upload */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-3"
      />

      {/* Selected Files Display */}
      <div className="mb-3 text-sm text-gray-600">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))
        ) : (
          <div>No files selected</div>
        )}
      </div>

      {/* Job Description */}
      <textarea
        placeholder="Job Description"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        rows={4}
      />

      {/* Skills */}
      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Analyze Candidates"}
      </button>
    </div>
  );
};

export default UploadPanel;