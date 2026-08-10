import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes";
import Apoderados from "./pages/Apoderados";
import Matriculas from "./pages/Matriculas";
import Grados from "./pages/Grados";
import Pagos from "./pages/Pagos";
import Documentos from "./pages/Documentos";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar collapsed={collapsed} />

        <div className="content">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/apoderados" element={<Apoderados />} />
            <Route path="/matriculas" element={<Matriculas />} />
            <Route path="/grados" element={<Grados />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/documentos" element={<Documentos />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;