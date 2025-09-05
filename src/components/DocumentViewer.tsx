import React, { useEffect, useState } from "react";
import axios from "axios";
import { DocumentMeta } from "../types";
import "./DocumentViewer.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Props {
  doc: DocumentMeta | null;
}

const DocumentViewer: React.FC<Props> = ({ doc }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doc) {
      setContent(null);
      return;
    }
    setLoading(true);
    axios
      .get(`${API_BASE}/documents/${doc.document_id}`)
      .then((res) => {
        setContent(res.data.text || "(no text)");
      })
      .catch(() => setContent("(error fetching document text)"))
      .finally(() => setLoading(false));
  }, [doc]);

  if (!doc) return null;

  return (
    <div className="doc-viewer">
      <div className="doc-viewer-header">
        <span>
          <strong>{doc.filename}</strong> ({doc.content_type})
        </span>
        <span>{Math.round(doc.num_chars / 1024)} KB</span>
      </div>
      <div className="doc-content">
        {loading
          ? "Loading document…"
          : <pre>{content}</pre>
        }
      </div>
    </div>
  );
};

export default DocumentViewer;
