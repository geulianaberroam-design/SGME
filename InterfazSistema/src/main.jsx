// Importa React para utilizar sus funcionalidades
import React from "react";

// Importa ReactDOM para renderizar la aplicación en el navegador
import ReactDOM from "react-dom/client";

// Importa el componente principal de la aplicación
import App from "./App";

// Importa los estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Importa los iconos de Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";

// Importa los estilos personalizados del proyecto
import "./index.css";

// Busca el elemento con id="root" del archivo index.html
// y renderiza la aplicación React dentro de él.
ReactDOM.createRoot(document.getElementById("root")).render(

  // StrictMode ayuda a detectar posibles problemas durante el desarrollo.
  // Solo afecta al modo de desarrollo y no a la versión de producción.
  <React.StrictMode>

    {/* Componente principal de la aplicación */}
    <App />

  </React.StrictMode>

);