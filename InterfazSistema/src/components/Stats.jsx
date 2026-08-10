import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Stats() {

  const [estudiantes, setEstudiantes] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {

      const [
        respuestaEstudiantes,
        respuestaMatriculas,
        respuestaPagos,
        respuestaDocumentos
      ] = await Promise.all([
        api.get("/estudiantes"),
        api.get("/matriculas"),
        api.get("/pagos"),
        api.get("/documentos")
      ]);

      setEstudiantes(respuestaEstudiantes.data);
      setMatriculas(respuestaMatriculas.data);
      setPagos(respuestaPagos.data);
      setDocumentos(respuestaDocumentos.data);

      console.log("Dashboard estudiantes:", respuestaEstudiantes.data);
      console.log("Dashboard matrículas:", respuestaMatriculas.data);
      console.log("Dashboard pagos:", respuestaPagos.data);
      console.log("Dashboard documentos:", respuestaDocumentos.data);

    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  // ============================================================
  // CÁLCULOS DINÁMICOS
  // ============================================================

  const totalEstudiantes = estudiantes.length;

  const matriculasActivas = matriculas.filter((m) => {
    const estado = (m.estado || "").toLowerCase();

    return (
      estado === "matriculado" ||
      estado === "activo"
    );
  }).length;

  const totalPagos = pagos.length;

  const totalDocumentos = documentos.length;

  // Porcentaje de estudiantes que tienen matrícula activa
  const porcentajeMatriculados =
    totalEstudiantes > 0
      ? Math.round((matriculasActivas / totalEstudiantes) * 100)
      : 0;

  // Suma total de pagos registrados
  const montoTotalPagos = pagos.reduce(
    (total, pago) => total + Number(pago.monto || 0),
    0
  );

  const statsData = [
    {
      id: 1,
      value: totalEstudiantes,
      valueColor: "#1e293b",
      label: "Total Estudiantes",
      badgeText: "registrados",
      badgeBg: "#eff6ff",
      badgeColor: "#2563eb",
      iconClass: "bi bi-person-fill",
      iconBg: "#e0e7ff",
      iconColor: "#4338ca",
    },
    {
      id: 2,
      value: matriculasActivas,
      valueColor: "#16a34a",
      label: "Matrículas Activas",
      badgeText: `${porcentajeMatriculados}% del total`,
      badgeBg: "#dcfce7",
      badgeColor: "#15803d",
      iconClass: "bi bi-clipboard-check-fill",
      iconBg: "#dcfce7",
      iconColor: "#166534",
    },
    {
      id: 3,
      value: totalPagos,
      valueColor: "#d97706",
      label: "Pagos Registrados",
      badgeText: `S/ ${montoTotalPagos.toFixed(2)} total`,
      badgeBg: "#fef3c7",
      badgeColor: "#b45309",
      iconClass: "bi bi-credit-card-fill",
      iconBg: "#fef3c7",
      iconColor: "#92400e",
    },
    {
      id: 4,
      value: totalDocumentos,
      valueColor: "#dc2626",
      label: "Documentos Registrados",
      badgeText: "en el sistema",
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

        <div
          className="col-12 col-sm-6 col-xl-3"
          key={stat.id}
        >

          <div
            className="bg-white p-4 shadow-sm border-0 d-flex flex-column justify-content-between h-100"
            style={{ borderRadius: "20px" }}
          >

            {/* Fila Superior: Ícono y Badge */}

            <div className="d-flex justify-content-between align-items-center mb-3">

              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: stat.iconBg,
                  color: stat.iconColor,
                  fontSize: "20px"
                }}
              >
                <i className={stat.iconClass}></i>
              </div>

              <span
                className="px-3 py-1 rounded-pill small fw-semibold"
                style={{
                  backgroundColor: stat.badgeBg,
                  color: stat.badgeColor,
                  fontSize: "12px"
                }}
              >
                {stat.badgeText}
              </span>

            </div>

            {/* Fila Inferior: Número y Leyenda */}

            <div>

              <h2
                className="fw-bold m-0"
                style={{
                  color: stat.valueColor,
                  fontSize: "28px",
                  lineHeight: "1.2"
                }}
              >
                {stat.value}
              </h2>

              <small
                className="text-muted"
                style={{ fontSize: "13px" }}
              >
                {stat.label}
              </small>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}