import React, { useState } from "react";
import axios from "axios";
import { DocumentMeta } from "../types";
import "./WhatIfTab.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Props {
  doc: DocumentMeta;
}

const WhatIfTab: React.FC<Props> = ({ doc }) => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{ hypothetical: string; analysis: string }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addHypothetical = () => {
    if (!input.trim()) return;
    setInputs((prev) => [...prev, input.trim()]);
    setInput("");
  };

  const removeHypothetical = (idx: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== idx));
  };

  const runWhatIf = async () => {
    if (inputs.length === 0) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await axios.post(`${API_BASE}/whatif`, {
        document_id: doc.document_id,
        hypotheticals: inputs,
      });
      setResults(res.data.results);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to run what-if analysis");
    }
    setLoading(false);
  };

  return (
    <div className="whatif-tab">
      <div className="whatif-inputs">
        <input
          type="text"
          placeholder='Enter a hypothetical scenario, e.g. "Increase penalty to $10,000"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHypothetical()}
        />
        <button onClick={addHypothetical} disabled={!input.trim()}>Add</button>
      </div>
      <div className="whatif-hypotheticals">
        {inputs.map((h, i) => (
          <span className="hypo-chip" key={i}>
            {h}
            <button onClick={() => removeHypothetical(i)} aria-label="Remove">×</button>
          </span>
        ))}
      </div>
      <button
        className="run-btn"
        onClick={runWhatIf}
        disabled={inputs.length === 0 || loading}
      >
        Run Analysis
      </button>
      <div className="whatif-results">
        {loading && <span className="loading">Analyzing...</span>}
        {results && results.length > 0 && (
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                <strong>{r.hypothetical}:</strong>
                <pre>{r.analysis}</pre>
              </li>
            ))}
          </ul>
        )}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default WhatIfTab;
