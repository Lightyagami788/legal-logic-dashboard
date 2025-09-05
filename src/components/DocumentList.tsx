import React from "react";
import { DocumentMeta } from "../types";
import "./DocumentList.css";

interface Props {
  documents: DocumentMeta[];
  selected: DocumentMeta | null;
  onSelect: (doc: DocumentMeta) => void;
}

const DocumentList: React.FC<Props> = ({ documents, selected, onSelect }) => {
  return (
    <div className="doc-list-box">
      <h3>Documents</h3>
      {documents.length === 0 ? (
        <div className="empty-doc-list">No documents uploaded</div>
      ) : (
        <ul className="doc-list">
          {documents.map((doc) => (
            <li
              key={doc.document_id}
              className={selected?.document_id === doc.document_id ? "selected" : ""}
              onClick={() => onSelect(doc)}
              title={doc.filename}
            >
              <span className="doc-filename">{doc.filename}</span>
              <span className="doc-size">{Math.round(doc.num_chars / 1024)} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
