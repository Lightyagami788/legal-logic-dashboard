import React, { useState, useEffect } from "react";
import Upload from "./Upload";
import DocumentList from "./DocumentList";
import DocumentViewer from "./DocumentViewer";
import SummaryTab from "./SummaryTab";
import WhatIfTab from "./WhatIfTab";
import ClausesTab from "./ClausesTab";
import { DocumentMeta } from "../types";
import "./Dashboard.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

type TabName = "summary" | "whatif" | "clauses";

const Dashboard: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentMeta[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentMeta | null>(null);
  const [tab, setTab] = useState<TabName>("summary");
  const [refreshFlag, setRefreshFlag] = useState(0);

  // Fetch documents list (from backend's in-memory store; for demo, refetch on upload)
  useEffect(() => {
    // There's no endpoint for getting all docs; simulate by storing in localstorage for demo
    // In production, backend should have /documents/all or similar
    const stored = localStorage.getItem("uploadedDocs");
    if (stored) {
      setDocuments(JSON.parse(stored));
    }
  }, [refreshFlag]);

  // Whenever documents change, update localStorage (simulate persistent doc list)
  useEffect(() => {
    localStorage.setItem("uploadedDocs", JSON.stringify(documents));
  }, [documents]);

  const handleUpload = (doc: DocumentMeta) => {
    setDocuments((prev) => [doc, ...prev]);
    setSelectedDoc(doc);
    setRefreshFlag((f) => f + 1);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Upload onUpload={handleUpload} />
        <DocumentList
          documents={documents}
          selected={selectedDoc}
          onSelect={setSelectedDoc}
        />
      </aside>
      <main className="main-content">
        <div className="tabs">
          <button
            className={tab === "summary" ? "active" : ""}
            onClick={() => setTab("summary")}
          >
            Summary
          </button>
          <button
            className={tab === "whatif" ? "active" : ""}
            onClick={() => setTab("whatif")}
            disabled={!selectedDoc}
          >
            What-If
          </button>
          <button
            className={tab === "clauses" ? "active" : ""}
            onClick={() => setTab("clauses")}
            disabled={!selectedDoc}
          >
            Clauses
          </button>
        </div>
        <div className="tab-content">
          {!selectedDoc ? (
            <div className="empty-state">
              <h2>Select or upload a document</h2>
            </div>
          ) : tab === "summary" ? (
            <SummaryTab doc={selectedDoc} />
          ) : tab === "whatif" ? (
            <WhatIfTab doc={selectedDoc} />
          ) : (
            <ClausesTab doc={selectedDoc} />
          )}
        </div>
        <DocumentViewer doc={selectedDoc} />
      </main>
    </div>
  );
};

export default Dashboard;
