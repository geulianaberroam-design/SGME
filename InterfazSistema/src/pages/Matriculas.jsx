import React, { useState } from 'react';

export default function Matriculas() {
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [formData, setFormData] = useState({
    idMatricula: "MAT-2025-008",
    anoEscolar: "2025",
    fechaMatricula: "10/08/2026",
    estadoMatricula: "Pendiente",
    estudiante: "",
    grado: "",
    seccion: "",
    estadoVisual: "Pendiente"
  });

  // Lista de matrículas extraída de las capturas de pantalla
  const [matriculasList] = useState([
    { id: "MAT-2025-001", ano: "2025", fecha: "02 mar. 2025", estado: "Aprobada", estadoBg: "#dcfce7", estadoColor: "#166534", icon: "bi bi-check-lg", init: "CS", estudiante: "Camila Sofía Ríos Torres", estId: "EST-001", grado: "1°", seccion: "A" },
    { id: "MAT-2025-002", ano: "2025", fecha: "03 mar. 2025", estado: "Aprobada", estadoBg: "#dcfce7", estadoColor: "#166534", icon: "bi bi-check-lg", init: "AG", estudiante: "Andrés Gabriel Mamani Quispe", estId: "EST-002", grado: "3°", seccion: "B" },
    { id: "MAT-2025-003", ano: "2025", fecha: "03 mar. 2025", estado: "Pendiente", estadoBg: "#fef3c7", estadoColor: "#b45309", icon: "⌛", init: "LB", estudiante: "Lucía Beatriz Fernández Díaz", estId: "EST-003", grado: "2°", seccion: "A" },
    { id: "MAT-2025-004", ano: "2025", fecha: "05 mar. 2025", estado: "Rechazada", estadoBg: "#ffe4e6", estadoColor: "#be123c", icon: "❌", init: "DA", estudiante: "Diego Alonso Salinas Vera", estId: "EST-004", grado: "5°", seccion: "C" },
    { id: "MAT-2025-005", ano: "2025", fecha: "05 mar. 2025", estado: "Aprobada", estadoBg: "#dcfce7", estadoColor: "#166534", icon: "bi bi-check-lg", init: "VE", estudiante: "Valeria Estrella Cruz Huanca", estId: "EST-005", grado: "4°", seccion: "A" },
    { id: "MAT-2025-006", ano: "2025", fecha: "07 mar. 2025", estado: "Anulada", estadoBg: "#f1f5f9", estadoColor: "#475569", icon: "🚫", init: "SR", estudiante: "Sebastián Rodrigo Paredes Loza", estId: "EST-006", grado: "6°", seccion: "B" },
    { id: "MAT-2025-007", ano: "2025", fecha: "10 mar. 2025", estado: "Pendiente", estadoBg: "#fef3c7", estadoColor: "#b45309", icon: "⌛", init: "IF", estudiante: "Isabella Fernanda Ochoa Ramos", estId: "EST-007", grado: "1°", seccion: "B" },
  ]);

  const estadosVisuales = [
    { id: "Pendiente", label: "Pendiente", icon: "⌛", activeBg: "#fef9c3", borderColor: "#f59e0b", textColor: "#b45309" },
    { id: "Aprobada", label: "Aprobada", icon: "✅", activeBg: "#dcfce7", borderColor: "#22c55e", textColor: "#166534" },
    { id: "Rechazada", label: "Rechazada", icon: "❌", activeBg: "#ffe4e6", borderColor: "#ef4444", textColor: "#be123c" },
    { id: "Anulada", label: "Anulada", icon: "🚫", activeBg: "#f1f5f9", borderColor: "#94a3b8", textColor: "#475569" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column gap-4">
      
      {/* 1. ENCABEZADO DE PÁGINA */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '48px', height: '48px', backgroundColor: '#eff6ff', fontSize: '24px' }}
          >
            📋
          </div>
          <div>
            <h3 className="fw-bold m-0" style={{ color: '#0f172a', fontSize: '22px' }}>
              Gestión de Matrículas
            </h3>
            <span className="text-muted small">Control y seguimiento de matrículas · Año Escolar 2025</span>
          </div>
        </div>

        {/* Badges superiores */}
        <div className="d-flex gap-2">
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            3 aprobadas
          </span>
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
            2 pendientes
          </span>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="row g-3">
        {/* Total matrículas */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#eff6ff', fontSize: '18px' }}>
                📋
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                registradas
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1d3b8f' }}>7</h2>
              <small className="text-muted">Total matrículas</small>
            </div>
          </div>
        </div>

        {/* Matrículas aprobadas */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#dcfce7', fontSize: '18px' }}>
                ✅
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                activas
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#16a34a' }}>3</h2>
              <small className="text-muted">Matrículas aprobadas</small>
            </div>
          </div>
        </div>

        {/* Pendientes de aprobación */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#fef3c7', fontSize: '18px' }}>
                ⌛
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                en revisión
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#d97706' }}>2</h2>
              <small className="text-muted">Pendientes de aprobación</small>
            </div>
          </div>
        </div>

        {/* Rechazadas / Anuladas */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#ffe4e6', fontSize: '18px' }}>
                ❌
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#ffe4e6', color: '#e11d48' }}>
                no activas
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#dc2626' }}>2</h2>
              <small className="text-muted">Rechazadas / Anuladas</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FORMULARIO DE REGISTRO */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Gestión de Matrículas</h5>
          </div>
          <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#1d3b8f', fontSize: '14px' }}>
            Nueva Matrícula
          </button>
        </div>

        <form>
          <div className="row g-3">
            {/* ID DE MATRÍCULA */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ID DE MATRÍCULA
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0 text-muted">
                  <i className="bi bi-files"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0 fw-bold"
                  style={{ color: '#1d3b8f' }}
                  value={formData.idMatricula}
                  readOnly
                />
              </div>
            </div>

            {/* AÑO ESCOLAR */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                AÑO ESCOLAR <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="anoEscolar"
                className="form-control bg-light border-0"
                value={formData.anoEscolar}
                onChange={handleChange}
              />
            </div>

            {/* FECHA DE MATRÍCULA */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                FECHA DE MATRÍCULA <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="fechaMatricula"
                className="form-control bg-light border-0"
                value={formData.fechaMatricula}
                onChange={handleChange}
              />
            </div>

            {/* ESTADO DE LA MATRÍCULA */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ESTADO DE LA MATRÍCULA <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="estadoMatricula"
                className="form-control bg-light border-0"
                value={formData.estadoMatricula}
                onChange={handleChange}
              />
            </div>

            {/* ESTUDIANTE */}
            <div className="col-12">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ESTUDIANTE <span className="text-danger">*</span>
              </label>
              <select
                name="estudiante"
                className="form-select bg-light border-0 text-secondary"
                value={formData.estudiante}
                onChange={handleChange}
              >
                <option value="">— Seleccionar estudiante —</option>
                <option value="EST-001">Camila Sofía Ríos Torres (EST-001)</option>
                <option value="EST-002">Andrés Gabriel Mamani Quispe (EST-002)</option>
              </select>
            </div>

            {/* GRADO */}
            <div className="col-12 col-md-6">
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
                <option value="1°">1° Primaria</option>
                <option value="2°">2° Primaria</option>
                <option value="3°">3° Primaria</option>
              </select>
            </div>

            {/* SECCIÓN */}
            <div className="col-12 col-md-6">
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
                <option value="A">Sección A</option>
                <option value="B">Sección B</option>
                <option value="C">Sección C</option>
              </select>
            </div>

            {/* ESTADO VISUAL DE BOTONES DE OPCIÓN */}
            <div className="col-12">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ESTADO VISUAL
              </label>
              <div className="row g-2">
                {estadosVisuales.map((est) => {
                  const isSelected = formData.estadoVisual === est.id;
                  return (
                    <div key={est.id} className="col-12 col-sm-6 col-md-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, estadoVisual: est.id })}
                        className="btn w-100 py-3 d-flex flex-column align-items-center justify-content-center gap-1 rounded-3"
                        style={{
                          backgroundColor: isSelected ? est.activeBg : '#f8fafc',
                          border: isSelected ? `2px solid ${est.borderColor}` : '1px solid #e2e8f0',
                          color: isSelected ? est.textColor : '#64748b',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>{est.icon}</span>
                        <span className="fw-bold" style={{ fontSize: '13px' }}>{est.label}</span>
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

      {/* 4. HISTORIAL DE MATRÍCULAS */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Historial de Matrículas</h5>
            <span className="badge rounded-pill bg-light text-primary px-2 py-1 border" style={{ fontSize: '12px' }}>
              7
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* FILTROS DE ESTADO */}
            <div className="d-flex gap-1 bg-light p-1 rounded-pill border">
              {['Todos', 'Pendiente', 'Aprobada', 'Rechazada', 'Anulada'].map((tab) => {
                const isActive = filtroEstado === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFiltroEstado(tab)}
                    className="btn btn-sm rounded-pill fw-semibold border-0 px-3 d-flex align-items-center gap-1"
                    style={{
                      backgroundColor: isActive ? '#1d3b8f' : 'transparent',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontSize: '12px'
                    }}
                  >
                    {tab === 'Pendiente' && <span>⌛</span>}
                    {tab === 'Aprobada' && <span>✅</span>}
                    {tab === 'Rechazada' && <span>❌</span>}
                    {tab === 'Anulada' && <span>🚫</span>}
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
                placeholder="Buscar matrícula..."
                style={{ width: '180px', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>

        {/* TABLA DE HISTORIAL */}
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table table-borderless align-middle m-0" style={{ minWidth: '1000px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th className="py-3 px-3 text-muted small fw-bold" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>ID</th>
                <th className="py-3 px-3 text-muted small fw-bold">AÑO</th>
                <th className="py-3 px-3 text-muted small fw-bold">FECHA</th>
                <th className="py-3 px-3 text-muted small fw-bold">ESTADO</th>
                <th className="py-3 px-3 text-muted small fw-bold">ESTUDIANTE</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center">GRADO</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center">SECCIÓN</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {matriculasList.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* ID */}
                  <td className="py-3 px-3 fw-bold" style={{ color: '#1d3b8f', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {m.id}
                  </td>

                  {/* AÑO */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {m.ano}
                  </td>

                  {/* FECHA */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {m.fecha}
                  </td>

                  {/* ESTADO BADGE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className="px-3 py-1 rounded-pill small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: m.estadoBg, color: m.estadoColor, fontSize: '12px' }}
                    >
                      {m.icon.startsWith('bi') ? <i className={m.icon}></i> : <span>{m.icon}</span>}
                      {m.estado}
                    </span>
                  </td>

                  {/* ESTUDIANTE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', fontSize: '11px', flexShrink: 0 }}
                      >
                        {m.init}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-bold" style={{ color: '#0f172a', fontSize: '13px' }}>{m.estudiante}</span>
                        <small className="text-muted" style={{ fontSize: '11px' }}>{m.estId}</small>
                      </div>
                    </div>
                  </td>

                  {/* GRADO (BADGE AZUL) */}
                  <td className="py-3 px-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                    <span 
                      className="px-2 py-1 rounded fw-bold text-white"
                      style={{ backgroundColor: '#2563eb', fontSize: '12px' }}
                    >
                      {m.grado}
                    </span>
                  </td>

                  {/* SECCIÓN (BADGE SUAVE) */}
                  <td className="py-3 px-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                    <span 
                      className="px-2 py-1 rounded fw-bold text-primary"
                      style={{ backgroundColor: '#eff6ff', fontSize: '12px' }}
                    >
                      {m.seccion}
                    </span>
                  </td>

                  {/* ACCIONES */}
                  <td className="py-3 px-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex justify-content-center gap-1">
                      <button 
                        className="btn btn-sm px-2 py-1 rounded-2 fw-semibold"
                        style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', fontSize: '12px' }}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm px-2 py-1 rounded-2 fw-semibold"
                        style={{ backgroundColor: '#ffe4e6', color: '#e11d48', border: 'none', fontSize: '12px' }}
                      >
                        Eliminar
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
            Mostrando 7 de 7 matrículas
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