import React from 'react';

export default function Notifications() {
  const notificationsList = [
    {
      id: 1,
      title: "84 pagos de pensión pendientes de este mes",
      time: "Hace 2h",
      iconClass: "bi bi-exclamation-triangle-fill",
      iconColor: "#d97706",
      borderColor: "#f59e0b",
      bg: "#fef9c3",
      textColor: "#713f12",
      timeColor: "#a16207"
    },
    {
      id: 2,
      title: "12 estudiantes con documentos incompletos",
      time: "Hace 5h",
      iconClass: "bi bi-record-circle-fill",
      iconColor: "#dc2626",
      borderColor: "#ef4444",
      bg: "#ffe4e6",
      textColor: "#881337",
      timeColor: "#9f1239"
    },
    {
      id: 3,
      title: "7 matrículas nuevas por aprobar",
      time: "Hace 1d",
      iconClass: "bi bi-info-square-fill",
      iconColor: "#2563eb",
      borderColor: "#3b82f6",
      bg: "#eff6ff",
      textColor: "#1e3a8a",
      timeColor: "#60a5fa"
    },
    {
      id: 4,
      title: "Reporte mensual generado correctamente",
      time: "Hace 2d",
      iconClass: "bi bi-check-square-fill",
      iconColor: "#16a34a",
      borderColor: "#22c55e",
      bg: "#dcfce7",
      textColor: "#14532d",
      timeColor: "#4ade80"
    },
    {
      id: 5,
      title: "Plazo de matrícula cierra el 15 de julio",
      time: "Hace 2d",
      iconClass: "bi bi-exclamation-triangle-fill",
      iconColor: "#d97706",
      borderColor: "#f59e0b",
      bg: "#fef9c3",
      textColor: "#713f12",
      timeColor: "#a16207"
    }
  ];

  return (
    <div 
      className="bg-white p-4 shadow-sm border-0" 
      style={{ borderRadius: '20px' }}
    >
      {/* Encabezado con título y Badge "5 nuevas" */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold m-0" style={{ color: '#1e293b', fontSize: '18px' }}>
          Notificaciones
        </h5>
        <span 
          className="px-3 py-1 rounded-pill small fw-bold" 
          style={{ backgroundColor: '#ffe4e6', color: '#e11d48', fontSize: '12px' }}
        >
          5 nuevas
        </span>
      </div>

      {/* Lista de alertas */}
      <div className="d-flex flex-column gap-2">
        {notificationsList.map((item) => (
          <div
            key={item.id}
            className="p-3 d-flex align-items-start gap-3"
            style={{
              backgroundColor: item.bg,
              borderLeft: `5px solid ${item.borderColor}`,
              borderRadius: '14px'
            }}
          >
            {/* Ícono de estado */}
            <div className="mt-1" style={{ fontSize: '18px', color: item.iconColor }}>
              <i className={item.iconClass}></i>
            </div>

            {/* Texto y Tiempo */}
            <div className="d-flex flex-column">
              <span 
                className="fw-semibold" 
                style={{ color: item.textColor, fontSize: '13px', lineHeight: '1.3' }}
              >
                {item.title}
              </span>
              <small 
                style={{ color: item.timeColor, fontSize: '12px', marginTop: '3px' }}
              >
                {item.time}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}