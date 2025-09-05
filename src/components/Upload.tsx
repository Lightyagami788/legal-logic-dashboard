import React, { useRef, useState } from "react";
import axios from "axios";
import { DocumentMeta } from "../types";
import "./Upload.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface Props {
  onUpload: (meta: DocumentMeta) => void;
}

const Upload: React.FC<Props> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_BASE}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpload(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Upload failed");
    }
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="upload-box">
      <h3>Upload Document</h3>
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        ref={inputRef}
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <div className="upload-status">Uploading...</div>}
      {error && <div className="upload-error">{error}</div>}
      <div className="upload-info">
        <span>PDF, DOCX, TXT (max ~5MB)</span>
      </div>
    </div>
  );
};

export default Upload;
