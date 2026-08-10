import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes";
import Apoderados from "./pages/Apoderados";
import Matriculas from "./pages/Matriculas";
import Grados from "./pages/Grados";

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

            {/* Vistas pendientes (puedes completarlas después) */}
            <Route path="/pagos" element={<div className="p-4"><h1>Gestión de Pagos</h1></div>} />
            <Route path="/documentos" element={<div className="p-4"><h1>Documentos</h1></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;