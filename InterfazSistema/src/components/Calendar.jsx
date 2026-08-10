import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Calendar() {
  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];

  const [eventos, setEventos] = useState([]);
  const [fechaActual, setFechaActual] = useState(new Date(2026, 7, 1));

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const respuesta = await api.get("/eventos");

      console.log("Eventos recibidos:", respuesta.data);

      setEventos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const nombreMes = fechaActual.toLocaleDateString("es-PE", {
    month: "long",
    year: "numeric"
  });

  const calendarDays = useMemo(() => {
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth();

    const primerDia = new Date(year, month, 1).getDay();
    const totalDias = new Date(year, month + 1, 0).getDate();

    const celdas = [];

    for (let i = 0; i < primerDia; i++) {
      celdas.push(null);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      celdas.push(dia);
    }

    while (celdas.length % 7 !== 0) {
      celdas.push(null);
    }

    const semanas = [];

    for (let i = 0; i < celdas.length; i += 7) {
      semanas.push(celdas.slice(i, i + 7));
    }

    return semanas;
  }, [fechaActual]);

  const cambiarMes = (cantidad) => {
    setFechaActual((fecha) => {
      return new Date(
        fecha.getFullYear(),
        fecha.getMonth() + cantidad,
        1
      );
    });
  };

  const formatearFechaEvento = (fecha) => {
    if (!fecha) return "-";

    const fechaObj = new Date(`${fecha}T00:00:00`);

    return fechaObj.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short"
    });
  };

  const obtenerColorEvento = (tipo) => {
    const tipoNormalizado = (tipo || "").toLowerCase();

    if (tipoNormalizado.includes("matr")) {
      return "#3b82f6";
    }

    if (tipoNormalizado.includes("acad")) {
      return "#f59e0b";
    }

    if (tipoNormalizado.includes("feriado")) {
      return "#10b981";
    }

    return "#64748b";
  };

  const eventosActivos = eventos
    .filter((evento) => {
      return (evento.estado || "").toLowerCase() === "activo";
    })
    .sort((a, b) => {
      return new Date(a.fecha) - new Date(b.fecha);
    });

  return (
    <div
      className="bg-white p-4 shadow-sm border-0"
      style={{ borderRadius: "20px" }}
    >
      {/* TÍTULO */}
      <h5
        className="fw-bold text-dark mb-4"
        style={{ fontSize: "18px" }}
      >
        Calendario
      </h5>

      {/* NAVEGACIÓN DE MES */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">

        <button
          type="button"
          className="btn btn-sm text-muted p-0 border-0"
          onClick={() => cambiarMes(-1)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <span
          className="fw-bold text-capitalize"
          style={{
            color: "#1e293b",
            fontSize: "15px"
          }}
        >
          {nombreMes}
        </span>

        <button
          type="button"
          className="btn btn-sm text-muted p-0 border-0"
          onClick={() => cambiarMes(1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>

      {/* DÍAS DE LA SEMANA */}
      <div
        className="d-grid text-center mb-2"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)"
        }}
      >
        {daysOfWeek.map((day, idx) => (
          <span
            key={idx}
            className="fw-bold small text-muted"
            style={{ fontSize: "12px" }}
          >
            {day}
          </span>
        ))}
      </div>

      {/* CUADRÍCULA DEL CALENDARIO */}
      <div className="d-flex flex-column gap-1 mb-4">

        {calendarDays.map((week, wIdx) => (

          <div
            key={wIdx}
            className="d-grid text-center"
            style={{
              gridTemplateColumns: "repeat(7, 1fr)"
            }}
          >

            {week.map((day, dIdx) => {

              const hoy = new Date();

              const esHoy =
                day === hoy.getDate() &&
                fechaActual.getMonth() === hoy.getMonth() &&
                fechaActual.getFullYear() === hoy.getFullYear();

              return (

                <div
                  key={dIdx}
                  className="d-flex align-items-center justify-content-center mx-auto"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: esHoy ? "12px" : "0",
                    backgroundColor: esHoy
                      ? "#1e3a8a"
                      : "transparent",
                    color: esHoy
                      ? "#ffffff"
                      : "#334155",
                    fontWeight: esHoy
                      ? "bold"
                      : "normal",
                    fontSize: "13px",
                    cursor: day
                      ? "pointer"
                      : "default"
                  }}
                >
                  {day || ""}
                </div>

              );
            })}

          </div>

        ))}

      </div>

      <hr
        className="my-3"
        style={{
          borderColor: "#f1f5f9"
        }}
      />

      {/* PRÓXIMOS EVENTOS */}
      <div>

        <h6
          className="fw-bold text-muted small mb-3"
          style={{
            fontSize: "13px"
          }}
        >
          Próximos eventos
        </h6>

        <div className="d-flex flex-column gap-2">

          {eventosActivos.length === 0 ? (

            <span
              className="text-muted"
              style={{
                fontSize: "13px"
              }}
            >
              No hay eventos registrados.
            </span>

          ) : (

            eventosActivos.map((evt) => (

              <div
                key={evt.id}
                className="d-flex align-items-center gap-2"
                style={{
                  fontSize: "13px"
                }}
              >

                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor:
                      obtenerColorEvento(evt.tipo),
                    display: "inline-block",
                    flexShrink: 0
                  }}
                ></span>

                <span className="text-secondary fw-semibold">
                  {formatearFechaEvento(evt.fecha)}
                </span>

                <span className="text-muted">
                  · {evt.titulo}
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}