import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Notifications() {

  const [estudiantes, setEstudiantes] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [documentos, setDocumentos] = useState([]);

  // ============================================================
  // CARGAR DATOS DESDE FLASK / POSTGRESQL
  // ============================================================

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

      console.log(
        "Notificaciones - estudiantes:",
        respuestaEstudiantes.data
      );

      console.log(
        "Notificaciones - matrículas:",
        respuestaMatriculas.data
      );

      console.log(
        "Notificaciones - pagos:",
        respuestaPagos.data
      );

      console.log(
        "Notificaciones - documentos:",
        respuestaDocumentos.data
      );

    } catch (error) {

      console.error(
        "Error al cargar notificaciones:",
        error
      );
    }
  };


  // ============================================================
  // CÁLCULOS
  // ============================================================

  const totalEstudiantes =
    estudiantes.length;

  const totalPagos =
    pagos.length;

  const totalDocumentos =
    documentos.length;


  // Matrículas pendientes
  const matriculasPendientes =
    matriculas.filter((matricula) => {

      const estado =
        (matricula.estado || "")
          .toLowerCase();

      return estado === "pendiente";

    }).length;


  // Matrículas activas / matriculadas
  const matriculasActivas =
    matriculas.filter((matricula) => {

      const estado =
        (matricula.estado || "")
          .toLowerCase();

      return (
        estado === "matriculado" ||
        estado === "activo" ||
        estado === "activa"
      );

    }).length;


  // ============================================================
  // NOTIFICACIONES DINÁMICAS
  // ============================================================

  const notificationsList = [

    {
      id: 1,

      title:
        `${totalEstudiantes} estudiante${totalEstudiantes !== 1 ? "s" : ""} registrado${totalEstudiantes !== 1 ? "s" : ""} en el sistema`,

      time: "Actualizado",

      iconClass:
        "bi bi-person-fill",

      iconColor: "#2563eb",

      borderColor: "#3b82f6",

      bg: "#eff6ff",

      textColor: "#1e3a8a",

      timeColor: "#60a5fa"
    },


    {
      id: 2,

      title:
        matriculasPendientes > 0
          ? `${matriculasPendientes} matrícula${matriculasPendientes !== 1 ? "s" : ""} pendiente${matriculasPendientes !== 1 ? "s" : ""}`
          : "No hay matrículas pendientes",

      time: "Actualizado",

      iconClass:
        matriculasPendientes > 0
          ? "bi bi-exclamation-triangle-fill"
          : "bi bi-check-square-fill",

      iconColor:
        matriculasPendientes > 0
          ? "#d97706"
          : "#16a34a",

      borderColor:
        matriculasPendientes > 0
          ? "#f59e0b"
          : "#22c55e",

      bg:
        matriculasPendientes > 0
          ? "#fef9c3"
          : "#dcfce7",

      textColor:
        matriculasPendientes > 0
          ? "#713f12"
          : "#14532d",

      timeColor:
        matriculasPendientes > 0
          ? "#a16207"
          : "#4ade80"
    },


    {
      id: 3,

      title:
        `${matriculasActivas} matrícula${matriculasActivas !== 1 ? "s" : ""} activa${matriculasActivas !== 1 ? "s" : ""}`,

      time: "Actualizado",

      iconClass:
        "bi bi-clipboard-check-fill",

      iconColor: "#16a34a",

      borderColor: "#22c55e",

      bg: "#dcfce7",

      textColor: "#14532d",

      timeColor: "#4ade80"
    },


    {
      id: 4,

      title:
        `${totalPagos} pago${totalPagos !== 1 ? "s" : ""} registrado${totalPagos !== 1 ? "s" : ""}`,

      time: "Actualizado",

      iconClass:
        "bi bi-credit-card-fill",

      iconColor: "#d97706",

      borderColor: "#f59e0b",

      bg: "#fef9c3",

      textColor: "#713f12",

      timeColor: "#a16207"
    },


    {
      id: 5,

      title:
        `${totalDocumentos} documento${totalDocumentos !== 1 ? "s" : ""} registrado${totalDocumentos !== 1 ? "s" : ""}`,

      time: "Actualizado",

      iconClass:
        "bi bi-folder-fill",

      iconColor: "#dc2626",

      borderColor: "#ef4444",

      bg: "#ffe4e6",

      textColor: "#881337",

      timeColor: "#9f1239"
    }

  ];


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <div
      className="bg-white p-4 shadow-sm border-0"
      style={{
        borderRadius: "20px"
      }}
    >

      {/* ENCABEZADO */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5
          className="fw-bold m-0"
          style={{
            color: "#1e293b",
            fontSize: "18px"
          }}
        >
          Notificaciones
        </h5>


        <span
          className="px-3 py-1 rounded-pill small fw-bold"
          style={{
            backgroundColor: "#ffe4e6",
            color: "#e11d48",
            fontSize: "12px"
          }}
        >
          {notificationsList.length} novedades
        </span>

      </div>


      {/* LISTA DE NOTIFICACIONES */}

      <div className="d-flex flex-column gap-2">

        {notificationsList.map((item) => (

          <div
            key={item.id}
            className="p-3 d-flex align-items-start gap-3"
            style={{
              backgroundColor:
                item.bg,

              borderLeft:
                `5px solid ${item.borderColor}`,

              borderRadius:
                "14px"
            }}
          >

            {/* ÍCONO */}

            <div
              className="mt-1"
              style={{
                fontSize: "18px",
                color: item.iconColor
              }}
            >

              <i
                className={item.iconClass}
              ></i>

            </div>


            {/* TEXTO */}

            <div className="d-flex flex-column">

              <span
                className="fw-semibold"
                style={{
                  color:
                    item.textColor,

                  fontSize:
                    "13px",

                  lineHeight:
                    "1.3"
                }}
              >

                {item.title}

              </span>


              <small
                style={{
                  color:
                    item.timeColor,

                  fontSize:
                    "12px",

                  marginTop:
                    "3px"
                }}
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