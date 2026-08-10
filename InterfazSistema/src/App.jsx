import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>

      <div className="app">

        <Sidebar collapsed={collapsed} />

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
            }
          />

          <Route
            path="/estudiantes"
            element={<h1>Estudiantes</h1>}
          />

          <Route
            path="/apoderados"
            element={<h1>Apoderados</h1>}
          />

          <Route
            path="/matriculas"
            element={<h1>Matrículas</h1>}
          />

          <Route
            path="/grados"
            element={<h1>Grados</h1>}
          />

          <Route
            path="/pagos"
            element={<h1>Pagos</h1>}
          />

          <Route
            path="/documentos"
            element={<h1>Documentos</h1>}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;

