import { Link } from "react-router-dom";

function Sidebar({ collapsed }) {

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>

      {/* Logo del sistema */}
      <div className="logo">

        {!collapsed && (
          <>
            <h4>SGME</h4>
            <small>Colegio San Martín</small>
          </>
        )}

      </div>

      {/* Menú de navegación */}
      <ul>

        {/* Inicio */}
        <li>
          <Link to="/">
            <i className="bi bi-grid"></i>
            {!collapsed && <span>Inicio</span>}
          </Link>
        </li>

        {/* Estudiantes */}
        <li>
          <Link to="/estudiantes">
            <i className="bi bi-person"></i>
            {!collapsed && <span>Estudiantes</span>}
          </Link>
        </li>

        {/* Apoderados */}
        <li>
          <Link to="/apoderados">
            <i className="bi bi-people"></i>
            {!collapsed && <span>Apoderados</span>}
          </Link>
        </li>

        {/* Matrículas */}
        <li>
          <Link to="/matriculas">
            <i className="bi bi-journal"></i>
            {!collapsed && <span>Matrículas</span>}
          </Link>
        </li>

        {/* Grados */}
        <li>
          <Link to="/grados">
            <i className="bi bi-building"></i>
            {!collapsed && <span>Grados</span>}
          </Link>
        </li>

        {/* Pagos */}
        <li>
          <Link to="/pagos">
            <i className="bi bi-credit-card"></i>
            {!collapsed && <span>Pagos</span>}
          </Link>
        </li>

        {/* Documentos */}
        <li>
          <Link to="/documentos">
            <i className="bi bi-folder"></i>
            {!collapsed && <span>Documentos</span>}
          </Link>
        </li>

      </ul>

      {/* Cerrar sesión */}
      {!collapsed && (
        <button className="logout">
          Cerrar sesión
        </button>
      )}

    </div>
  );
}

export default Sidebar;


