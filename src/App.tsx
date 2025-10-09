import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Frontend</h1>
        <p className="app-subtitle">
          Understand your legal documents, instantly.
        </p>
      </header>
      <main className="main-content">
        <section className="upload-card">
          <h2 className="upload-title">1. Upload Document</h2>
          <p className="upload-desc">
            Upload a .txt, .pdf, or .docx file (max 5MB).
          </p>
          <div className="upload-dropzone">
            <div className="dropzone-content">
              {/* Folder Icon SVG */}
              <svg
                className="folder-icon"
                width="56"
                height="56"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="64" height="64" rx="12" fill="#333" />
                <path
                  d="M20 24C20 22.8954 20.8954 22 22 22H30L32 26H42C43.1046 26 44 26.8954 44 28V40C44 41.1046 43.1046 42 42 42H22C20.8954 42 20 41.1046 20 40V24Z"
                  fill="#b3b3b3"
                />
                <rect x="22" y="28" width="20" height="12" rx="2" fill="#C7C7C7" />
              </svg>
              <span className="browse-text">
                <b>Click to browse</b> or drag and drop
              </span>
            </div>
          </div>
          <button className="analyze-btn" disabled>
            Analyze
          </button>
        </section>
      </main>
      <footer className="app-footer">
        Frontend AI Document Analyzer
      </footer>
    </div>
  );
}

export default App;
