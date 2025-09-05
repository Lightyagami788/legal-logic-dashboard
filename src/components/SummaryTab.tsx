import React, { useState } from "react";
import axios from "axios";
import { DocumentMeta } from "../types";
import "./SummaryTab.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Props {
  doc: DocumentMeta;
}

const SummaryTab: React.FC<Props> = ({ doc }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [mode, setMode] = useState<"extractive" | "abstractive">("extractive");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const res = await axios.post(`${API_BASE}/summarize`, {
        document_id: doc.document_id,
        mode,
      });
      setSummary(res.data.summary);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to summarize");
    }
    setLoading(false);
  };

  return (
    <div className="summary-tab">
      <div className="summary-controls">
        <label>
          <span>Mode:</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "extractive" | "abstractive")}
          >
            <option value="extractive">Extractive</option>
            <option value="abstractive">Abstractive (LLM)</option>
          </select>
        </label>
        <button onClick={fetchSummary} disabled={loading}>
          Summarize
        </button>
      </div>
      <div className="summary-result">
        {loading && <span className="loading">Summarizing...</span>}
        {summary && (
          <pre className="summary-text">{summary}</pre>
        )}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default SummaryTab;
