import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Apoderados() {

  // ============================================================
  // ESTADOS
  // ============================================================

  const [busquedaDni, setBusquedaDni] = useState("");
  const [busquedaTabla, setBusquedaTabla] = useState("");
  const [filtroParentesco, setFiltroParentesco] = useState("Todos");
  const [apoderados, setApoderados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [formData, setFormData] = useState({
    idApoderado: "",
    dni: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    parentesco: "Padre"
  });


  // ============================================================
  // TIPOS DE PARENTESCO
  // ============================================================

  const parentescosForm = [
    { id: "Padre", label: "Padre", icon: "👨" },
    { id: "Madre", label: "Madre", icon: "👩" },
    { id: "Abuelo(a)", label: "Abuelo(a)", icon: "👴" },
    { id: "Tío(a)", label: "Tío(a)", icon: "🧑" },
    { id: "Hermano(a)", label: "Hermano(a)", icon: "👦" },
    {
      id: "Tutor(a)",
      label: "Tutor(a)",
      iconClass: "bi bi-person-fill"
    },
    {
      id: "Otro",
      label: "Otro",
      iconClass: "bi bi-person-fill"
    }
  ];


  // ============================================================
  // CARGAR APODERADOS DESDE POSTGRESQL
  // ============================================================

  const cargarApoderados = async () => {

    try {

      setCargando(true);

      const respuesta = await api.get("/apoderados");

      console.log(
        "Apoderados recibidos:",
        respuesta.data
      );

      setApoderados(respuesta.data);

    } catch (error) {

      console.error(
        "Error al cargar apoderados:",
        error
      );

    } finally {

      setCargando(false);
    }
  };


  // ============================================================
  // CARGAR AL ABRIR LA PÁGINA
  // ============================================================

  useEffect(() => {
    cargarApoderados();
  }, []);


  // ============================================================
  // CAMBIOS DEL FORMULARIO
  // ============================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // ============================================================
  // LIMPIAR FORMULARIO
  // ============================================================

  const limpiarFormulario = () => {

    setFormData({
      idApoderado: "",
      dni: "",
      nombres: "",
      apellidos: "",
      telefono: "",
      correo: "",
      parentesco: "Padre"
    });

    setBusquedaDni("");
  };


  // ============================================================
  // GENERAR ID VISUAL
  // ============================================================

  const generarIdVisual = () => {

    const ids = apoderados.map(
      (a) => Number(a.id) || 0
    );

    const siguiente =
      ids.length > 0
        ? Math.max(...ids) + 1
        : 1;

    return `APO-${String(siguiente).padStart(3, "0")}`;
  };


  // ============================================================
  // REGISTRAR APODERADO
  // ============================================================

  const handleGuardar = async (e) => {
  e.preventDefault();

  try {

    // ========================================================
    // VALIDACIONES
    // ========================================================

    if (!formData.dni.trim()) {
      alert("Ingresa el DNI del apoderado.");
      return;
    }

    if (formData.dni.trim().length !== 8) {
      alert("El DNI debe tener 8 dígitos.");
      return;
    }

    if (!formData.nombres.trim()) {
      alert("Ingresa los nombres del apoderado.");
      return;
    }

    if (!formData.apellidos.trim()) {
      alert("Ingresa los apellidos del apoderado.");
      return;
    }

    if (!formData.telefono.trim()) {
      alert("Ingresa el teléfono del apoderado.");
      return;
    }

    if (!formData.parentesco) {
      alert("Selecciona el parentesco.");
      return;
    }


    // ========================================================
    // DATOS PARA FLASK
    // ========================================================

    const datosApoderado = {
      dni: formData.dni.trim(),
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      telefono: formData.telefono.trim(),
      email: formData.correo.trim(),
      parentesco: formData.parentesco
    };


    // ========================================================
    // EDITAR
    // ========================================================

    if (formData.idApoderado) {

      await api.put(
        `/apoderados/${formData.idApoderado}`,
        datosApoderado
      );

      alert("Apoderado actualizado correctamente.");

    }

    // ========================================================
    // REGISTRAR
    // ========================================================

    else {

      await api.post(
        "/apoderados",
        datosApoderado
      );

      alert("Apoderado registrado correctamente.");

    }


    // ========================================================
    // ACTUALIZAR INTERFAZ
    // ========================================================

    limpiarFormulario();

    await cargarApoderados();

  } catch (error) {

    console.error(
      "Error al guardar apoderado:",
      error
    );

    alert(
      error.response?.data?.mensaje ||
      "No se pudo guardar el apoderado."
    );
  }
};


  // ============================================================
  // BUSCAR POR DNI
  // ============================================================

  const buscarPorDni = () => {

    if (!busquedaDni.trim()) {

      alert("Ingresa un DNI.");
      return;
    }

    const encontrado = apoderados.find(
      (a) =>
        String(a.dni) === busquedaDni.trim()
    );

    if (!encontrado) {

      alert("No se encontró el apoderado.");
      return;
    }


    setFormData({
      idApoderado:
        `APO-${String(encontrado.id).padStart(3, "0")}`,

      dni:
        encontrado.dni || "",

      nombres:
        encontrado.nombres || "",

      apellidos:
        encontrado.apellidos || "",

      telefono:
        encontrado.telefono || "",

      correo:
        encontrado.email || "",

      parentesco:
        encontrado.parentesco || "Otro"
    });
  };


  // ============================================================
  // INICIALES
  // ============================================================

  const obtenerIniciales = (
    nombres,
    apellidos
  ) => {

    const nombre =
      nombres?.trim()?.charAt(0) || "";

    const apellido =
      apellidos?.trim()?.charAt(0) || "";

    return (
      nombre + apellido
    ).toUpperCase();
  };


  // ============================================================
  // ESTILO DEL PARENTESCO
  // ============================================================

  const obtenerEstiloParentesco = (
    parentesco
  ) => {

    switch (parentesco) {

      case "Padre":
        return {
          bg: "#eff6ff",
          color: "#1d4ed8",
          icon: "👨"
        };

      case "Madre":
        return {
          bg: "#ffe4e6",
          color: "#be123c",
          icon: "👩"
        };

      case "Abuelo(a)":
        return {
          bg: "#fef3c7",
          color: "#b45309",
          icon: "👴"
        };

      case "Tío(a)":
        return {
          bg: "#f3e8ff",
          color: "#7e22ce",
          icon: "🧑"
        };

      case "Hermano(a)":
        return {
          bg: "#ecfeff",
          color: "#0e7490",
          icon: "👦"
        };

      case "Tutor(a)":
        return {
          bg: "#e0f2fe",
          color: "#0369a1",
          icon: "👤"
        };

      default:
        return {
          bg: "#f1f5f9",
          color: "#475569",
          icon: "👤"
        };
    }
  };


  // ============================================================
  // FILTROS DE TABLA
  // ============================================================

  const apoderadosFiltrados = useMemo(() => {

    return apoderados.filter((a) => {

      const coincideParentesco =
        filtroParentesco === "Todos" ||
        a.parentesco === filtroParentesco;


      const texto =
        busquedaTabla.toLowerCase().trim();


      const coincideBusqueda =
        texto === "" ||
        String(a.dni || "")
          .toLowerCase()
          .includes(texto) ||

        String(a.nombres || "")
          .toLowerCase()
          .includes(texto) ||

        String(a.apellidos || "")
          .toLowerCase()
          .includes(texto);


      return (
        coincideParentesco &&
        coincideBusqueda
      );

    });

  }, [
    apoderados,
    filtroParentesco,
    busquedaTabla
  ]);


  // ============================================================
  // MÉTRICAS DINÁMICAS
  // ============================================================

  const totalApoderados =
    apoderados.length;


  const padresMadres =
    apoderados.filter(
      (a) =>
        a.parentesco === "Padre" ||
        a.parentesco === "Madre"
    ).length;


  const tutoresOtros =
    apoderados.filter(
      (a) =>
        a.parentesco !== "Padre" &&
        a.parentesco !== "Madre"
    ).length;


  const contarParentesco = {};

  apoderados.forEach((a) => {

    const parentesco =
      a.parentesco || "Otro";

    contarParentesco[parentesco] =
      (contarParentesco[parentesco] || 0) + 1;
  });


  const parentescoMayor =
    Object.keys(contarParentesco).length > 0
      ? Object.entries(contarParentesco)
          .sort((a, b) => b[1] - a[1])[0]
      : ["Sin datos", 0];

      // ============================================================
// EDITAR APODERADO
// ============================================================

const editarApoderado = (apoderado) => {

  setFormData({
    idApoderado: apoderado.id,
    dni: apoderado.dni || "",
    nombres: apoderado.nombres || "",
    apellidos: apoderado.apellidos || "",
    telefono: apoderado.telefono || "",
    correo: apoderado.email || "",
    parentesco: apoderado.parentesco || "Otro"
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


// ============================================================
// ELIMINAR APODERADO
// ============================================================

const eliminarApoderado = async (id) => {

  const confirmar = window.confirm(
    "¿Estás segura de eliminar este apoderado?"
  );

  if (!confirmar) {
    return;
  }

  try {

    await api.delete(`/apoderados/${id}`);

    alert("Apoderado eliminado correctamente.");

    await cargarApoderados();

  } catch (error) {

    console.error(
      "Error al eliminar apoderado:",
      error
    );

    alert(
      error.response?.data?.mensaje ||
      "No se pudo eliminar el apoderado."
    );
  }
};


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
              backgroundColor: "#fef3c7",
              fontSize: "24px"
            }}
          >
            👨‍👩‍👧
          </div>


          <div>

            <h3
              className="fw-bold m-0"
              style={{
                color: "#0f172a",
                fontSize: "22px"
              }}
            >
              Registro de Apoderados
            </h3>

            <span className="text-muted small">
              Gestiona los apoderados vinculados a los estudiantes
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
            {totalApoderados} activos
          </span>

          <span
            className="px-3 py-2 rounded-pill small fw-semibold"
            style={{
              backgroundColor: "#f1f5f9",
              color: "#475569"
            }}
          >
            {totalApoderados} total
          </span>

        </div>

      </div>


      {/* ======================================================
          2. TARJETAS
      ====================================================== */}

      <div className="row g-3">


        {/* TOTAL */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">

            <div className="d-flex justify-content-between align-items-center">

              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#e0e7ff",
                  color: "#3730a3"
                }}
              >
                <i className="bi bi-people-fill fs-5"></i>
              </div>

              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb"
                }}
              >
                registrados
              </span>

            </div>

            <div>

              <h2
                className="fw-bold m-0"
                style={{ color: "#0f172a" }}
              >
                {totalApoderados}
              </h2>

              <small className="text-muted">
                Total apoderados
              </small>

            </div>

          </div>

        </div>


        {/* PADRES Y MADRES */}

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
                👨‍👩‍👧
              </div>

              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#dcfce7",
                  color: "#16a34a"
                }}
              >
                parentesco
              </span>

            </div>

            <div>

              <h2
                className="fw-bold m-0"
                style={{ color: "#16a34a" }}
              >
                {padresMadres}
              </h2>

              <small className="text-muted">
                Padres y madres
              </small>

            </div>

          </div>

        </div>


        {/* TUTORES */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">

            <div className="d-flex justify-content-between align-items-center">

              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#92400e"
                }}
              >
                <i className="bi bi-person-fill fs-5"></i>
              </div>

              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#d97706"
                }}
              >
                parentesco
              </span>

            </div>

            <div>

              <h2
                className="fw-bold m-0"
                style={{ color: "#d97706" }}
              >
                {tutoresOtros}
              </h2>

              <small className="text-muted">
                Tutores y otros
              </small>

            </div>

          </div>

        </div>


        {/* MAYORÍA */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">

            <div className="d-flex justify-content-between align-items-center">

              <div
                className="p-2 rounded-3"
                style={{
                  backgroundColor: "#f3e8ff",
                  color: "#7e22ce"
                }}
              >
                📊
              </div>

              <span
                className="badge rounded-pill fw-normal px-2 py-1"
                style={{
                  backgroundColor: "#f3e8ff",
                  color: "#7e22ce"
                }}
              >
                registros
              </span>

            </div>

            <div>

              <h2
                className="fw-bold m-0"
                style={{ color: "#7e22ce" }}
              >
                {parentescoMayor[1]}
              </h2>

              <small className="text-muted">
                Mayoría: {parentescoMayor[0]}
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
              style={{ color: "#0f172a" }}
            >
              Registro de Apoderados
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
            Nuevo Registro
          </button>

        </div>


        {/* BÚSQUEDA DNI */}

        <div
          className="p-3 mb-4 rounded-3"
          style={{
            backgroundColor: "#f8fafc",
            border: "1px dashed #cbd5e1"
          }}
        >

          <label
            className="form-label text-uppercase fw-bold text-muted mb-2"
            style={{
              fontSize: "11px",
              letterSpacing: "0.5px"
            }}
          >
            BÚSQUEDA RÁPIDA POR DNI
          </label>


          <div className="d-flex gap-2">

            <div className="position-relative flex-grow-1">

              <i
                className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                style={{ fontSize: "14px" }}
              ></i>

              <input
                type="text"
                className="form-control border-0 ps-5 bg-white"
                placeholder="Ingresa el DNI del apoderado..."
                value={busquedaDni}
                onChange={(e) =>
                  setBusquedaDni(e.target.value)
                }
              />

            </div>


            <button
              type="button"
              onClick={buscarPorDni}
              className="btn px-4 fw-bold text-white"
              style={{
                backgroundColor: "#1d3b8f"
              }}
            >
              <i className="bi bi-search me-2"></i>
              Buscar
            </button>

          </div>

        </div>


        <form onSubmit={handleGuardar}>

          <div className="row g-3">


            {/* ID */}

            <div className="col-12 col-md-6">

              <label className="form-label text-uppercase fw-bold text-muted">
                ID DEL APODERADO
              </label>

              <input
                type="text"
                className="form-control bg-light border-0 fw-bold"
                value={
                  formData.idApoderado ||
                  generarIdVisual()
                }
                readOnly
              />

            </div>


            {/* DNI */}

            <div className="col-12 col-md-6">

              <label className="form-label text-uppercase fw-bold text-muted">
                DNI <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="dni"
                maxLength="8"
                className="form-control bg-light border-0"
                value={formData.dni}
                onChange={handleChange}
              />

            </div>


            {/* NOMBRES */}

            <div className="col-12 col-md-6">

              <label className="form-label text-uppercase fw-bold text-muted">
                NOMBRES <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="nombres"
                className="form-control bg-light border-0"
                value={formData.nombres}
                onChange={handleChange}
              />

            </div>


            {/* APELLIDOS */}

            <div className="col-12 col-md-6">

              <label className="form-label text-uppercase fw-bold text-muted">
                APELLIDOS <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="apellidos"
                className="form-control bg-light border-0"
                value={formData.apellidos}
                onChange={handleChange}
              />

            </div>


            {/* TELÉFONO */}

            <div className="col-12 col-md-6">

              <label className="form-label text-uppercase fw-bold text-muted">
                TELÉFONO <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                name="telefono"
                className="form-control bg-light border-0"
                value={formData.telefono}
                onChange={handleChange}
              />

            </div>


            {/* CORREO */}

            <div className="col-12 col-md-6">

              <label className="form-label text-uppercase fw-bold text-muted">
                CORREO ELECTRÓNICO
              </label>

              <input
                type="email"
                name="correo"
                className="form-control bg-light border-0"
                value={formData.correo}
                onChange={handleChange}
              />

            </div>


            {/* PARENTESCO */}

            <div className="col-12">

              <label className="form-label text-uppercase fw-bold text-muted">
                PARENTESCO <span className="text-danger">*</span>
              </label>

              <div className="d-flex flex-wrap gap-2">

                {parentescosForm.map((p) => {

                  const seleccionado =
                    formData.parentesco === p.id;

                  return (

                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          parentesco: p.id
                        })
                      }
                      className="btn px-3 py-2 rounded-pill fw-semibold"
                      style={{
                        backgroundColor:
                          seleccionado
                            ? "#eff6ff"
                            : "#ffffff",

                        color:
                          seleccionado
                            ? "#1d3b8f"
                            : "#64748b",

                        border:
                          seleccionado
                            ? "2px solid #2563eb"
                            : "1px solid #e2e8f0"
                      }}
                    >

                      {p.icon && (
                        <span className="me-1">
                          {p.icon}
                        </span>
                      )}

                      {p.iconClass && (
                        <i className={`${p.iconClass} me-1`}></i>
                      )}

                      {p.label}

                    </button>

                  );
                })}

              </div>

            </div>

          </div>


          {/* BOTONES */}

          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">

            <div className="d-flex gap-2">

              <button
                type="button"
                onClick={limpiarFormulario}
                className="btn px-3 py-2 fw-bold"
              >
                + Nuevo
              </button>


              <button
                type="submit"
                className="btn px-4 py-2 fw-bold text-white"
                style={{
                  backgroundColor: "#10b981"
                }}
              >
                <i className="bi bi-floppy me-2"></i>
                Guardar
              </button>

            </div>


            <button
              type="button"
              onClick={limpiarFormulario}
              className="btn border"
            >
              ✕ Cancelar
            </button>

          </div>

        </form>

      </div>


      {/* ======================================================
          4. TABLA
      ====================================================== */}

      <div className="bg-white p-4 rounded-4 shadow-sm border border-light">

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

          <div className="d-flex align-items-center gap-2">

            <h5 className="fw-bold m-0">
              Padrón de Apoderados
            </h5>

            <span className="badge bg-light text-primary border">
              {apoderadosFiltrados.length}
            </span>

          </div>


          <div className="d-flex gap-2">

            <select
              className="form-select form-select-sm"
              value={filtroParentesco}
              onChange={(e) =>
                setFiltroParentesco(e.target.value)
              }
            >

              <option>Todos</option>
              <option>Padre</option>
              <option>Madre</option>
              <option>Tutor(a)</option>
              <option>Abuelo(a)</option>
              <option>Tío(a)</option>
              <option>Hermano(a)</option>
              <option>Otro</option>

            </select>


            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar apoderado..."
              value={busquedaTabla}
              onChange={(e) =>
                setBusquedaTabla(e.target.value)
              }
            />

          </div>

        </div>


        <div className="table-responsive">

          <table
            className="table table-borderless align-middle"
            style={{ minWidth: "1000px" }}
          >

            <thead>

              <tr>

                <th>ID</th>
                <th>DNI</th>
                <th>NOMBRES</th>
                <th>APELLIDOS</th>
                <th>TELÉFONO</th>
                <th>CORREO</th>
                <th>PARENTESCO</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>

              </tr>

            </thead>


            <tbody>

              {cargando ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-5"
                  >
                    Cargando apoderados...
                  </td>

                </tr>

              ) : apoderadosFiltrados.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-5 text-muted"
                  >
                    No hay apoderados registrados.
                  </td>

                </tr>

              ) : (

                apoderadosFiltrados.map((a) => {

                  const estilo =
                    obtenerEstiloParentesco(
                      a.parentesco
                    );

                  return (

                    <tr key={a.id}>

                      <td className="fw-bold text-primary">
                        APO-{String(a.id).padStart(3, "0")}
                      </td>

                      <td>
                        {a.dni}
                      </td>

                      <td>

                        <div className="d-flex align-items-center gap-2">

                          <div
                            className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: "32px",
                              height: "32px",
                              backgroundColor: "#2563eb"
                            }}
                          >
                            {obtenerIniciales(
                              a.nombres,
                              a.apellidos
                            )}
                          </div>

                          {a.nombres}

                        </div>

                      </td>

                      <td>
                        {a.apellidos}
                      </td>

                      <td>
                        {a.telefono || "-"}
                      </td>

                      <td>
                        {a.email || "-"}
                      </td>

                      <td>

                        <span
                          className="px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: estilo.bg,
                            color: estilo.color
                          }}
                        >
                          {estilo.icon}{" "}
                          {a.parentesco || "Otro"}
                        </span>

                      </td>

                      <td>

                        <span
                          className="px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: "#dcfce7",
                            color: "#166534"
                          }}
                        >
                          ● Activo
                        </span>

                      </td>

                      <td>

  <div className="d-flex gap-2">

    {/* EDITAR */}
    <button
      type="button"
      className="btn btn-sm"
      title="Editar"
      onClick={() => editarApoderado(a)}
      style={{
        backgroundColor: "#eff6ff",
        color: "#2563eb"
      }}
    >
      <i className="bi bi-pencil-square"></i>
    </button>


    {/* ELIMINAR */}
    <button
      type="button"
      className="btn btn-sm"
      title="Eliminar"
      onClick={() => eliminarApoderado(a.id)}
      style={{
        backgroundColor: "#fee2e2",
        color: "#dc2626"
      }}
    >
      <i className="bi bi-trash"></i>
    </button>

  </div>

</td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>


        <div className="mt-3 text-muted small">
          Mostrando {apoderadosFiltrados.length} de{" "}
          {totalApoderados} apoderados
        </div>

      </div>

    </div>
  );
}