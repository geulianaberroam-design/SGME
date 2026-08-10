import React, { useState } from 'react';

export default function Estudiantes() {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    idEstudiante: "EST-008",
    dni: "",
    nombres: "",
    apellidos: ""
  });

  // Lista de estudiantes registrados para la tabla
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, dni: "78647367", nombres: "Adriana", apellidos: "Lopez Adco", estado: "Activa" },
    { id: 2, dni: "71234567", nombres: "Camila", apellidos: "Ríos Torres", estado: "Activa" },
    { id: 3, dni: "74567890", nombres: "Andrés", apellidos: "Mamani Quispe", estado: "Pendiente" },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="d-flex flex-column gap-4">
      
      {/* 1. ENCABEZADO DE PÁGINA */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '48px', height: '48px', backgroundColor: '#e0e7ff', color: '#1e1b4b' }}
          >
            <i className="bi bi-person-fill fs-4"></i>
          </div>
          <div>
            <h3 className="fw-bold m-0" style={{ color: '#0f172a', fontSize: '22px' }}>
              Registro de Estudiantes
            </h3>
            <span className="text-muted small">Padrón de estudiantes · Año Escolar 2025</span>
          </div>
        </div>

        {/* Badges de estado superior */}
        <div className="d-flex gap-2">
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            6 activos
          </span>
          <span className="px-3 py-2 rounded-pill small text-secondary" style={{ backgroundColor: '#f1f5f9' }}>
            1 inactivos
          </span>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="row g-3">
        {/* Total Estudiantes */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
                <i className="bi bi-people-fill"></i>
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                registrados
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#0f172a' }}>7</h2>
              <small className="text-muted">Total estudiantes</small>
            </div>
          </div>
        </div>

        {/* Estudiantes Activos */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
                <i className="bi bi-check-square-fill"></i>
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#dc26260a', color: '#16a34a' }}>
                86% del total
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#16a34a' }}>6</h2>
              <small className="text-muted">Estudiantes activos</small>
            </div>
          </div>
        </div>

        {/* Apoderados Vinculados */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                <i className="bi bi-people-fill"></i>
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                en el sistema
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#d97706' }}>7</h2>
              <small className="text-muted">Apoderados vinculados</small>
            </div>
          </div>
        </div>

        {/* Estudiantes Inactivos */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#e0e7ff', color: '#2563eb' }}>
                <i className="bi bi-pause-btn-fill"></i>
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                sin matrícula
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#2563eb' }}>1</h2>
              <small className="text-muted">Estudiantes inactivos</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FORMULARIO DE REGISTRO */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Registro de Estudiantes</h5>
          </div>
          <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#1d3b8f', fontSize: '14px' }}>
            Nuevo Registro
          </button>
        </div>

        <form>
          <div className="row g-3">
            {/* ID DEL ESTUDIANTE */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ID DEL ESTUDIANTE
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0 text-muted">
                  <i className="bi bi-card-text"></i>
                </span>
                <input
                  type="text"
                  name="idEstudiante"
                  className="form-control bg-light border-0 fw-bold"
                  style={{ color: '#1d3b8f' }}
                  value={formData.idEstudiante}
                  readOnly
                />
              </div>
            </div>

            {/* DNI */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                DNI <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="dni"
                className="form-control bg-light border-0"
                placeholder="Ej: 75432198"
                value={formData.dni}
                onChange={handleChange}
              />
            </div>

            {/* NOMBRES */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                NOMBRES <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="nombres"
                className="form-control bg-light border-0"
                placeholder="Ej: Camila Sofía"
                value={formData.nombres}
                onChange={handleChange}
              />
            </div>

            {/* APELLIDOS */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                APELLIDOS <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="apellidos"
                className="form-control bg-light border-0"
                placeholder="Ej: Ríos Torres"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>

      {/* 4. TABLA DE ESTUDIANTES REGISTRADOS */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Estudiantes Registrados</h5>
          </div>
          <button className="btn-pill-blue">
            Ver Lista Completa
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-borderless align-middle table-compact m-0">
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th className="py-3 px-3 text-muted small fw-bold">ID</th>
                <th className="py-3 px-3 text-muted small fw-bold">DNI</th>
                <th className="py-3 px-3 text-muted small fw-bold">NOMBRES</th>
                <th className="py-3 px-3 text-muted small fw-bold">APELLIDOS</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center">ESTADO</th>
                <th className="py-3 px-3 text-muted small fw-bold text-end">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td className="py-3 px-3 text-muted small">{e.id}</td>
                  <td className="py-3 px-3 fw-semibold">{e.dni}</td>
                  <td className="py-3 px-3 fw-bold text-dark">{e.nombres}</td>
                  <td className="py-3 px-3 text-secondary">{e.apellidos}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={e.estado === 'Activa' ? 'status-active' : 'status-pending'}>
                      {e.estado}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-end">
                    <button className="btn btn-sm btn-light me-1 text-primary rounded-2">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light text-danger rounded-2">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}