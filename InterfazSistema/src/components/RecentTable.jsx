import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function RecentTable() {

  const [matriculas, setMatriculas] = useState([]);
  const [apoderados, setApoderados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);

      const [
        respuestaMatriculas,
        respuestaApoderados
      ] = await Promise.all([
        api.get("/matriculas"),
        api.get("/apoderados")
      ]);

      console.log(
        "Matrículas recientes:",
        respuestaMatriculas.data
      );

      console.log(
        "Apoderados:",
        respuestaApoderados.data
      );

      setMatriculas(respuestaMatriculas.data);
      setApoderados(respuestaApoderados.data);

    } catch (error) {
      console.error(
        "Error al cargar matrículas recientes:",
        error
      );
    } finally {
      setCargando(false);
    }
  };

  // ============================================================
  // FORMATEAR FECHA
  // ============================================================

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";

    const fechaObj = new Date(`${fecha}T00:00:00`);

    return fechaObj.toLocaleDateString("es-PE");
  };

  // ============================================================
  // GENERAR CÓDIGO VISUAL
  // ============================================================

  const generarCodigo = (matricula) => {
    const anio = matricula.anio || "----";

    return `MAT-${anio}-${String(matricula.id).padStart(3, "0")}`;
  };

  // ============================================================
  // OBTENER APODERADO
  // ============================================================
  //
  // Tu endpoint /api/matriculas actualmente no devuelve
  // id_apoderado, por eso intentamos obtenerlo desde el
  // objeto estudiante si Flask lo incluye.
  //
  // Si no viene, mostraremos "No disponible".
  // ============================================================

  const obtenerNombreApoderado = (matricula) => {

    const idApoderado =
      matricula.estudiante?.id_apoderado;

    if (!idApoderado) {
      return "No disponible";
    }

    const apoderado = apoderados.find(
      (a) =>
        Number(a.id) === Number(idApoderado)
    );

    if (!apoderado) {
      return "No disponible";
    }

    return `${apoderado.nombres} ${apoderado.apellidos}`;
  };

  // ============================================================
  // COLOR SEGÚN ESTADO
  // ============================================================

  const obtenerColorEstado = (estado) => {

    const estadoNormalizado =
      (estado || "").toLowerCase();

    if (
      estadoNormalizado === "matriculado" ||
      estadoNormalizado === "activo" ||
      estadoNormalizado === "activa"
    ) {
      return "#16a34a";
    }

    if (estadoNormalizado === "pendiente") {
      return "#d97706";
    }

    if (
      estadoNormalizado === "observado" ||
      estadoNormalizado === "observada"
    ) {
      return "#dc2626";
    }

    return "#64748b";
  };

  // ============================================================
  // MATRÍCULAS RECIENTES
  // ============================================================
  //
  // Ordenamos por ID descendente y mostramos máximo 7.
  // ============================================================

  const matriculasRecientes = [...matriculas]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 7);

  return (
    <div
      className="bg-white p-4 shadow-sm border-0"
      style={{ borderRadius: "20px" }}
    >

      {/* Encabezado */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5
          className="fw-bold m-0"
          style={{
            color: "#1e293b",
            fontSize: "18px"
          }}
        >
          Matrículas Recientes
        </h5>

        <button
          type="button"
          className="btn btn-sm px-3 py-1 fw-bold border-0"
          style={{
            backgroundColor: "#eff6ff",
            color: "#2563eb",
            borderRadius: "20px",
            fontSize: "13px"
          }}
          onClick={cargarDatos}
        >
          Actualizar
        </button>

      </div>


      {/* Contenedor de Scroll */}

      <div
        style={{
          width: "100%",
          overflowX: "auto"
        }}
      >

        <table
          className="table table-borderless align-middle m-0"
          style={{ minWidth: "780px" }}
        >

          <thead>

            <tr
              style={{
                backgroundColor: "#f8fafc"
              }}
            >

              <th
                style={{
                  width: "140px",
                  whiteSpace: "nowrap",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px"
                }}
                className="py-2 px-3 text-muted small fw-bold"
              >
                CÓDIGO
              </th>

              <th
                style={{
                  width: "180px",
                  whiteSpace: "nowrap"
                }}
                className="py-2 px-3 text-muted small fw-bold"
              >
                ESTUDIANTE
              </th>

              <th
                style={{
                  width: "150px",
                  whiteSpace: "nowrap"
                }}
                className="py-2 px-3 text-muted small fw-bold"
              >
                APODERADO
              </th>

              <th
                style={{
                  width: "70px",
                  whiteSpace: "nowrap"
                }}
                className="py-2 px-3 text-muted small fw-bold text-center"
              >
                GRADO
              </th>

              <th
                style={{
                  width: "60px",
                  whiteSpace: "nowrap"
                }}
                className="py-2 px-3 text-muted small fw-bold text-center"
              >
                SEC.
              </th>

              <th
                style={{
                  width: "100px",
                  whiteSpace: "nowrap"
                }}
                className="py-2 px-3 text-muted small fw-bold text-center"
              >
                ESTADO
              </th>

              <th
                style={{
                  width: "110px",
                  whiteSpace: "nowrap",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px"
                }}
                className="py-2 px-3 text-muted small fw-bold text-end"
              >
                FECHA
              </th>

            </tr>

          </thead>

          <tbody>

            {cargando ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-5 text-muted"
                >
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></div>

                  Cargando matrículas...
                </td>

              </tr>

            ) : matriculasRecientes.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-5 text-muted"
                >
                  No hay matrículas registradas.
                </td>

              </tr>

            ) : (

              matriculasRecientes.map((row) => {

                const estudiante =
                  row.estudiante
                    ? `${row.estudiante.nombres} ${row.estudiante.apellidos}`
                    : "No disponible";

                const grado =
                  row.grado_seccion?.grado || "-";

                const seccion =
                  row.grado_seccion?.seccion || "-";

                const apoderado =
                  obtenerNombreApoderado(row);

                const statusColor =
                  obtenerColorEstado(row.estado);

                return (

                  <tr
                    key={row.id}
                    style={{
                      borderBottom:
                        "1px solid #f1f5f9"
                    }}
                  >

                    <td
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "13px"
                      }}
                      className="py-3 px-3 text-muted"
                    >
                      {generarCodigo(row)}
                    </td>

                    <td
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "13px",
                        color: "#1e293b"
                      }}
                      className="py-3 px-3 fw-bold"
                    >
                      {estudiante}
                    </td>

                    <td
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "13px"
                      }}
                      className="py-3 px-3 text-secondary"
                    >
                      {apoderado}
                    </td>

                    <td
                      style={{ fontSize: "13px" }}
                      className="py-3 px-3 text-center"
                    >
                      {grado}
                    </td>

                    <td
                      style={{ fontSize: "13px" }}
                      className="py-3 px-3 text-center"
                    >
                      {seccion}
                    </td>

                    <td
                      style={{ fontSize: "13px" }}
                      className="py-3 px-3 text-center"
                    >
                      <span
                        className="fw-bold"
                        style={{
                          color: statusColor
                        }}
                      >
                        {row.estado || "-"}
                      </span>
                    </td>

                    <td
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "13px"
                      }}
                      className="py-3 px-3 text-muted text-end"
                    >
                      {formatearFecha(row.fecha)}
                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}