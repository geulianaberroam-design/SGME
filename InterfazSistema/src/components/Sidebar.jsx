// El componente recibe la propiedad collapsed desde App.jsx
function Sidebar({ collapsed }) {

  return (

    // Si collapsed es true, agrega la clase "collapsed"
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>

      {/* Logo del sistema */}
      <div className="logo">

        {/* Solo se muestra cuando el menú está expandido */}
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
        <li className="active">
          <i className="bi bi-grid"></i>
          {!collapsed && <span>Inicio</span>}
        </li>

        {/* Estudiantes */}
        <li>
          <i className="bi bi-person"></i>
          {!collapsed && <span>Estudiantes</span>}
        </li>

        {/* Apoderados */}
        <li>
          <i className="bi bi-people"></i>
          {!collapsed && <span>Apoderados</span>}
        </li>

        {/* Matrículas */}
        <li>
          <i className="bi bi-journal"></i>
          {!collapsed && <span>Matrículas</span>}
        </li>

        {/* Grados */}
        <li>
          <i className="bi bi-building"></i>
          {!collapsed && <span>Grados</span>}
        </li>

        {/* Pagos */}
        <li>
          <i className="bi bi-credit-card"></i>
          {!collapsed && <span>Pagos</span>}
        </li>

        {/* Documentos */}
        <li>
          <i className="bi bi-folder"></i>
          {!collapsed && <span>Documentos</span>}
        </li>

      </ul>

      {/* Botón cerrar sesión */}
      {!collapsed && (
        <button className="logout">
          Cerrar sesión
        </button>
      )}

    </div>

  );

}

export default Sidebar;