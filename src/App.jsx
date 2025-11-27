import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./App.css";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="brand">BrandName</div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Detail />} />
      </Routes>

      <footer className="footer">© 2025 Clothing Brand</footer>
    </>
  );
}
