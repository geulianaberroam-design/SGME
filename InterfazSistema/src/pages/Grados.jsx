import React, { useState } from 'react';

export default function Grados() {
  const [filtroGrado, setFiltroGrado] = useState('Todos');
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('');
  const [formData, setFormData] = useState({
    idSeccion: "GS-012",
    grado: "",
    seccion: ""
  });

  // Lista de grados y secciones extraída de las capturas de pantalla
  const [gradosList] = useState([
    { id: "GS-001", gradoNum: "1°", gradoTexto: "1° de Primaria", nivel: "Nivel Primaria", seccion: "A", color: "#2563eb", seccionColor: "#1d3b8f" },
    { id: "GS-002", gradoNum: "1°", gradoTexto: "1° de Primaria", nivel: "Nivel Primaria", seccion: "B", color: "#2563eb", seccionColor: "#7c3aed" },
    { id: "GS-003", gradoNum: "2°", gradoTexto: "2° de Primaria", nivel: "Nivel Primaria", seccion: "A", color: "#8b5cf6", seccionColor: "#1d3b8f" },
    { id: "GS-004", gradoNum: "2°", gradoTexto: "2° de Primaria", nivel: "Nivel Primaria", seccion: "B", color: "#8b5cf6", seccionColor: "#7c3aed" },
    { id: "GS-005", gradoNum: "3°", gradoTexto: "3° de Primaria", nivel: "Nivel Primaria", seccion: "A", color: "#06b6d4", seccionColor: "#1d3b8f" },
    { id: "GS-006", gradoNum: "3°", gradoTexto: "3° de Primaria", nivel: "Nivel Primaria", seccion: "B", color: "#06b6d4", seccionColor: "#7c3aed" },
    { id: "GS-007", gradoNum: "4°", gradoTexto: "4° de Primaria", nivel: "Nivel Primaria", seccion: "A", color: "#f59e0b", seccionColor: "#1d3b8f" },
    { id: "GS-008", gradoNum: "4°", gradoTexto: "4° de Primaria", nivel: "Nivel Primaria", seccion: "B", color: "#f59e0b", seccionColor: "#7c3aed" },
    { id: "GS-009", gradoNum: "5°", gradoTexto: "5° de Primaria", nivel: "Nivel Primaria", seccion: "A", color: "#10b981", seccionColor: "#1d3b8f" },
    { id: "GS-010", gradoNum: "6°", gradoTexto: "6° de Primaria", nivel: "Nivel Primaria", seccion: "A", color: "#ef4444", seccionColor: "#1d3b8f" },
    { id: "GS-011", gradoNum: "6°", gradoTexto: "6° de Primaria", nivel: "Nivel Primaria", seccion: "B", color: "#ef4444", seccionColor: "#7c3aed" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeleccionRapida = (sec) => {
    setSeccionSeleccionada(sec);
    setFormData({ ...formData, seccion: sec });
  };

  return (
    <div className="d-flex flex-column gap-4">
      
      {/* 1. ENCABEZADO DE PÁGINA */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', fontSize: '24px' }}
          >
            🏫
          </div>
          <div>
            <h3 className="fw-bold m-0" style={{ color: '#0f172a', fontSize: '22px' }}>
              Grados y Secciones
            </h3>
            <span className="text-muted small">Administración de aulas · Primaria · Año 2025</span>
          </div>
        </div>

        {/* Badge activo superior */}
        <div>
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            11 secciones activas
          </span>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="row g-3">
        {/* Total secciones */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#eff6ff', fontSize: '18px' }}>
                🏫
              </div>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1d3b8f' }}>11</h2>
              <small className="text-muted">Total secciones</small>
            </div>
          </div>
        </div>

        {/* Grados registrados */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#f3e8ff', fontSize: '18px' }}>
                📚
              </div>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#7c3aed' }}>6</h2>
              <small className="text-muted">Grados registrados</small>
            </div>
          </div>
        </div>

        {/* Sección más grande */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#dcfce7', fontSize: '18px' }}>
                📊
              </div>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#059669' }}>5</h2>
              <small className="text-muted">Sección más grande</small>
            </div>
          </div>
        </div>

        {/* Secciones A */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#fef3c7', fontSize: '18px', fontWeight: 'bold', color: '#d97706' }}>
                A
              </div>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#d97706' }}>6</h2>
              <small className="text-muted">Secciones A</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FORMULARIO DE GESTIÓN DE GRADOS Y SECCIONES */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Gestión de Grados y Secciones</h5>
          </div>
          <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#1d3b8f', fontSize: '14px' }}>
            Nuevo Registro
          </button>
        </div>

        <form>
          <div className="row g-3">
            {/* ID DE SECCIÓN */}
            <div className="col-12 col-md-4">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ID DE SECCIÓN
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0 text-muted">
                  <i className="bi bi-files"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0 fw-bold"
                  style={{ color: '#1d3b8f' }}
                  value={formData.idSeccion}
                  readOnly
                />
              </div>
            </div>

            {/* GRADO */}
            <div className="col-12 col-md-4">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                GRADO <span className="text-danger">*</span>
              </label>
              <select
                name="grado"
                className="form-select bg-light border-0 text-secondary"
                value={formData.grado}
                onChange={handleChange}
              >
                <option value="">— Seleccionar grado —</option>
                <option value="1°">1° de Primaria</option>
                <option value="2°">2° de Primaria</option>
                <option value="3°">3° de Primaria</option>
                <option value="4°">4° de Primaria</option>
                <option value="5°">5° de Primaria</option>
                <option value="6°">6° de Primaria</option>
              </select>
            </div>

            {/* SECCIÓN */}
            <div className="col-12 col-md-4">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                SECCIÓN <span className="text-danger">*</span>
              </label>
              <select
                name="seccion"
                className="form-select bg-light border-0 text-secondary"
                value={formData.seccion}
                onChange={handleChange}
              >
                <option value="">— Seleccionar sección —</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            {/* SELECCIÓN RÁPIDA DE SECCIÓN */}
            <div className="col-12 mt-3">
              <label className="form-label text-uppercase fw-bold text-muted mb-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                SELECCIÓN RÁPIDA DE SECCIÓN
              </label>
              <div className="row g-2">
                {['A', 'B', 'C', 'D'].map((sec) => {
                  const isSelected = seccionSeleccionada === sec;
                  return (
                    <div key={sec} className="col-6 col-sm-3">
                      <button
                        type="button"
                        onClick={() => handleSeleccionRapida(sec)}
                        className="btn w-100 py-3 fw-bold rounded-3"
                        style={{
                          backgroundColor: isSelected ? '#eff6ff' : '#f8fafc',
                          border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          color: isSelected ? '#1d3b8f' : '#64748b',
                          fontSize: '16px',
                          transition: 'all 0.2s'
                        }}
                      >
                        {sec}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTONERA DE ACCIONES */}
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <div className="d-flex gap-2 flex-wrap">
              <button type="button" className="btn px-3 py-2 rounded-3 fw-bold" style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontSize: '14px' }}>
                + Nuevo
              </button>
              <button type="button" className="btn px-4 py-2 rounded-3 fw-bold text-white" style={{ backgroundColor: '#10b981', border: 'none', fontSize: '14px' }}>
                <i className="bi bi-floppy me-2"></i>Guardar
              </button>
              <button type="button" className="btn px-3 py-2 rounded-3 text-secondary" style={{ backgroundColor: '#f1f5f9', border: 'none', fontSize: '14px' }}>
                <i className="bi bi-pencil-square me-2"></i>Editar
              </button>
              <button type="button" className="btn px-3 py-2 rounded-3 text-secondary" style={{ backgroundColor: '#f1f5f9', border: 'none', fontSize: '14px' }}>
                <i className="bi bi-trash me-2"></i>Eliminar
              </button>
              <button type="button" className="btn px-3 py-2 rounded-3 fw-bold" style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontSize: '14px' }}>
                <i className="bi bi-search me-2"></i>Buscar
              </button>
            </div>

            <div>
              <button type="button" className="btn px-3 py-2 rounded-3 text-secondary border" style={{ backgroundColor: '#ffffff', fontSize: '14px' }}>
                ✕ Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 4. LISTADO DE GRADOS Y SECCIONES */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Listado de Grados y Secciones</h5>
            <span className="badge rounded-pill bg-light text-primary px-2 py-1 border" style={{ fontSize: '12px' }}>
              11
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* FILTROS POR GRADO */}
            <div className="d-flex gap-1 bg-light p-1 rounded-pill border">
              {['Todos', '1°', '2°', '3°', '4°', '5°', '6°'].map((tab) => {
                const isActive = filtroGrado === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFiltroGrado(tab)}
                    className="btn btn-sm rounded-pill fw-semibold border-0 px-3"
                    style={{
                      backgroundColor: isActive ? '#1d3b8f' : 'transparent',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontSize: '12px'
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* INPUT DE BÚSQUEDA */}
            <div className="position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ fontSize: '13px' }}></i>
              <input
                type="text"
                className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill"
                placeholder="Buscar..."
                style={{ width: '180px', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>

        {/* TABLA DE REGISTROS */}
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table table-borderless align-middle m-0" style={{ minWidth: '700px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th className="py-3 px-3 text-muted small fw-bold" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>ID</th>
                <th className="py-3 px-3 text-muted small fw-bold">GRADO</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center">SECCIÓN</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {gradosList.map((g) => (
                <tr key={g.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* ID */}
                  <td className="py-3 px-3 fw-bold" style={{ color: '#1d3b8f', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {g.id}
                  </td>

                  {/* GRADO + ICONO DE COLOR */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '36px', height: '36px', backgroundColor: g.color, fontSize: '13px', flexShrink: 0 }}
                      >
                        {g.gradoNum}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-bold" style={{ color: '#0f172a', fontSize: '14px' }}>{g.gradoTexto}</span>
                        <small className="text-muted" style={{ fontSize: '11px' }}>{g.nivel}</small>
                      </div>
                    </div>
                  </td>

                  {/* SECCIÓN */}
                  <td className="py-3 px-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                    <span className="fw-bold" style={{ color: g.seccionColor, fontSize: '16px' }}>
                      {g.seccion}
                    </span>
                  </td>

                  {/* ACCIONES */}
                  <td className="py-3 px-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex justify-content-center gap-1">
                      <button 
                        className="btn btn-sm px-3 py-1 rounded-2 fw-semibold d-flex align-items-center gap-1"
                        style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', fontSize: '12px' }}
                      >
                        <i className="bi bi-pencil-square"></i> Editar
                      </button>
                      <button 
                        className="btn btn-sm px-3 py-1 rounded-2 fw-semibold d-flex align-items-center gap-1"
                        style={{ backgroundColor: '#ffe4e6', color: '#e11d48', border: 'none', fontSize: '12px' }}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. PIE DE PAGINACIÓN */}
        <div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
          <span className="text-muted small" style={{ fontSize: '13px' }}>
            Mostrando 11 de 11 registros
          </span>

          <div className="d-flex gap-1">
            <button 
              className="btn btn-sm fw-bold text-white d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', backgroundColor: '#1e3a8a', borderRadius: '8px', border: 'none' }}
            >
              1
            </button>
            <button 
              className="btn btn-sm fw-bold text-primary d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', backgroundColor: '#eff6ff', borderRadius: '8px', border: 'none' }}
            >
              2
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}