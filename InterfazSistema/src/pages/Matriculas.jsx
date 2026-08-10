import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";


export default function Matriculas() {

  // ============================================================
  // ESTADOS PRINCIPALES
  // ============================================================

  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [gradosSecciones, setGradosSecciones] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");


  // ============================================================
  // FORMULARIO
  // ============================================================

  const [formData, setFormData] = useState({

    idMatricula: "",

    anioEscolar:
      String(new Date().getFullYear()),

    fechaMatricula:
      new Date().toISOString().split("T")[0],

    estadoMatricula: "Pendiente",

    estudiante: "",

    grado: "",

    seccion: ""

  });


  // ============================================================
  // ESTADOS DE MATRÍCULA
  // ============================================================

  const estadosVisuales = [

    {
      id: "Pendiente",
      label: "Pendiente",
      icon: "⌛",
      activeBg: "#fef9c3",
      borderColor: "#f59e0b",
      textColor: "#b45309"
    },

    {
      id: "Aprobada",
      label: "Aprobada",
      icon: "✅",
      activeBg: "#dcfce7",
      borderColor: "#22c55e",
      textColor: "#166534"
    },

    {
      id: "Rechazada",
      label: "Rechazada",
      icon: "❌",
      activeBg: "#ffe4e6",
      borderColor: "#ef4444",
      textColor: "#be123c"
    },

    {
      id: "Anulada",
      label: "Anulada",
      icon: "🚫",
      activeBg: "#f1f5f9",
      borderColor: "#94a3b8",
      textColor: "#475569"
    }

  ];


  // ============================================================
  // CARGAR DATOS DESDE FLASK
  // ============================================================

  const cargarDatos = async () => {

    try {

      setCargando(true);


      const [
        respuestaMatriculas,
        respuestaEstudiantes,
        respuestaGrados
      ] = await Promise.all([

        api.get("/matriculas"),

        api.get("/estudiantes"),

        api.get("/grados")

      ]);


      console.log(
        "Matrículas:",
        respuestaMatriculas.data
      );

      console.log(
        "Estudiantes:",
        respuestaEstudiantes.data
      );

      console.log(
        "Grados:",
        respuestaGrados.data
      );


      setMatriculas(
        respuestaMatriculas.data
      );


      setEstudiantes(
        respuestaEstudiantes.data
      );


      setGradosSecciones(
        respuestaGrados.data
      );


    } catch (error) {

      console.error(
        "Error al cargar matrículas:",
        error
      );

    } finally {

      setCargando(false);

    }

  };


  // ============================================================
  // EJECUTAR AL ABRIR
  // ============================================================

  useEffect(() => {

    cargarDatos();

  }, []);


  // ============================================================
  // CAMBIOS DEL FORMULARIO
  // ============================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((anterior) => ({

      ...anterior,

      [name]: value,

      ...(name === "grado"
        ? { seccion: "" }
        : {})

    }));

  };


  // ============================================================
  // LIMPIAR FORMULARIO
  // ============================================================

  const limpiarFormulario = () => {

    setFormData({

      idMatricula: "",

      anioEscolar:
        String(new Date().getFullYear()),

      fechaMatricula:
        new Date().toISOString().split("T")[0],

      estadoMatricula: "Pendiente",

      estudiante: "",

      grado: "",

      seccion: ""

    });

  };


  // ============================================================
  // ID VISUAL
  // ============================================================

  const generarIdVisual = () => {

    const ids = matriculas.map(
      (m) => Number(m.id) || 0
    );


    const siguiente =

      ids.length > 0

        ? Math.max(...ids) + 1

        : 1;


    return `MAT-${formData.anioEscolar}-${String(
      siguiente
    ).padStart(3, "0")}`;

  };


  // ============================================================
  // GRADOS ÚNICOS
  // ============================================================

  const gradosDisponibles = useMemo(() => {

    const grados = gradosSecciones.map(
      (gs) => gs.grado
    );


    return [
      ...new Set(grados)
    ];

  }, [gradosSecciones]);


  // ============================================================
  // SECCIONES SEGÚN EL GRADO
  // ============================================================

  const seccionesDisponibles = useMemo(() => {

    if (!formData.grado) {

      return [];

    }


    return gradosSecciones.filter(

      (gs) =>
        String(gs.grado) ===
        String(formData.grado)

    );

  }, [
    gradosSecciones,
    formData.grado
  ]);


  // ============================================================
  // GUARDAR / ACTUALIZAR
  // ============================================================

  const handleGuardar = async (e) => {

    e.preventDefault();


    try {


      // ========================================================
      // VALIDACIONES
      // ========================================================

      if (!formData.anioEscolar) {

        alert(
          "Ingresa el año escolar."
        );

        return;

      }


      if (!formData.fechaMatricula) {

        alert(
          "Selecciona la fecha de matrícula."
        );

        return;

      }


      if (!formData.estudiante) {

        alert(
          "Selecciona un estudiante."
        );

        return;

      }


      if (!formData.grado) {

        alert(
          "Selecciona un grado."
        );

        return;

      }


      if (!formData.seccion) {

        alert(
          "Selecciona una sección."
        );

        return;

      }


      // ========================================================
      // EDITAR
      // ========================================================
      //
      // Tu DAO actualmente solo permite actualizar el ESTADO.
      //
      // ========================================================

      if (formData.idMatricula) {


        await api.put(

          `/matriculas/${formData.idMatricula}`,

          {
            estado:
              formData.estadoMatricula
          }

        );


        alert(
          "Estado de la matrícula actualizado correctamente."
        );


      } else {


        // ======================================================
        // BUSCAR ID DE GRADO/SECCIÓN
        // ======================================================

        const gradoSeccionSeleccionado =
          gradosSecciones.find(

            (gs) =>

              String(gs.grado) ===
                String(formData.grado)

              &&

              String(gs.seccion) ===
                String(formData.seccion)

          );


        if (!gradoSeccionSeleccionado) {

          alert(
            "No se encontró el grado y sección seleccionados."
          );

          return;

        }


        // ======================================================
        // REGISTRAR
        // ======================================================

        const nuevaMatricula = {

          anio:
            Number(formData.anioEscolar),

          fecha:
            formData.fechaMatricula,

          estado:
            formData.estadoMatricula,

          id_estudiante:
            Number(formData.estudiante),

          id_grado_seccion:
            Number(
              gradoSeccionSeleccionado.id
            )

        };


        console.log(
          "Matrícula enviada:",
          nuevaMatricula
        );


        await api.post(
          "/matriculas",
          nuevaMatricula
        );


        alert(
          "Matrícula registrada correctamente."
        );

      }


      // ========================================================
      // ACTUALIZAR INTERFAZ
      // ========================================================

      limpiarFormulario();

      await cargarDatos();


    } catch (error) {


      console.error(
        "Error al guardar matrícula:",
        error
      );


      alert(

        error.response?.data?.mensaje ||

        "No se pudo guardar la matrícula."

      );

    }

  };


  // ============================================================
  // EDITAR MATRÍCULA
  // ============================================================

  const editarMatricula = (matricula) => {


    setFormData({

      idMatricula:
        matricula.id,

      anioEscolar:
        String(matricula.anio || ""),

      fechaMatricula:
        matricula.fecha || "",

      estadoMatricula:
        matricula.estado || "Pendiente",

      estudiante:
        String(
          matricula.estudiante?.id || ""
        ),

      grado:
        String(
          matricula.grado_seccion?.grado || ""
        ),

      seccion:
        String(
          matricula.grado_seccion?.seccion || ""
        )

    });


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // ============================================================
  // ELIMINAR MATRÍCULA
  // ============================================================

  const eliminarMatricula = async (id) => {


    const confirmar = window.confirm(
      "¿Deseas eliminar esta matrícula?"
    );


    if (!confirmar) {

      return;

    }


    try {


      await api.delete(
        `/matriculas/${id}`
      );


      alert(
        "Matrícula eliminada correctamente."
      );


      if (
        Number(formData.idMatricula) ===
        Number(id)
      ) {

        limpiarFormulario();

      }


      await cargarDatos();


    } catch (error) {


      console.error(
        "Error al eliminar matrícula:",
        error
      );


      alert(

        error.response?.data?.mensaje ||

        "No se pudo eliminar la matrícula. Puede tener pagos relacionados."

      );

    }

  };


  // ============================================================
  // INICIALES DEL ESTUDIANTE
  // ============================================================

  const obtenerIniciales = (
    nombres,
    apellidos
  ) => {


    const n =
      nombres?.trim()?.charAt(0) || "";


    const a =
      apellidos?.trim()?.charAt(0) || "";


    return (
      n + a
    ).toUpperCase();

  };


  // ============================================================
  // FORMATEAR FECHA
  // ============================================================

  const formatearFecha = (fecha) => {


    if (!fecha) {

      return "-";

    }


    const objFecha =
      new Date(
        `${fecha}T00:00:00`
      );


    return objFecha.toLocaleDateString(
      "es-PE",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  // ============================================================
  // ESTILO DEL ESTADO
  // ============================================================

  const obtenerEstadoVisual = (
    estado
  ) => {


    const encontrado =
      estadosVisuales.find(

        (item) =>
          item.id === estado

      );


    return encontrado || {

      icon: "•",
      activeBg: "#f1f5f9",
      textColor: "#475569"

    };

  };


  // ============================================================
  // FILTRO DE MATRÍCULAS
  // ============================================================

  const matriculasFiltradas =
    useMemo(() => {


      return matriculas.filter(
        (m) => {


          const coincideEstado =

            filtroEstado === "Todos"

            ||

            m.estado === filtroEstado;


          const texto =
            busqueda
              .trim()
              .toLowerCase();


          const nombreCompleto =

            `${m.estudiante?.nombres || ""} ${m.estudiante?.apellidos || ""}`

              .toLowerCase();


          const coincideBusqueda =

            texto === ""

            ||

            String(m.id || "")
              .includes(texto)

            ||

            String(
              m.estudiante?.dni || ""
            )
              .toLowerCase()
              .includes(texto)

            ||

            nombreCompleto
              .includes(texto);


          return (

            coincideEstado

            &&

            coincideBusqueda

          );

        }
      );


    }, [
      matriculas,
      filtroEstado,
      busqueda
    ]);


  // ============================================================
  // MÉTRICAS
  // ============================================================

  const totalMatriculas =
    matriculas.length;


  const aprobadas =
    matriculas.filter(
      (m) =>
        m.estado === "Aprobada"
    ).length;


  const pendientes =
    matriculas.filter(
      (m) =>
        m.estado === "Pendiente"
    ).length;


  const rechazadasAnuladas =
    matriculas.filter(

      (m) =>

        m.estado === "Rechazada"

        ||

        m.estado === "Anulada"

    ).length;


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <div className="d-flex flex-column gap-4">


      {/* ======================================================
          1. ENCABEZADO
      ====================================================== */}

      <div className="d-flex justify-content-between align-items-center">


        <div className="d-flex align-items-center gap-3">


          <div
            className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#eff6ff",
              fontSize: "24px"
            }}
          >
            📋
          </div>


          <div>


            <h3
              className="fw-bold m-0"
              style={{
                color: "#0f172a",
                fontSize: "22px"
              }}
            >
              Gestión de Matrículas
            </h3>


            <span className="text-muted small">

              Control y seguimiento de matrículas · Año Escolar{" "}

              {new Date().getFullYear()}

            </span>


          </div>


        </div>


        <div className="d-flex gap-2">


          <span
            className="px-3 py-2 rounded-pill small fw-semibold"
            style={{
              backgroundColor: "#dcfce7",
              color: "#15803d"
            }}
          >
            {aprobadas} aprobadas
          </span>


          <span
            className="px-3 py-2 rounded-pill small fw-semibold"
            style={{
              backgroundColor: "#fef3c7",
              color: "#b45309"
            }}
          >
            {pendientes} pendientes
          </span>


        </div>


      </div>


      {/* ======================================================
          2. MÉTRICAS
      ====================================================== */}

      <div className="row g-3">


        {/* TOTAL */}

        <div className="col-12 col-sm-6 col-xl-3">


          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">


            <div className="d-flex justify-content-between align-items-center">


              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#eff6ff",
                  fontSize: "18px"
                }}
              >
                📋
              </div>


              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb"
                }}
              >
                registradas
              </span>


            </div>


            <div>


              <h2
                className="fw-bold m-0"
                style={{
                  color: "#1d3b8f"
                }}
              >
                {totalMatriculas}
              </h2>


              <small className="text-muted">
                Total matrículas
              </small>


            </div>


          </div>


        </div>


        {/* APROBADAS */}

        <div className="col-12 col-sm-6 col-xl-3">


          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">


            <div className="d-flex justify-content-between align-items-center">


              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#dcfce7",
                  fontSize: "18px"
                }}
              >
                ✅
              </div>


              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#dcfce7",
                  color: "#16a34a"
                }}
              >
                activas
              </span>


            </div>


            <div>


              <h2
                className="fw-bold m-0"
                style={{
                  color: "#16a34a"
                }}
              >
                {aprobadas}
              </h2>


              <small className="text-muted">
                Matrículas aprobadas
              </small>


            </div>


          </div>


        </div>


        {/* PENDIENTES */}

        <div className="col-12 col-sm-6 col-xl-3">


          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">


            <div className="d-flex justify-content-between align-items-center">


              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#fef3c7",
                  fontSize: "18px"
                }}
              >
                ⌛
              </div>


              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#d97706"
                }}
              >
                en revisión
              </span>


            </div>


            <div>


              <h2
                className="fw-bold m-0"
                style={{
                  color: "#d97706"
                }}
              >
                {pendientes}
              </h2>


              <small className="text-muted">
                Pendientes de aprobación
              </small>


            </div>


          </div>


        </div>


        {/* RECHAZADAS / ANULADAS */}

        <div className="col-12 col-sm-6 col-xl-3">


          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">


            <div className="d-flex justify-content-between align-items-center">


              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#ffe4e6",
                  fontSize: "18px"
                }}
              >
                ❌
              </div>


              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#ffe4e6",
                  color: "#e11d48"
                }}
              >
                no activas
              </span>


            </div>


            <div>


              <h2
                className="fw-bold m-0"
                style={{
                  color: "#dc2626"
                }}
              >
                {rechazadasAnuladas}
              </h2>


              <small className="text-muted">
                Rechazadas / Anuladas
              </small>


            </div>


          </div>


        </div>


      </div>


      {/* ======================================================
          3. FORMULARIO
      ====================================================== */}

      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">


        <div className="d-flex justify-content-between align-items-center mb-4">


          <div className="d-flex align-items-center gap-2">


            <div
              style={{
                width: "4px",
                height: "20px",
                backgroundColor: "#1d3b8f",
                borderRadius: "2px"
              }}
            ></div>


            <h5
              className="fw-bold m-0"
              style={{
                color: "#0f172a"
              }}
            >
              Gestión de Matrículas
            </h5>


          </div>


          <button
            type="button"
            onClick={limpiarFormulario}
            className="btn btn-link p-0 text-decoration-none fw-semibold"
            style={{
              color: "#1d3b8f",
              fontSize: "14px"
            }}
          >
            Nueva Matrícula
          </button>


        </div>


        <form onSubmit={handleGuardar}>


          <div className="row g-3">


            {/* ID */}

            <div className="col-12 col-md-6">


              <label className="form-label text-uppercase fw-bold text-muted">
                ID DE MATRÍCULA
              </label>


              <input
                type="text"
                className="form-control bg-light border-0 fw-bold"
                style={{
                  color: "#1d3b8f"
                }}
                value={
                  formData.idMatricula

                    ? `MAT-${formData.anioEscolar}-${String(
                        formData.idMatricula
                      ).padStart(3, "0")}`

                    : generarIdVisual()
                }
                readOnly
              />


            </div>


            {/* AÑO */}

            <div className="col-12 col-md-6">


              <label className="form-label text-uppercase fw-bold text-muted">
                AÑO ESCOLAR{" "}
                <span className="text-danger">*</span>
              </label>


              <input
                type="number"
                name="anioEscolar"
                className="form-control bg-light border-0"
                value={formData.anioEscolar}
                onChange={handleChange}
                disabled={
                  Boolean(
                    formData.idMatricula
                  )
                }
              />


            </div>


            {/* FECHA */}

            <div className="col-12 col-md-6">


              <label className="form-label text-uppercase fw-bold text-muted">
                FECHA DE MATRÍCULA{" "}
                <span className="text-danger">*</span>
              </label>


              <input
                type="date"
                name="fechaMatricula"
                className="form-control bg-light border-0"
                value={formData.fechaMatricula}
                onChange={handleChange}
                disabled={
                  Boolean(
                    formData.idMatricula
                  )
                }
              />


            </div>


            {/* ESTADO */}

            <div className="col-12 col-md-6">


              <label className="form-label text-uppercase fw-bold text-muted">
                ESTADO DE LA MATRÍCULA{" "}
                <span className="text-danger">*</span>
              </label>


              <select
                name="estadoMatricula"
                className="form-select bg-light border-0"
                value={formData.estadoMatricula}
                onChange={handleChange}
              >


                {estadosVisuales.map(
                  (estado) => (

                    <option
                      key={estado.id}
                      value={estado.id}
                    >
                      {estado.label}
                    </option>

                  )
                )}


              </select>


            </div>


            {/* ESTUDIANTE */}

            <div className="col-12">


              <label className="form-label text-uppercase fw-bold text-muted">
                ESTUDIANTE{" "}
                <span className="text-danger">*</span>
              </label>


              <select
                name="estudiante"
                className="form-select bg-light border-0"
                value={formData.estudiante}
                onChange={handleChange}
                disabled={
                  Boolean(
                    formData.idMatricula
                  )
                }
              >


                <option value="">
                  — Seleccionar estudiante —
                </option>


                {estudiantes.map(
                  (estudiante) => (

                    <option
                      key={estudiante.id}
                      value={estudiante.id}
                    >

                      {estudiante.nombres}{" "}
                      {estudiante.apellidos}{" "}
                      ({estudiante.dni})

                    </option>

                  )
                )}


              </select>


            </div>


            {/* GRADO */}

            <div className="col-12 col-md-6">


              <label className="form-label text-uppercase fw-bold text-muted">
                GRADO{" "}
                <span className="text-danger">*</span>
              </label>


              <select
                name="grado"
                className="form-select bg-light border-0"
                value={formData.grado}
                onChange={handleChange}
                disabled={
                  Boolean(
                    formData.idMatricula
                  )
                }
              >


                <option value="">
                  — Seleccionar grado —
                </option>


                {gradosDisponibles.map(
                  (grado) => (

                    <option
                      key={grado}
                      value={grado}
                    >
                      {grado}
                    </option>

                  )
                )}


              </select>


            </div>


            {/* SECCIÓN */}

            <div className="col-12 col-md-6">


              <label className="form-label text-uppercase fw-bold text-muted">
                SECCIÓN{" "}
                <span className="text-danger">*</span>
              </label>


              <select
                name="seccion"
                className="form-select bg-light border-0"
                value={formData.seccion}
                onChange={handleChange}
                disabled={
                  !formData.grado ||
                  Boolean(
                    formData.idMatricula
                  )
                }
              >


                <option value="">
                  — Seleccionar sección —
                </option>


                {seccionesDisponibles.map(
                  (gs) => (

                    <option
                      key={gs.id}
                      value={gs.seccion}
                    >
                      Sección {gs.seccion}
                    </option>

                  )
                )}


              </select>


            </div>


            {/* ESTADO VISUAL */}

            <div className="col-12">


              <label className="form-label text-uppercase fw-bold text-muted">
                ESTADO
              </label>


              <div className="row g-2">


                {estadosVisuales.map(
                  (estado) => {


                    const seleccionado =

                      formData.estadoMatricula ===
                      estado.id;


                    return (

                      <div
                        key={estado.id}
                        className="col-12 col-sm-6 col-md-3"
                      >


                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              estadoMatricula:
                                estado.id
                            })
                          }
                          className="btn w-100 py-3 d-flex flex-column align-items-center justify-content-center gap-1 rounded-3"
                          style={{

                            backgroundColor:
                              seleccionado
                                ? estado.activeBg
                                : "#f8fafc",

                            border:
                              seleccionado
                                ? `2px solid ${estado.borderColor}`
                                : "1px solid #e2e8f0",

                            color:
                              seleccionado
                                ? estado.textColor
                                : "#64748b"

                          }}
                        >


                          <span
                            style={{
                              fontSize: "18px"
                            }}
                          >
                            {estado.icon}
                          </span>


                          <span
                            className="fw-bold"
                            style={{
                              fontSize: "13px"
                            }}
                          >
                            {estado.label}
                          </span>


                        </button>


                      </div>

                    );

                  }
                )}


              </div>


            </div>


          </div>


          {/* BOTONES */}

          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">


            <div className="d-flex gap-2 flex-wrap">


              <button
                type="button"
                onClick={limpiarFormulario}
                className="btn px-3 py-2 rounded-3 fw-bold"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe"
                }}
              >
                + Nuevo
              </button>


              <button
                type="submit"
                className="btn px-4 py-2 rounded-3 fw-bold text-white"
                style={{
                  backgroundColor: "#10b981",
                  border: "none"
                }}
              >

                <i className="bi bi-floppy me-2"></i>

                {formData.idMatricula
                  ? "Actualizar Estado"
                  : "Guardar"}

              </button>


            </div>


            <button
              type="button"
              onClick={limpiarFormulario}
              className="btn px-3 py-2 rounded-3 text-secondary border"
            >
              ✕ Cancelar
            </button>


          </div>


        </form>


      </div>


      {/* ======================================================
          4. HISTORIAL
      ====================================================== */}

      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">


        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">


          <div className="d-flex align-items-center gap-2">


            <div
              style={{
                width: "4px",
                height: "20px",
                backgroundColor: "#1d3b8f",
                borderRadius: "2px"
              }}
            ></div>


            <h5
              className="fw-bold m-0"
              style={{
                color: "#0f172a"
              }}
            >
              Historial de Matrículas
            </h5>


            <span className="badge rounded-pill bg-light text-primary border">
              {matriculasFiltradas.length}
            </span>


          </div>


          <div className="d-flex align-items-center gap-2 flex-wrap">


            {/* FILTROS */}

            <div className="d-flex gap-1 bg-light p-1 rounded-pill border">


              {[
                "Todos",
                "Pendiente",
                "Aprobada",
                "Rechazada",
                "Anulada"
              ].map((tab) => {


                const activo =
                  filtroEstado === tab;


                return (

                  <button
                    key={tab}
                    type="button"
                    onClick={() =>
                      setFiltroEstado(tab)
                    }
                    className="btn btn-sm rounded-pill fw-semibold border-0 px-3"
                    style={{
                      backgroundColor:
                        activo
                          ? "#1d3b8f"
                          : "transparent",

                      color:
                        activo
                          ? "#ffffff"
                          : "#64748b",

                      fontSize:
                        "12px"
                    }}
                  >
                    {tab}
                  </button>

                );

              })}


            </div>


            {/* BÚSQUEDA */}

            <input
              type="text"
              className="form-control form-control-sm rounded-pill"
              placeholder="Buscar matrícula..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
              style={{
                width: "200px"
              }}
            />


          </div>


        </div>


        {/* TABLA */}

        <div className="table-responsive">


          <table
            className="table table-borderless align-middle m-0"
            style={{
              minWidth: "1050px"
            }}
          >


            <thead>


              <tr
                style={{
                  backgroundColor: "#f8fafc"
                }}
              >


                <th className="py-3 px-3 text-muted small fw-bold">
                  ID
                </th>

                <th className="py-3 px-3 text-muted small fw-bold">
                  AÑO
                </th>

                <th className="py-3 px-3 text-muted small fw-bold">
                  FECHA
                </th>

                <th className="py-3 px-3 text-muted small fw-bold">
                  ESTADO
                </th>

                <th className="py-3 px-3 text-muted small fw-bold">
                  ESTUDIANTE
                </th>

                <th className="py-3 px-3 text-muted small fw-bold text-center">
                  GRADO
                </th>

                <th className="py-3 px-3 text-muted small fw-bold text-center">
                  SECCIÓN
                </th>

                <th className="py-3 px-3 text-muted small fw-bold text-center">
                  ACCIONES
                </th>


              </tr>


            </thead>


            <tbody>


              {cargando ? (


                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-5 text-muted"
                  >
                    Cargando matrículas...
                  </td>

                </tr>


              ) : matriculasFiltradas.length === 0 ? (


                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-5 text-muted"
                  >
                    No hay matrículas registradas.
                  </td>

                </tr>


              ) : (


                matriculasFiltradas.map(
                  (m) => {


                    const estado =
                      obtenerEstadoVisual(
                        m.estado
                      );


                    return (


                      <tr
                        key={m.id}
                        style={{
                          borderBottom:
                            "1px solid #f1f5f9"
                        }}
                      >


                        {/* ID */}

                        <td
                          className="py-3 px-3 fw-bold"
                          style={{
                            color: "#1d3b8f"
                          }}
                        >

                          MAT-{m.anio}-{String(
                            m.id
                          ).padStart(3, "0")}

                        </td>


                        {/* AÑO */}

                        <td className="py-3 px-3 text-secondary">
                          {m.anio}
                        </td>


                        {/* FECHA */}

                        <td className="py-3 px-3 text-secondary">
                          {formatearFecha(
                            m.fecha
                          )}
                        </td>


                        {/* ESTADO */}

                        <td className="py-3 px-3">


                          <span
                            className="px-3 py-1 rounded-pill small fw-semibold"
                            style={{
                              backgroundColor:
                                estado.activeBg,

                              color:
                                estado.textColor
                            }}
                          >

                            {estado.icon}{" "}
                            {m.estado}

                          </span>


                        </td>


                        {/* ESTUDIANTE */}

                        <td className="py-3 px-3">


                          <div className="d-flex align-items-center gap-2">


                            <div
                              className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                              style={{
                                width: "32px",
                                height: "32px",
                                backgroundColor:
                                  "#2563eb"
                              }}
                            >

                              {obtenerIniciales(
                                m.estudiante?.nombres,
                                m.estudiante?.apellidos
                              )}

                            </div>


                            <div className="d-flex flex-column">


                              <span className="fw-bold">

                                {m.estudiante?.nombres}{" "}
                                {m.estudiante?.apellidos}

                              </span>


                              <small className="text-muted">

                                EST-{String(
                                  m.estudiante?.id || ""
                                ).padStart(3, "0")}

                              </small>


                            </div>


                          </div>


                        </td>


                        {/* GRADO */}

                        <td className="py-3 px-3 text-center">


                          <span
                            className="px-2 py-1 rounded fw-bold text-white"
                            style={{
                              backgroundColor:
                                "#2563eb"
                            }}
                          >
                            {m.grado_seccion?.grado}
                          </span>


                        </td>


                        {/* SECCIÓN */}

                        <td className="py-3 px-3 text-center">


                          <span
                            className="px-2 py-1 rounded fw-bold text-primary"
                            style={{
                              backgroundColor:
                                "#eff6ff"
                            }}
                          >
                            {m.grado_seccion?.seccion}
                          </span>


                        </td>


                        {/* ACCIONES */}

                        <td className="py-3 px-3 text-center">


                          <div className="d-flex justify-content-center gap-2">


                            <button
                              type="button"
                              onClick={() =>
                                editarMatricula(m)
                              }
                              className="btn btn-sm fw-semibold"
                              style={{
                                backgroundColor:
                                  "#eff6ff",

                                color:
                                  "#2563eb",

                                border:
                                  "none"
                              }}
                            >
                              <i className="bi bi-pencil-square me-1"></i>
                              Editar
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                eliminarMatricula(
                                  m.id
                                )
                              }
                              className="btn btn-sm fw-semibold"
                              style={{
                                backgroundColor:
                                  "#ffe4e6",

                                color:
                                  "#e11d48",

                                border:
                                  "none"
                              }}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Eliminar
                            </button>


                          </div>


                        </td>


                      </tr>


                    );

                  }
                )


              )}


            </tbody>


          </table>


        </div>


        {/* PIE */}

        <div className="mt-4 pt-2 border-top">


          <span
            className="text-muted small"
            style={{
              fontSize: "13px"
            }}
          >

            Mostrando {matriculasFiltradas.length} de{" "}
            {totalMatriculas} matrículas

          </span>


        </div>


      </div>


    </div>

  );

}