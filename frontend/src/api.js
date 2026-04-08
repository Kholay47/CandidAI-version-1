export const processResumes = async (files, jd, skills) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("resumes", file));
  formData.append("jd", jd);
  formData.append("jd_skills", skills);

  const res = await fetch("http://127.0.0.1:8000/process_resume/", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("API error");

  return res.json();
};