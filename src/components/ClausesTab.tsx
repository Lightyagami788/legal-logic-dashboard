import React, { useState } from "react";
import axios from "axios";
import { DocumentMeta } from "../types";
import "./ClausesTab.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Props {
  doc: DocumentMeta;
}

const ClausesTab: React.FC<Props> = ({ doc }) => {
  const [clauses, setClauses] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClauses = async () => {
    setLoading(true);
    setError(null);
    setClauses(null);
    try {
      const res = await axios.post(`${API_BASE}/clauses`, {
        document_id: doc.document_id,
      });
      setClauses(res.data.clauses);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to extract clauses");
    }
    setLoading(false);
  };

  return (
    <div className="clauses-tab">
      <button onClick={fetchClauses} disabled={loading}>
        Extract Clauses & Entities
      </button>
      <div className="clauses-result">
        {loading && <span className="loading">Extracting...</span>}
        {clauses && (
          <ul>
            {Object.entries(clauses).map(([k, v], i) => (
              <li key={i}>
                <strong>{k}:</strong>
                <pre>{v}</pre>
              </li>
            ))}
          </ul>
        )}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default ClausesTab;
