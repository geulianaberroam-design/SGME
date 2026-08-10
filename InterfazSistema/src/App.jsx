import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes"; // 1. IMPORTA EL COMPONENTE AQUÍ

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
            
            {/* 2. REEMPLAZA EL H1 POR EL COMPONENTE <Estudiantes /> */}
            <Route path="/estudiantes" element={<Estudiantes />} />

            <Route path="/apoderados" element={<div className="p-4"><h1>Gestión de Apoderados</h1></div>} />
            <Route path="/matriculas" element={<div className="p-4"><h1>Gestión de Matrículas</h1></div>} />
            <Route path="/grados" element={<div className="p-4"><h1>Grados y Secciones</h1></div>} />
            <Route path="/pagos" element={<div className="p-4"><h1>Gestión de Pagos</h1></div>} />
            <Route path="/documentos" element={<div className="p-4"><h1>Documentos</h1></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;