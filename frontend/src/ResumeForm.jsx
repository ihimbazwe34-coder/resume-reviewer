import { useState } from "react";

export default function ResumeForm() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("Analyzing...");

    try {
      const res = await fetch("http://localhost:3001/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
    } catch (err) {
      setFeedback("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">AI Resume Reviewer</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border p-2 rounded h-40"
          placeholder="Paste your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Review Resume
        </button>
      </form>
      {feedback && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">{feedback}</pre>
      )}
    </div>
  );
}
