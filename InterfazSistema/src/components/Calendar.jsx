import React from 'react';

export default function Calendar() {
  const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  // Matriz de días para Agosto 2026 (empieza en Sábado 1)
  const calendarDays = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  const eventos = [
    { fecha: '15 Jul', titulo: 'Cierre de matrículas', color: '#3b82f6' }, // Azul
    { fecha: '28 Jul', titulo: 'Feriado nacional', color: '#10b981' },    // Verde
    { fecha: '1 Ago', titulo: 'Inicio clases 2° bimestre', color: '#f59e0b' }, // Naranja
  ];

  return (
    <div 
      className="bg-white p-4 shadow-sm border-0" 
      style={{ borderRadius: '20px' }}
    >
      {/* Título y navegación de mes */}
      <h5 className="fw-bold text-dark mb-4" style={{ fontSize: '18px' }}>
        Calendario
      </h5>

      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <button className="btn btn-sm text-muted p-0 border-0">
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="fw-bold" style={{ color: '#1e293b', fontSize: '15px' }}>
          Agosto 2026
        </span>
        <button className="btn btn-sm text-muted p-0 border-0">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Días de la semana */}
      <div className="d-grid text-center mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="fw-bold small text-muted" style={{ fontSize: '12px' }}>
            {day}
          </span>
        ))}
      </div>

      {/* Cuadrícula de números */}
      <div className="d-flex flex-column gap-1 mb-4">
        {calendarDays.map((week, wIdx) => (
          <div key={wIdx} className="d-grid text-center" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {week.map((day, dIdx) => {
              const isSelected = day === 10;
              return (
                <div 
                  key={dIdx} 
                  className="d-flex align-items-center justify-content-center mx-auto"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: isSelected ? '12px' : '0',
                    backgroundColor: isSelected ? '#1e3a8a' : 'transparent',
                    color: isSelected ? '#ffffff' : '#334155',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    fontSize: '13px',
                    cursor: day ? 'pointer' : 'default'
                  }}
                >
                  {day || ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <hr className="my-3" style={{ borderColor: '#f1f5f9' }} />

      {/* Próximos Eventos */}
      <div>
        <h6 className="fw-bold text-muted small mb-3" style={{ fontSize: '13px' }}>
          Próximos eventos
        </h6>
        <div className="d-flex flex-column gap-2">
          {eventos.map((evt, idx) => (
            <div key={idx} className="d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
              <span 
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: evt.color,
                  display: 'inline-block',
                  flexShrink: 0
                }}
              ></span>
              <span className="text-secondary fw-semibold">{evt.fecha}</span>
              <span className="text-muted">· {evt.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}