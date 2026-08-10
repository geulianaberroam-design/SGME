import React, { useState } from 'react';

export default function Documentos() {
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [formData, setFormData] = useState({
    idDocumento: "DOC-009",
    estadoDocumento: "Pendiente",
    estudiante: "",
    tipoDocumento: "DNI",
    estadoVisual: "Pendiente"
  });

  // Lista de documentos extraída de las capturas de pantalla
  const [documentosList] = useState([
    { id: "DOC-001", init: "CS", estudiante: "Camila Sofía Ríos Torres", estId: "EST-001", tipo: "DNI", tipoIcon: "🎴", tipoBg: "#eff6ff", tipoColor: "#2563eb", estado: "Aprobado", estadoIcon: "bi bi-check-lg", estadoBg: "#dcfce7", estadoColor: "#166534", fecha: "02 mar. 2025" },
    { id: "DOC-002", init: "CS", estudiante: "Camila Sofía Ríos Torres", estId: "EST-001", tipo: "Partida de Nacimiento", tipoIcon: "📄", tipoBg: "#f3e8ff", tipoColor: "#7e22ce", estado: "Aprobado", estadoIcon: "bi bi-check-lg", estadoBg: "#dcfce7", estadoColor: "#166534", fecha: "02 mar. 2025" },
    { id: "DOC-003", init: "AG", estudiante: "Andrés Gabriel Mamani Quispe", estId: "EST-002", tipo: "DNI", tipoIcon: "🎴", tipoBg: "#eff6ff", tipoColor: "#2563eb", estado: "Pendiente", estadoIcon: "⌛", estadoBg: "#fef3c7", estadoColor: "#b45309", fecha: "03 mar. 2025" },
    { id: "DOC-004", init: "LB", estudiante: "Lucía Beatriz Fernández Díaz", estId: "EST-003", tipo: "Foto", tipoIcon: "📷", tipoBg: "#dcfce7", tipoColor: "#15803d", estado: "Aprobado", estadoIcon: "bi bi-check-lg", estadoBg: "#dcfce7", estadoColor: "#166534", fecha: "03 mar. 2025" },
    { id: "DOC-005", init: "DA", estudiante: "Diego Alonso Salinas Vera", estId: "EST-004", tipo: "Libreta de Notas", tipoIcon: "📓", tipoBg: "#fef3c7", tipoColor: "#b45309", estado: "Rechazado", estadoIcon: "❌", estadoBg: "#ffe4e6", estadoColor: "#be123c", fecha: "05 mar. 2025" },
    { id: "DOC-006", init: "VE", estudiante: "Valeria Estrella Cruz Huanca", estId: "EST-005", tipo: "Partida de Nacimiento", tipoIcon: "📄", tipoBg: "#f3e8ff", tipoColor: "#7e22ce", estado: "Observación", estadoIcon: "👁️", estadoBg: "#f1f5f9", estadoColor: "#475569", fecha: "05 mar. 2025" },
    { id: "DOC-007", init: "SR", estudiante: "Sebastián Rodrigo Paredes Loza", estId: "EST-006", tipo: "DNI", tipoIcon: "🎴", tipoBg: "#eff6ff", tipoColor: "#2563eb", estado: "Aprobado", estadoIcon: "bi bi-check-lg", estadoBg: "#dcfce7", estadoColor: "#166534", fecha: "07 mar. 2025" },
    { id: "DOC-008", init: "IF", estudiante: "Isabella Fernanda Ochoa Ramos", estId: "EST-007", tipo: "Foto", tipoIcon: "📷", tipoBg: "#dcfce7", tipoColor: "#15803d", estado: "Pendiente", estadoIcon: "⌛", estadoBg: "#fef3c7", estadoColor: "#b45309", fecha: "10 mar. 2025" },
  ]);

  const tiposDoc = [
    { id: "DNI", label: "DNI", icon: "🎴" },
    { id: "Partida de Nacimiento", label: "Partida de Nacimiento", icon: "📄" },
    { id: "Foto", label: "Foto", icon: "📷" },
    { id: "Libreta de Notas", label: "Libreta de Notas", icon: "📓" }
  ];

  const estadosVisuales = [
    { id: "Pendiente", label: "Pendiente", icon: "⌛", activeBg: "#fef9c3", borderColor: "#f59e0b", textColor: "#b45309" },
    { id: "Aprobado", label: "Aprobado", icon: "✅", activeBg: "#dcfce7", borderColor: "#22c55e", textColor: "#166534" },
    { id: "Rechazado", label: "Rechazado", icon: "❌", activeBg: "#ffe4e6", borderColor: "#ef4444", textColor: "#be123c" },
    { id: "Observación", label: "Observación", icon: "👁️", activeBg: "#f1f5f9", borderColor: "#94a3b8", textColor: "#475569" }
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
            style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', fontSize: '24px' }}
          >
            📁
          </div>
          <div>
            <h3 className="fw-bold m-0" style={{ color: '#0f172a', fontSize: '22px' }}>
              Gestión de Documentos
            </h3>
            <span className="text-muted small">Control de expedientes escolares · Año 2025</span>
          </div>
        </div>

        {/* Badges superiores */}
        <div className="d-flex gap-2">
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            4 aprobados
          </span>
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
            2 pendientes
          </span>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="row g-3">
        {/* Total documentos */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#eff6ff', fontSize: '18px' }}>
                📁
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                registrados
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1d3b8f' }}>8</h2>
              <small className="text-muted">Total documentos</small>
            </div>
          </div>
        </div>

        {/* Aprobados */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#dcfce7', fontSize: '18px' }}>
                ✅
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                completos
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#16a34a' }}>4</h2>
              <small className="text-muted">Aprobados</small>
            </div>
          </div>
        </div>

        {/* Pendientes */}
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
              <small className="text-muted">Pendientes</small>
            </div>
          </div>
        </div>

        {/* Con observaciones */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#ffe4e6', fontSize: '18px' }}>
                ⚠️
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#ffe4e6', color: '#e11d48' }}>
                requieren acción
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#dc2626' }}>2</h2>
              <small className="text-muted">Con observaciones</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN FORMULARIO + ESTADO DEL EXPEDIENTE */}
      <div className="row g-3">
        {/* FORMULARIO */}
        <div className="col-12 col-lg-8">
          <div className="bg-white p-4 rounded-4 shadow-sm border border-light h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
                <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Gestión de Documentos</h5>
              </div>
              <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#1d3b8f', fontSize: '14px' }}>
                Nuevo Documento
              </button>
            </div>

            <form>
              <div className="row g-3">
                {/* ID DEL DOCUMENTO */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    ID DEL DOCUMENTO
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0 text-muted">
                      <i className="bi bi-files"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-0 fw-bold"
                      style={{ color: '#1d3b8f' }}
                      value={formData.idDocumento}
                      readOnly
                    />
                  </div>
                </div>

                {/* ESTADO DEL DOCUMENTO */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    ESTADO DEL DOCUMENTO <span className="text-danger">*</span>
                  </label>
                  <select
                    name="estadoDocumento"
                    className="form-select bg-light border-0"
                    value={formData.estadoDocumento}
                    onChange={handleChange}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                    <option value="Observación">Observación</option>
                  </select>
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
                    <option value="EST-001">Camila Sofía Ríos Torres</option>
                    <option value="EST-002">Andrés Gabriel Mamani Quispe</option>
                  </select>
                </div>

                {/* TIPO DE DOCUMENTO */}
                <div className="col-12">
                  <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    TIPO DE DOCUMENTO <span className="text-danger">*</span>
                  </label>
                  <div className="row g-2">
                    {tiposDoc.map((t) => {
                      const isSelected = formData.tipoDocumento === t.id;
                      return (
                        <div key={t.id} className="col-6 col-md-3">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, tipoDocumento: t.id })}
                            className="btn w-100 py-3 d-flex flex-column align-items-center justify-content-center gap-1 rounded-3"
                            style={{
                              backgroundColor: isSelected ? '#eff6ff' : '#f8fafc',
                              border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                              color: isSelected ? '#1d3b8f' : '#64748b',
                              transition: 'all 0.2s'
                            }}
                          >
                            <span style={{ fontSize: '18px' }}>{t.icon}</span>
                            <span className="fw-bold" style={{ fontSize: '11px' }}>{t.label}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ESTADO VISUAL */}
                <div className="col-12">
                  <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                    ESTADO VISUAL
                  </label>
                  <div className="row g-2">
                    {estadosVisuales.map((est) => {
                      const isSelected = formData.estadoVisual === est.id;
                      return (
                        <div key={est.id} className="col-6 col-md-3">
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
                            <span className="fw-bold" style={{ fontSize: '12px' }}>{est.label}</span>
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
        </div>

        {/* TARJETA DERECHA: ESTADO DEL EXPEDIENTE */}
        <div className="col-12 col-lg-4">
          <div className="bg-white p-4 rounded-4 shadow-sm border border-light h-100 d-flex flex-column">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
              <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Estado del expediente</h5>
            </div>

            <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4">
              <div className="mb-3" style={{ fontSize: '48px' }}>
                📁
              </div>
              <p className="text-muted small m-0" style={{ maxWidth: '220px', fontSize: '13px' }}>
                Selecciona un estudiante para ver el estado de su expediente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HISTORIAL DE DOCUMENTOS */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Historial de Documentos</h5>
            <span className="badge rounded-pill bg-light text-primary px-2 py-1 border" style={{ fontSize: '12px' }}>
              8
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* FILTROS POR ESTADO */}
            <div className="d-flex gap-1 bg-light p-1 rounded-pill border">
              {['Todos', 'Pendiente', 'Aprobado', 'Rechazado', 'Observación'].map((tab) => {
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
                    {tab === 'Aprobado' && <span>✅</span>}
                    {tab === 'Rechazado' && <span>❌</span>}
                    {tab === 'Observación' && <span>👁️</span>}
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* FILTRO TIPO */}
            <select
              className="form-select form-select-sm bg-light border-0 rounded-pill"
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              style={{ width: '130px', fontSize: '12px' }}
            >
              <option value="">— Tipo —</option>
              <option value="DNI">DNI</option>
              <option value="Partida">Partida</option>
              <option value="Foto">Foto</option>
              <option value="Libreta">Libreta</option>
            </select>

            {/* BÚSQUEDA */}
            <div className="position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ fontSize: '13px' }}></i>
              <input
                type="text"
                className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill"
                placeholder="Buscar documento..."
                style={{ width: '180px', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>

        {/* TABLA DE HISTORIAL */}
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table table-borderless align-middle m-0" style={{ minWidth: '900px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th className="py-3 px-3 text-muted small fw-bold" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>ID</th>
                <th className="py-3 px-3 text-muted small fw-bold">ESTUDIANTE</th>
                <th className="py-3 px-3 text-muted small fw-bold">TIPO DE DOCUMENTO</th>
                <th className="py-3 px-3 text-muted small fw-bold">ESTADO</th>
                <th className="py-3 px-3 text-muted small fw-bold">FECHA</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {documentosList.map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* ID */}
                  <td className="py-3 px-3 fw-bold" style={{ color: '#1d3b8f', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {d.id}
                  </td>

                  {/* ESTUDIANTE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', fontSize: '11px', flexShrink: 0 }}
                      >
                        {d.init}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-bold" style={{ color: '#0f172a', fontSize: '13px' }}>{d.estudiante}</span>
                        <small className="text-muted" style={{ fontSize: '11px' }}>{d.estId}</small>
                      </div>
                    </div>
                  </td>

                  {/* TIPO DE DOCUMENTO BADGE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span 
                      className="px-3 py-1 rounded-pill small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: d.tipoBg, color: d.tipoColor, fontSize: '12px' }}
                    >
                      <span>{d.tipoIcon}</span>
                      {d.tipo}
                    </span>
                  </td>

                  {/* ESTADO BADGE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className="px-3 py-1 rounded-pill small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: d.estadoBg, color: d.estadoColor, fontSize: '12px' }}
                    >
                      {d.estadoIcon.startsWith('bi') ? <i className={d.estadoIcon}></i> : <span>{d.estadoIcon}</span>}
                      {d.estado}
                    </span>
                  </td>

                  {/* FECHA */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {d.fecha}
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
            Mostrando 8 de 8 documentos
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