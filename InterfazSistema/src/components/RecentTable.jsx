import React from 'react';

export default function RecentTable() {
  const matriculas = [
    { codigo: "MAT-2025-001", estudiante: "Camila Ríos Torres", apoderado: "Rosa Torres", grado: "1°", sec: "A", estado: "Activa", fecha: "02/07/2025" },
    { codigo: "MAT-2025-002", estudiante: "Andrés Mamani Quispe", apoderado: "Juan Mamani", grado: "3°", sec: "B", estado: "Pendiente", fecha: "03/07/2025" },
    { codigo: "MAT-2025-003", estudiante: "Lucía Fernández Díaz", apoderado: "Ana Díaz", grado: "2°", sec: "A", estado: "Activa", fecha: "03/07/2025" },
    { codigo: "MAT-2025-004", estudiante: "Diego Salinas Vera", apoderado: "Carlos Salinas", grado: "5°", sec: "C", estado: "Activa", fecha: "04/07/2025" },
    { codigo: "MAT-2025-005", estudiante: "Valeria Cruz Huanca", apoderado: "Marta Huanca", grado: "4°", sec: "A", estado: "Observada", fecha: "05/07/2025" },
    { codigo: "MAT-2025-006", estudiante: "Sebastián Paredes Loza", apoderado: "Elena Loza", grado: "6°", sec: "B", estado: "Activa", fecha: "05/07/2025" },
    { codigo: "MAT-2025-007", estudiante: "Isabella Ochoa Ramos", apoderado: "Pedro Ochoa", grado: "1°", sec: "B", estado: "Pendiente", fecha: "07/07/2025" },
  ];

  return (
    <div className="bg-white p-4 shadow-sm border-0" style={{ borderRadius: '20px' }}>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0" style={{ color: '#1e293b', fontSize: '18px' }}>
          Matrículas Recientes
        </h5>
        <button 
          className="btn btn-sm px-3 py-1 fw-bold border-0" 
          style={{ backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '20px', fontSize: '13px' }}
        >
          Ver todas
        </button>
      </div>

      {/* Contenedor de Scroll */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table className="table table-borderless align-middle m-0" style={{ minWidth: '780px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ width: '140px', whiteSpace: 'nowrap', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} className="py-2 px-3 text-muted small fw-bold">CÓDIGO</th>
              <th style={{ width: '180px', whiteSpace: 'nowrap' }} className="py-2 px-3 text-muted small fw-bold">ESTUDIANTE</th>
              <th style={{ width: '150px', whiteSpace: 'nowrap' }} className="py-2 px-3 text-muted small fw-bold">APODERADO</th>
              <th style={{ width: '70px', whiteSpace: 'nowrap' }} className="py-2 px-3 text-muted small fw-bold text-center">GRADO</th>
              <th style={{ width: '60px', whiteSpace: 'nowrap' }} className="py-2 px-3 text-muted small fw-bold text-center">SEC.</th>
              <th style={{ width: '100px', whiteSpace: 'nowrap' }} className="py-2 px-3 text-muted small fw-bold text-center">ESTADO</th>
              <th style={{ width: '110px', whiteSpace: 'nowrap', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }} className="py-2 px-3 text-muted small fw-bold text-end">FECHA</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((row, index) => {
              let statusColor = "#16a34a"; // Activa
              if (row.estado === "Pendiente") statusColor = "#d97706";
              if (row.estado === "Observada") statusColor = "#dc2626";

              return (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '13px' }} className="py-3 px-3 text-muted">{row.codigo}</td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '13px', color: '#1e293b' }} className="py-3 px-3 fw-bold">{row.estudiante}</td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '13px' }} className="py-3 px-3 text-secondary">{row.apoderado}</td>
                  <td style={{ fontSize: '13px' }} className="py-3 px-3 text-center">{row.grado}</td>
                  <td style={{ fontSize: '13px' }} className="py-3 px-3 text-center">{row.sec}</td>
                  <td style={{ fontSize: '13px' }} className="py-3 px-3 text-center">
                    <span className="fw-bold" style={{ color: statusColor }}>{row.estado}</span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '13px' }} className="py-3 px-3 text-muted text-end">{row.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}