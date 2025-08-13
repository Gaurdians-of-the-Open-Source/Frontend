import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Project from './pages/project/Project';

// 임시 페이지
function About() {
  return <div style={{ padding: "2rem" }}><h1>About Page (Coming Soon)</h1></div>;
}

function How() {
  return <div style={{ padding: "2rem" }}><h1>How It Works Page (Coming Soon)</h1></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/how" element={<How />} />
      </Routes>
    </Router>
  );
}

export default App; 




