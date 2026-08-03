// Importa el hook useState
import { useState } from "react";

// Importa los componentes
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {

  // Estado que controla si el sidebar está colapsado
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-container d-flex">

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Dashboard */}
      <Dashboard
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

    </div>
  );
}

export default App;