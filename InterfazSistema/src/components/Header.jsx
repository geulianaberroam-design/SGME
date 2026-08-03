// El componente Header recibe dos propiedades:
// collapsed: indica si el menú está contraído.
// setCollapsed: permite cambiar el estado del menú.
function Header({ collapsed, setCollapsed }) {

  return (

    // Contenedor principal del encabezado
    <div className="header">

      {/* Agrupa el botón del menú y la información del sistema */}
      <div className="d-flex align-items-center">

        {/* Botón que permite mostrar u ocultar el menú lateral */}
        <button
          className="menu-btn"
          onClick={() => setCollapsed(!collapsed)}
        >

          {/* Icono del menú */}
          <i className="bi bi-list fs-3"></i>

        </button>

        {/* Información del sistema */}
        <div className="ms-3">

          {/* Título del sistema */}
          <h4>
            Sistema de Gestión de Matrícula Escolar
          </h4>
          
          <small>
            Año Escolar 2025 · Colegio San Martín de Porres
          </small>

        </div>

      </div>

      {/* Fecha actual */}
      <div className="fecha">
        Domingo, 2 de agosto de 2026
      </div>

    </div>

  );

}

export default Header;