import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app-bg">
      <header className="app-header">
        <h1>Legal Logic Dashboard</h1>
      </header>
      <Dashboard />
      <footer className="app-footer">
        <span>© {new Date().getFullYear()} Legal Logic</span>
      </footer>
    </div>
  );
}

export default App;
