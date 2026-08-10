import React from 'react';

export default function Stats() {
  const statsData = [
    {
      id: 1,
      value: "1,248",
      valueColor: "#1e293b",
      label: "Total Estudiantes",
      badgeText: "+43 este mes",
      badgeBg: "#eff6ff",
      badgeColor: "#2563eb",
      iconClass: "bi bi-person-fill",
      iconBg: "#e0e7ff",
      iconColor: "#4338ca",
    },
    {
      id: 2,
      value: "1,136",
      valueColor: "#16a34a",
      label: "Matrículas Activas",
      badgeText: "91% del total",
      badgeBg: "#dcfce7",
      badgeColor: "#15803d",
      iconClass: "bi bi-clipboard-check-fill",
      iconBg: "#dcfce7",
      iconColor: "#166534",
    },
    {
      id: 3,
      value: "84",
      valueColor: "#d97706",
      label: "Pagos Pendientes",
      badgeText: "S/ 21,200 total",
      badgeBg: "#fef3c7",
      badgeColor: "#b45309",
      iconClass: "bi bi-credit-card-fill",
      iconBg: "#fef3c7",
      iconColor: "#92400e",
    },
    {
      id: 4,
      value: "37",
      valueColor: "#dc2626",
      label: "Docs. por Validar",
      badgeText: "12 urgentes",
      badgeBg: "#ffe4e6",
      badgeColor: "#be123c",
      iconClass: "bi bi-folder-fill",
      iconBg: "#ffe4e6",
      iconColor: "#9f1239",
    },
  ];

  return (
    <div className="row g-3">
      {statsData.map((stat) => (
        <div key={stat.id} className="col-12 col-sm-6 col-xl-3">
          <div 
            className="bg-white p-4 shadow-sm border-0 d-flex flex-column justify-content-between h-100"
            style={{ borderRadius: '20px' }}
          >
            {/* Fila Superior: Ícono y Badge */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div 
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ 
                  width: '44px', 
                  height: '44px', 
                  backgroundColor: stat.iconBg, 
                  color: stat.iconColor,
                  fontSize: '20px'
                }}
              >
                <i className={stat.iconClass}></i>
              </div>
              <span 
                className="px-3 py-1 rounded-pill small fw-semibold"
                style={{ 
                  backgroundColor: stat.badgeBg, 
                  color: stat.badgeColor,
                  fontSize: '12px'
                }}
              >
                {stat.badgeText}
              </span>
            </div>

            {/* Fila Inferior: Número y Leyenda */}
            <div>
              <h2 
                className="fw-bold m-0" 
                style={{ color: stat.valueColor, fontSize: '28px', lineHeight: '1.2' }}
              >
                {stat.value}
              </h2>
              <small className="text-muted" style={{ fontSize: '13px' }}>
                {stat.label}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}