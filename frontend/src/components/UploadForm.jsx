import { useState } from "react";
import { processResumes } from "../api";

const UploadForm = ({ setResults }) => {
  const [files, setFiles] = useState([]);
  const [jd, setJd] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!files.length || !jd) {
      alert("Please upload files and enter job description");
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
    <div style={{ padding: "20px" }}>
      <h2>Upload Resumes</h2>

      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />

      <textarea
        placeholder="Paste Job Description"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={5}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        {loading ? "Processing..." : "Process Resumes"}
      </button>
    </div>
  );
};

export default UploadForm;