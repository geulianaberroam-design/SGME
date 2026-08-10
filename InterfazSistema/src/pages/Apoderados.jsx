import React, { useState } from 'react';

export default function Apoderados() {
  const [busquedaDni, setBusquedaDni] = useState('');
  const [filtroParentesco, setFiltroParentesco] = useState('Todos');
  const [formData, setFormData] = useState({
    idApoderado: "APO-009",
    dni: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    parentesco: "Padre"
  });

  const parentescosForm = [
    { id: "Padre", label: "Padre", icon: "👨" },
    { id: "Madre", label: "Madre", icon: "👩" },
    { id: "Abuelo(a)", label: "Abuelo(a)", icon: "👴" },
    { id: "Tío(a)", label: "Tío(a)", icon: "🧑" },
    { id: "Hermano(a)", label: "Hermano(a)", icon: "👦" },
    { id: "Tutor(a)", label: "Tutor(a)", iconClass: "bi bi-person-fill" },
    { id: "Otro", label: "Otro", iconClass: "bi bi-person-fill" }
  ];

  // Lista de apoderados para la tabla basada en las imágenes
  const [apoderados] = useState([
    { id: "APO-001", dni: "43218765", init: "RE", nombres: "Rosa Elvira", apellidos: "Torres Mamani", telefono: "987 654 321", correo: "rosa.torres@mail.com", parentesco: "Madre", parentescoBg: "#ffe4e6", parentescoColor: "#be123c", icon: "👩", estado: "Activo" },
    { id: "APO-002", dni: "29876543", init: "JC", nombres: "Juan Carlos", apellidos: "Mamani Quispe", telefono: "945 678 123", correo: "juan.mamani@mail.com", parentesco: "Padre", parentescoBg: "#eff6ff", parentescoColor: "#1d4ed8", icon: "👨", estado: "Activo" },
    { id: "APO-003", dni: "31234578", init: "AP", nombres: "Ana Patricia", apellidos: "Díaz Reyes", telefono: "932 145 678", correo: "ana.diaz@mail.com", parentesco: "Madre", parentescoBg: "#ffe4e6", parentescoColor: "#be123c", icon: "👩", estado: "Activo" },
    { id: "APO-004", dni: "50987654", init: "CA", nombres: "Carlos Alberto", apellidos: "Salinas Vera", telefono: "912 345 678", correo: "carlos.sv@mail.com", parentesco: "Padre", parentescoBg: "#eff6ff", parentescoColor: "#1d4ed8", icon: "👨", estado: "Activo" },
    { id: "APO-005", dni: "68765432", init: "ML", nombres: "Marta Lucia", apellidos: "Huanca Flores", telefono: "968 432 157", correo: "marta.hf@mail.com", parentesco: "Madre", parentescoBg: "#ffe4e6", parentescoColor: "#be123c", icon: "👩", estado: "Activo" },
    { id: "APO-006", dni: "72345891", init: "PA", nombres: "Pedro Augusto", apellidos: "Ochoa Ramos", telefono: "956 321 874", correo: "pedro.or@mail.com", parentesco: "Padre", parentescoBg: "#eff6ff", parentescoColor: "#1d4ed8", icon: "👨", estado: "Activo" },
    { id: "APO-007", dni: "85432109", init: "EB", nombres: "Elena Beatriz", apellidos: "Loza Paredes", telefono: "943 876 512", correo: "elena.lp@mail.com", parentesco: "Tutor(a)", parentescoBg: "#e0f2fe", parentescoColor: "#0369a1", iconClass: "bi bi-person-fill", estado: "Activo" },
    { id: "APO-008", dni: "62341987", init: "RQ", nombres: "Roberto", apellidos: "Quispe Aranda", telefono: "921 543 876", correo: "roberto.qa@mail.com", parentesco: "Abuelo(a)", parentescoBg: "#fef3c7", parentescoColor: "#b45309", icon: "👴", estado: "Inactivo" },
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
            style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', fontSize: '24px' }}
          >
            👨‍👩‍👧
          </div>
          <div>
            <h3 className="fw-bold m-0" style={{ color: '#0f172a', fontSize: '22px' }}>
              Registro de Apoderados
            </h3>
            <span className="text-muted small">Gestiona los apoderados vinculados a los estudiantes</span>
          </div>
        </div>

        <div className="d-flex gap-2">
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            7 activos
          </span>
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
            8 total
          </span>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>
                <i className="bi bi-people-fill fs-5"></i>
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                registrados
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#0f172a' }}>8</h2>
              <small className="text-muted">Total apoderados</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#dcfce7', fontSize: '18px' }}>
                👨‍👩‍👧
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                más frecuente
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#16a34a' }}>6</h2>
              <small className="text-muted">Padres y madres</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                <i className="bi bi-person-fill fs-5"></i>
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                parentesco
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#d97706' }}>1</h2>
              <small className="text-muted">Tutores y otros</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
                📊
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
                registros
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#7e22ce' }}>3</h2>
              <small className="text-muted">Mayoría: Padre</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FORMULARIO DE REGISTRO */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Registro de Apoderados</h5>
          </div>
          <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#1d3b8f', fontSize: '14px' }}>
            Nuevo Registro
          </button>
        </div>

        {/* BÚSQUEDA RÁPIDA POR DNI */}
        <div className="p-3 mb-4 rounded-3" style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1' }}>
          <label className="form-label text-uppercase fw-bold text-muted mb-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
            BÚSQUEDA RÁPIDA POR DNI
          </label>
          <div className="d-flex gap-2">
            <div className="position-relative flex-grow-1">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ fontSize: '14px' }}></i>
              <input
                type="text"
                className="form-control border-0 ps-5 bg-white"
                placeholder="Ingresa el DNI del apoderado y presiona Buscar..."
                value={busquedaDni}
                onChange={(e) => setBusquedaDni(e.target.value)}
                style={{ height: '42px', fontSize: '14px' }}
              />
            </div>
            <button type="button" className="btn px-4 fw-bold text-white d-flex align-items-center gap-2" style={{ backgroundColor: '#1d3b8f', fontSize: '14px', borderRadius: '8px' }}>
              <i className="bi bi-search"></i>
              Buscar
            </button>
          </div>
        </div>

        {/* CAMPOS */}
        <form>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ID DEL APODERADO
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0 text-muted">
                  <i className="bi bi-card-text"></i>
                </span>
                <input
                  type="text"
                  name="idApoderado"
                  className="form-control bg-light border-0 fw-bold"
                  style={{ color: '#1d3b8f' }}
                  value={formData.idApoderado}
                  readOnly
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                DNI <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="dni"
                className="form-control bg-light border-0"
                placeholder="Ej: 43218765"
                value={formData.dni}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                NOMBRES <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="nombres"
                className="form-control bg-light border-0"
                placeholder="Ej: Rosa Elvira"
                value={formData.nombres}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                APELLIDOS <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="apellidos"
                className="form-control bg-light border-0"
                placeholder="Ej: Torres Mamani"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                TELÉFONO <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="telefono"
                className="form-control bg-light border-0"
                placeholder="Ej: 987 654 321"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                CORREO ELECTRÓNICO
              </label>
              <input
                type="email"
                name="correo"
                className="form-control bg-light border-0"
                placeholder="correo@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                PARENTESCO <span className="text-danger">*</span>
              </label>
              <div className="d-flex flex-wrap gap-2">
                {parentescosForm.map((p) => {
                  const isSelected = formData.parentesco === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, parentesco: p.id })}
                      className="btn px-3 py-2 rounded-pill fw-semibold d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        color: isSelected ? '#1d3b8f' : '#64748b',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        fontSize: '13px'
                      }}
                    >
                      {p.icon && <span>{p.icon}</span>}
                      {p.iconClass && <i className={p.iconClass} style={{ color: '#1e3a8a' }}></i>}
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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

      {/* 4. TABLA DEL PADRÓN DE APODERADOS */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        {/* ENCABEZADO Y FILTROS TABLA */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Padrón de Apoderados</h5>
            <span className="badge rounded-pill bg-light text-primary px-2 py-1 border" style={{ fontSize: '12px' }}>
              8
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* BOTONES DE FILTRO PARENTESCO */}
            <div className="d-flex gap-1 bg-light p-1 rounded-pill border">
              {['Todos', 'Padre', 'Madre', 'Tutor(a)', 'Otro'].map((tab) => {
                const isActive = filtroParentesco === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFiltroParentesco(tab)}
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

            {/* INPUT DE BÚSQUEDA TABLA */}
            <div className="position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ fontSize: '13px' }}></i>
              <input
                type="text"
                className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill"
                placeholder="Buscar apoderado..."
                style={{ width: '180px', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>

        {/* TABLA CON SCROLL HORIZONTAL */}
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table table-borderless align-middle m-0" style={{ minWidth: '1100px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th className="py-3 px-3 text-muted small fw-bold" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>ID</th>
                <th className="py-3 px-3 text-muted small fw-bold">DNI</th>
                <th className="py-3 px-3 text-muted small fw-bold">NOMBRES</th>
                <th className="py-3 px-3 text-muted small fw-bold">APELLIDOS</th>
                <th className="py-3 px-3 text-muted small fw-bold">TELÉFONO</th>
                <th className="py-3 px-3 text-muted small fw-bold">CORREO ELECTRÓNICO</th>
                <th className="py-3 px-3 text-muted small fw-bold">PARENTESCO</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center">ESTADO</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {apoderados.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* ID */}
                  <td className="py-3 px-3 fw-bold" style={{ color: '#1d3b8f', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {a.id}
                  </td>

                  {/* DNI */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {a.dni}
                  </td>

                  {/* NOMBRES + AVATAR */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', fontSize: '11px', flexShrink: 0 }}
                      >
                        {a.init}
                      </div>
                      <span className="fw-bold" style={{ color: '#0f172a', fontSize: '14px' }}>
                        {a.nombres}
                      </span>
                    </div>
                  </td>

                  {/* APELLIDOS */}
                  <td className="py-3 px-3 text-dark fw-medium" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
                    {a.apellidos}
                  </td>

                  {/* TELÉFONO */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {a.telefono}
                  </td>

                  {/* CORREO */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <a href={`mailto:${a.correo}`} className="text-decoration-none d-flex align-items-center gap-1" style={{ color: '#2563eb', fontSize: '13px' }}>
                      <i className="bi bi-envelope"></i>
                      {a.correo}
                    </a>
                  </td>

                  {/* PARENTESCO BADGE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span 
                      className="px-3 py-1 rounded-pill small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: a.parentescoBg, color: a.parentescoColor, fontSize: '12px' }}
                    >
                      {a.icon && <span>{a.icon}</span>}
                      {a.iconClass && <i className={a.iconClass}></i>}
                      {a.parentesco}
                    </span>
                  </td>

                  {/* ESTADO CON PUNTO */}
                  <td className="py-3 px-3 text-center" style={{ whiteSpace: 'nowrap' }}>
                    {a.estado === 'Activo' ? (
                      <span className="px-3 py-1 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '12px' }}>
                        ● Activo
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-pill small fw-semibold text-secondary" style={{ backgroundColor: '#f1f5f9', fontSize: '12px' }}>
                        ● Inactivo
                      </span>
                    )}
                  </td>

                  {/* ACCIONES (EDITAR / ELIMINAR) */}
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
            Mostrando 8 de 8 apoderados
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