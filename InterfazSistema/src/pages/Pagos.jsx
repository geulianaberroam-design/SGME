import React, { useState } from 'react';

export default function Pagos() {
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [formData, setFormData] = useState({
    idPago: "PAG-2025-008",
    fechaPago: "10/08/2026",
    estudiante: "",
    concepto: "Matrícula",
    metodoPago: "Efectivo",
    monto: "",
    comprobante: "",
    estadoPago: "Pagado"
  });

  // Lista de pagos extraída directamente de tus capturas
  const [pagosList] = useState([
    { id: "PAG-2025-001", init: "CS", estudiante: "Camila Sofía Ríos Torres", detalleEst: "1° Primaria · Sec. A", concepto: "Matrícula", metodo: "Efectivo", fecha: "02 mar. 2025", monto: "S/ 350.00", comprobante: "B001-00123", estado: "Pagado", estadoBg: "#dcfce7", estadoColor: "#15803d" },
    { id: "PAG-2025-002", init: "AG", estudiante: "Andrés Gabriel Mamani Quispe", detalleEst: "3° Primaria · Sec. B", concepto: "Matrícula", metodo: "Yape / Plin", fecha: "03 mar. 2025", monto: "S/ 350.00", comprobante: "B001-00124", estado: "Pagado", estadoBg: "#dcfce7", estadoColor: "#15803d" },
    { id: "PAG-2025-003", init: "LB", estudiante: "Lucía Beatriz Fernández Díaz", detalleEst: "2° Primaria · Sec. A", concepto: "Pensión mensual", metodo: "Transferencia bancaria", fecha: "05 abr. 2025", monto: "S/ 280.00", comprobante: "B001-00201", estado: "Pagado", estadoBg: "#dcfce7", estadoColor: "#15803d" },
    { id: "PAG-2025-004", init: "VE", estudiante: "Valeria Estrella Cruz Huanca", detalleEst: "4° Primaria · Sec. A", concepto: "Pensión mensual", metodo: "Efectivo", fecha: "06 abr. 2025", monto: "S/ 280.00", comprobante: "B001-00202", estado: "Parcial", estadoBg: "#fef3c7", estadoColor: "#b45309" },
    { id: "PAG-2025-005", init: "SR", estudiante: "Sebastián Rodrigo Paredes Loza", detalleEst: "6° Primaria · Sec. B", concepto: "Pensión mensual", metodo: "Depósito", fecha: "01 may. 2025", monto: "S/ 280.00", comprobante: "B001-00311", estado: "Pagado", estadoBg: "#dcfce7", estadoColor: "#15803d" },
    { id: "PAG-2025-006", init: "DA", estudiante: "Diego Alonso Salinas Vera", detalleEst: "5° Primaria · Sec. C", concepto: "Materiales", metodo: "Efectivo", fecha: "10 may. 2025", monto: "S/ 120.00", comprobante: "B001-00312", estado: "Anulado", estadoBg: "#ffe4e6", estadoColor: "#be123c", tachado: true },
    { id: "PAG-2025-007", init: "IF", estudiante: "Isabella Fernanda Ochoa Ramos", detalleEst: "1° Primaria · Sec. B", concepto: "Pensión mensual", metodo: "Yape / Plin", fecha: "02 jun. 2025", monto: "S/ 280.00", comprobante: "B001-00401", estado: "Pagado", estadoBg: "#dcfce7", estadoColor: "#15803d" },
  ]);

  const estadosPago = [
    { id: "Pagado", label: "Pagado", activeBg: "#dcfce7", borderColor: "#22c55e", textColor: "#15803d", dotColor: "#22c55e" },
    { id: "Parcial", label: "Parcial", activeBg: "#fef9c3", borderColor: "#f59e0b", textColor: "#b45309", dotColor: "#f59e0b" },
    { id: "Anulado", label: "Anulado", activeBg: "#ffe4e6", borderColor: "#ef4444", textColor: "#be123c", dotColor: "#ef4444" }
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
            💳
          </div>
          <div>
            <h3 className="fw-bold m-0" style={{ color: '#0f172a', fontSize: '22px' }}>
              Registro de Pagos
            </h3>
            <span className="text-muted small">Control de ingresos y pagos del año escolar 2025</span>
          </div>
        </div>

        {/* Badges superiores */}
        <div className="d-flex gap-2">
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
            S/ 1540.00 cobrados
          </span>
          <span className="px-3 py-2 rounded-pill small fw-semibold" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
            1 parciales
          </span>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS */}
      <div className="row g-3">
        {/* Total recaudado */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#eff6ff', fontSize: '18px' }}>
                💰
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                2025
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#1d3b8f' }}>S/ 1820.00</h2>
              <small className="text-muted">Total recaudado</small>
            </div>
          </div>
        </div>

        {/* Pagos completos */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#dcfce7', fontSize: '18px' }}>
                ✅
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                S/ 1540.00
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#16a34a' }}>5</h2>
              <small className="text-muted">Pagos completos</small>
            </div>
          </div>
        </div>

        {/* Pagos parciales */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#fef3c7', fontSize: '18px' }}>
                ⌛
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                pendiente de saldo
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#d97706' }}>1</h2>
              <small className="text-muted">Pagos parciales</small>
            </div>
          </div>
        </div>

        {/* Pagos anulados */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 rounded-3" style={{ backgroundColor: '#ffe4e6', fontSize: '18px' }}>
                🚫
              </div>
              <span className="badge rounded-pill fw-normal px-2 py-1" style={{ backgroundColor: '#ffe4e6', color: '#e11d48' }}>
                no contabilizados
              </span>
            </div>
            <div>
              <h2 className="fw-bold m-0" style={{ color: '#dc2626' }}>1</h2>
              <small className="text-muted">Pagos anulados</small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FORMULARIO DE REGISTRO DE PAGOS */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Registro de Pagos</h5>
          </div>
          <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#1d3b8f', fontSize: '14px' }}>
            Nuevo Registro
          </button>
        </div>

        <form>
          <div className="row g-3">
            {/* ID DEL PAGO */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ID DEL PAGO
              </label>
              <input
                type="text"
                className="form-control bg-light border-0 fw-bold"
                style={{ color: '#1d3b8f' }}
                value={formData.idPago}
                readOnly
              />
            </div>

            {/* FECHA DE PAGO */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                FECHA DE PAGO <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="fechaPago"
                className="form-control bg-light border-0"
                value={formData.fechaPago}
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
                <option value="EST-001">Camila Sofía Ríos Torres</option>
                <option value="EST-002">Andrés Gabriel Mamani Quispe</option>
              </select>
            </div>

            {/* CONCEPTO */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                CONCEPTO <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="concepto"
                className="form-control bg-light border-0"
                value={formData.concepto}
                onChange={handleChange}
              />
            </div>

            {/* MÉTODO DE PAGO */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                MÉTODO DE PAGO
              </label>
              <input
                type="text"
                name="metodoPago"
                className="form-control bg-light border-0"
                value={formData.metodoPago}
                onChange={handleChange}
              />
            </div>

            {/* MONTO */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                MONTO (S/.) <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="monto"
                className="form-control bg-light border-0"
                placeholder="S/ 00"
                value={formData.monto}
                onChange={handleChange}
              />
            </div>

            {/* N° COMPROBANTE */}
            <div className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                N° COMPROBANTE <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="comprobante"
                className="form-control bg-light border-0"
                placeholder="Ej: B001-00456"
                value={formData.comprobante}
                onChange={handleChange}
              />
            </div>

            {/* ESTADO DEL PAGO */}
            <div className="col-12">
              <label className="form-label text-uppercase fw-bold text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                ESTADO DEL PAGO
              </label>
              <div className="row g-2">
                {estadosPago.map((est) => {
                  const isSelected = formData.estadoPago === est.id;
                  return (
                    <div key={est.id} className="col-12 col-md-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, estadoPago: est.id })}
                        className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3"
                        style={{
                          backgroundColor: isSelected ? est.activeBg : '#f8fafc',
                          border: isSelected ? `2px solid ${est.borderColor}` : '1px solid #e2e8f0',
                          color: isSelected ? est.textColor : '#64748b',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: est.dotColor }}></span>
                        <span className="fw-bold" style={{ fontSize: '14px' }}>{est.label}</span>
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

      {/* 4. HISTORIAL DE PAGOS */}
      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '4px', height: '20px', backgroundColor: '#1d3b8f', borderRadius: '2px' }}></div>
            <h5 className="fw-bold m-0" style={{ color: '#0f172a' }}>Historial de Pagos</h5>
            <span className="badge rounded-pill bg-light text-primary px-2 py-1 border" style={{ fontSize: '12px' }}>
              7
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* FILTROS POR ESTADO */}
            <div className="d-flex gap-1 bg-light p-1 rounded-pill border">
              {['Todos', 'Pagado', 'Parcial', 'Anulado'].map((tab) => {
                const isActive = filtroEstado === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFiltroEstado(tab)}
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

            {/* BÚSQUEDA */}
            <div className="position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ fontSize: '13px' }}></i>
              <input
                type="text"
                className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill"
                placeholder="Buscar pago..."
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
                <th className="py-3 px-3 text-muted small fw-bold" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>ID PAGO</th>
                <th className="py-3 px-3 text-muted small fw-bold">ESTUDIANTE</th>
                <th className="py-3 px-3 text-muted small fw-bold">CONCEPTO</th>
                <th className="py-3 px-3 text-muted small fw-bold">MÉTODO</th>
                <th className="py-3 px-3 text-muted small fw-bold">FECHA</th>
                <th className="py-3 px-3 text-muted small fw-bold">MONTO</th>
                <th className="py-3 px-3 text-muted small fw-bold">COMPROBANTE</th>
                <th className="py-3 px-3 text-muted small fw-bold">ESTADO</th>
                <th className="py-3 px-3 text-muted small fw-bold text-center" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {pagosList.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* ID PAGO */}
                  <td className="py-3 px-3 fw-bold" style={{ color: '#1d3b8f', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {p.id}
                  </td>

                  {/* ESTUDIANTE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', fontSize: '11px', flexShrink: 0 }}
                      >
                        {p.init}
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-bold" style={{ color: '#0f172a', fontSize: '13px' }}>{p.estudiante}</span>
                        <small className="text-muted" style={{ fontSize: '11px' }}>{p.detalleEst}</small>
                      </div>
                    </div>
                  </td>

                  {/* CONCEPTO */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {p.concepto}
                  </td>

                  {/* MÉTODO */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {p.metodo}
                  </td>

                  {/* FECHA */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {p.fecha}
                  </td>

                  {/* MONTO */}
                  <td className="py-3 px-3 fw-bold" style={{ color: '#0f172a', fontSize: '13px', whiteSpace: 'nowrap', textDecoration: p.tachado ? 'line-through' : 'none' }}>
                    {p.monto}
                  </td>

                  {/* COMPROBANTE */}
                  <td className="py-3 px-3 text-secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {p.comprobante}
                  </td>

                  {/* ESTADO BADGE */}
                  <td className="py-3 px-3" style={{ whiteSpace: 'nowrap' }}>
                    <span
                      className="px-3 py-1 rounded-pill small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ backgroundColor: p.estadoBg, color: p.estadoColor, fontSize: '12px' }}
                    >
                      ● {p.estado}
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
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted small" style={{ fontSize: '13px' }}>
              Mostrando 7 de 7 pagos
            </span>
            <span className="fw-bold" style={{ color: '#0f172a', fontSize: '13px' }}>
              Subtotal: <span style={{ color: '#1d3b8f' }}>S/ 1820.00</span>
            </span>
          </div>

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