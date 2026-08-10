import React from 'react';

// El componente Header recibe dos propiedades:
// collapsed: indica si el menú está contraído.
// setCollapsed: permite cambiar el estado del menú.
function Header({ collapsed, setCollapsed }) {
  return (
    // Contenedor principal del encabezado con Bootstrap flexbox
    <header className="header d-flex justify-content-between align-items-center mb-4">
      
      {/* 1. SECCIÓN IZQUIERDA: Botón hamburguesa + Títulos */}
      <div className="d-flex align-items-center">
        {/* Botón que colapsa/expande el menú lateral */}
        <button
          className="menu-btn me-3 p-0 border-0 bg-transparent"
          onClick={() => setCollapsed(!collapsed)}
          title="Alternar menú"
        >
          <i className="bi bi-list fs-2"></i>
        </button>

        {/* Información del sistema */}
        <div>
          <h4 className="m-0 fw-bold fs-5 text-dark">
            Sistema de Gestión de Matrícula Escolar
          </h4>
          <small className="text-muted">
            Año Escolar 2025 · Colegio San Martín de Porres
          </small>
        </div>
      </div>

      {/* 2. SECCIÓN DERECHA: Fecha, Notificaciones y Perfil de Usuario */}
      <div className="d-flex align-items-center gap-3">
        
        {/* Badge de fecha */}
        <div className="bg-light px-3 py-2 rounded-3 text-secondary border d-flex align-items-center gap-2 small">
          <i className="bi bi-calendar3"></i>
          <span>Domingo, 9 de agosto de 2026</span>
        </div>

        {/* Ícono de notificaciones con punto rojo */}
        <div className="position-relative cursor-pointer p-2 fs-5 text-secondary">
          <i className="bi bi-bell"></i>
          <span className="position-absolute top-1 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">Notificaciones no leídas</span>
          </span>
        </div>

        {/* Perfil del Usuario */}
        <div className="d-flex align-items-center ms-2">
          {/* Avatar con iniciales */}
          <div 
            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold me-2 position-relative"
            style={{ width: '40px', height: '40px', backgroundColor: '#1d3b8f' }}
          >
            MA
            {/* Indicador de estado en línea (punto verde) */}
            <span 
              className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle"
              style={{ width: '10px', height: '10px' }}
            ></span>
          </div>

          {/* Nombre y Cargo */}
          <div className="d-none d-md-block text-start me-2">
            <div className="fw-bold fs-6 lh-1 text-dark">María Alvarado</div>
            <small className="text-muted small">Secretaría</small>
          </div>

          {/* Flecha desplegable */}
          <i className="bi bi-chevron-down small text-muted"></i>
        </div>

      </div>

    </header>
  );
}

export default Header;