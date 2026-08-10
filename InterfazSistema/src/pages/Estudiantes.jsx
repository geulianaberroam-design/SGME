import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Estudiantes() {

    // ============================================================
    // ESTADOS
    // ============================================================

    const [formData, setFormData] = useState({
        idEstudiante: "",
        dni: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        correo: "",
        fechaNacimiento: "",
        direccion: "",
        apoderado: ""
    });

    // Lista real de estudiantes obtenida desde PostgreSQL
    const [estudiantes, setEstudiantes] = useState([]);

    // Lista de apoderados obtenida desde PostgreSQL
    const [apoderados, setApoderados] = useState([]);
    
    // Lista de apoderados obtenida desde PostgreSQL
    const [matriculas, setMatriculas] = useState([]);

    // Estado de carga
    const [cargando, setCargando] = useState(true);

    // ============================================================
    // CARGAR ESTUDIANTES
    // ============================================================

    const cargarEstudiantes = async () => {

        try {

            setCargando(true);

            const respuesta = await api.get("/estudiantes");

            console.log(
                "Estudiantes recibidos:",
                respuesta.data
            );

            setEstudiantes(respuesta.data);

        } catch (error) {

            console.error(
                "Error al obtener estudiantes:",
                error
            );

            alert(
                "No se pudieron cargar los estudiantes."
            );

        } finally {

            setCargando(false);
        }
    };

    // ============================================================
    // CARGAR APODERADOS
    // ============================================================

    const cargarApoderados = async () => {

        try {

            const respuesta = await api.get("/apoderados");

            console.log(
                "Apoderados recibidos:",
                respuesta.data
            );

            setApoderados(respuesta.data);

        } catch (error) {

            console.error(
                "Error al obtener apoderados:",
                error
            );
        }
    };

    const cargarMatriculas = async () => {
    try {
        const respuesta = await api.get("/matriculas");

        console.log(
            "Matrículas recibidas:",
            respuesta.data
        );

        setMatriculas(respuesta.data);

    } catch (error) {
        console.error(
            "Error al obtener matrículas:",
            error
        );
    }
};

    // ============================================================
    // CARGAR DATOS AL INICIAR LA PÁGINA
    // ============================================================

useEffect(() => {

    cargarEstudiantes();
    cargarApoderados();
    cargarMatriculas();

}, []);

    // ============================================================
    // MANEJAR CAMBIOS DEL FORMULARIO
    // ============================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ============================================================
    // GENERAR NUEVO ID VISUAL
    // ============================================================

    const generarIdEstudiante = () => {

        const numero = estudiantes.length + 1;

        return `EST-${String(numero).padStart(3, "0")}`;
    };

    // ============================================================
    // GUARDAR ESTUDIANTE
    // ============================================================

    const handleGuardar = async (e) => {

        e.preventDefault();

        try {

            // ----------------------------------------------------
            // VALIDAR CAMPOS OBLIGATORIOS
            // ----------------------------------------------------

            if (!formData.dni) {
                alert("Ingresa el DNI del estudiante.");
                return;
            }

            if (!formData.nombres) {
                alert("Ingresa los nombres del estudiante.");
                return;
            }

            if (!formData.apellidos) {
                alert("Ingresa los apellidos del estudiante.");
                return;
            }

            if (!formData.fechaNacimiento) {
                alert("Selecciona la fecha de nacimiento.");
                return;
            }

            if (!formData.apoderado) {
                alert("Selecciona un apoderado.");
                return;
            }

            // ----------------------------------------------------
            // DATOS QUE SE ENVIARÁN A FLASK
            // ----------------------------------------------------

            const estudiante = {

                dni: formData.dni,

                nombres: formData.nombres,

                apellidos: formData.apellidos,

                telefono: formData.telefono,

                email: formData.correo,

                fecha_nac: formData.fechaNacimiento,

                direccion: formData.direccion,

                id_apoderado: Number(formData.apoderado)
            };

            console.log(
                "Enviando estudiante:",
                estudiante
            );

            // ----------------------------------------------------
            // ENVIAR A FLASK
            // ----------------------------------------------------

            const respuesta = await api.post(
                "/estudiantes",
                estudiante
            );

            console.log(
                "Respuesta Flask:",
                respuesta.data
            );

            alert(
                "Estudiante registrado correctamente."
            );

            // ----------------------------------------------------
            // LIMPIAR FORMULARIO
            // ----------------------------------------------------

            setFormData({
                idEstudiante: "",
                dni: "",
                nombres: "",
                apellidos: "",
                telefono: "",
                correo: "",
                fechaNacimiento: "",
                direccion: "",
                apoderado: ""
            });

            // ----------------------------------------------------
            // VOLVER A CARGAR ESTUDIANTES
            // ----------------------------------------------------

            await cargarEstudiantes();

        } catch (error) {

            console.error(
                "Error al registrar estudiante:",
                error
            );

            if (error.response) {

                alert(
                    error.response.data?.mensaje ||
                    "No se pudo registrar el estudiante."
                );

            } else {

                alert(
                    "No se pudo conectar con Flask."
                );
            }
        }
    };

    // ============================================================
    // CANCELAR / LIMPIAR FORMULARIO
    // ============================================================

    const limpiarFormulario = () => {

        setFormData({
            idEstudiante: "",
            dni: "",
            nombres: "",
            apellidos: "",
            telefono: "",
            correo: "",
            fechaNacimiento: "",
            direccion: "",
            apoderado: ""
        });
    };

    // ============================================================
    // CALCULAR EDAD
    // ============================================================

    const calcularEdad = (fechaNacimiento) => {

        if (!fechaNacimiento) {
            return "";
        }

        const nacimiento = new Date(fechaNacimiento);

        const hoy = new Date();

        let edad =
            hoy.getFullYear() -
            nacimiento.getFullYear();

        const mes =
            hoy.getMonth() -
            nacimiento.getMonth();

        if (
            mes < 0 ||
            (
                mes === 0 &&
                hoy.getDate() < nacimiento.getDate()
            )
        ) {
            edad--;
        }

        return edad;
    };

    // ============================================================
    // FORMATEAR FECHA
    // ============================================================

    const formatearFecha = (fecha) => {

        if (!fecha) {
            return "-";
        }

        const fechaObj = new Date(
            `${fecha}T00:00:00`
        );

        return fechaObj.toLocaleDateString(
            "es-PE",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };

    // ============================================================
    // OBTENER INICIALES
    // ============================================================

    const obtenerIniciales = (nombres, apellidos) => {

        const nombrePartes =
            (nombres || "")
                .trim()
                .split(/\s+/);

        const apellidoPartes =
            (apellidos || "")
                .trim()
                .split(/\s+/);

        let iniciales = "";

        if (nombrePartes[0]) {
            iniciales += nombrePartes[0][0];
        }

        if (apellidoPartes[0]) {
            iniciales += apellidoPartes[0][0];
        }

        return iniciales.toUpperCase();
    };

    // ============================================================
    // OBTENER APODERADO
    // ============================================================

    const obtenerApoderado = (idApoderado) => {

        const apoderado = apoderados.find(
            (a) => Number(a.id) === Number(idApoderado)
        );

        if (!apoderado) {
            return "Sin apoderado";
        }

        return `${apoderado.nombres} ${apoderado.apellidos}`;
    };

    // ============================================================
    // ESTADÍSTICAS DINÁMICAS
// ============================================================

// Total de estudiantes registrados
const totalEstudiantes = estudiantes.length;


// IDs de estudiantes que tienen matrícula activa
const idsEstudiantesMatriculados = new Set(
    matriculas
        .filter((m) => {
            const estado = (m.estado || "").toLowerCase();

            return (
                estado === "matriculado" ||
                estado === "activo"
            );
        })
        .map((m) => Number(m.estudiante?.id))
);


// Estudiantes activos
const estudiantesActivos =
    idsEstudiantesMatriculados.size;


// Estudiantes sin matrícula
const estudiantesSinMatricula =
    estudiantes.filter(
        (e) =>
            !idsEstudiantesMatriculados.has(
                Number(e.id)
            )
    ).length;


// Apoderados vinculados
const idsApoderadosVinculados = new Set(
    estudiantes
        .map((e) => e.id_apoderado)
        .filter(
            (id) =>
                id !== null &&
                id !== undefined
        )
);

const apoderadosVinculados =
    idsApoderadosVinculados.size;


// ============================================================
// RENDER
// ============================================================

return (

    <div className="d-flex flex-column gap-4">

       

            {/* ==================================================
                1. ENCABEZADO
            ================================================== */}

            <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-3">

                    <div
                        className="rounded-3 d-flex align-items-center justify-content-center shadow-sm"
                        style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: "#e0e7ff",
                            color: "#1e1b4b"
                        }}
                    >
                        <i className="bi bi-person-fill fs-4"></i>
                    </div>

                    <div>

                        <h3
                            className="fw-bold m-0"
                            style={{
                                color: "#0f172a",
                                fontSize: "22px"
                            }}
                        >
                            Registro de Estudiantes
                        </h3>

                        <span className="text-muted small">
                            Padrón de estudiantes · Año Escolar 2025
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
                        {estudiantesActivos} activos
                    </span>

                    <span
                        className="px-3 py-2 rounded-pill small text-secondary"
                        style={{
                            backgroundColor: "#f1f5f9"
                        }}
                    >
                        {estudiantesSinMatricula} sin matrícula
                    </span>

                </div>

            </div>


            {/* ==================================================
                2. TARJETAS DE MÉTRICAS
            ================================================== */}

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
                                <i className="bi bi-people-fill"></i>
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
                                {totalEstudiantes}
                            </h2>

                            <small className="text-muted">
                                Total estudiantes
                            </small>

                        </div>

                    </div>

                </div>


                {/* ACTIVOS */}

                <div className="col-12 col-sm-6 col-xl-3">

                    <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">

                        <div className="d-flex justify-content-between align-items-center">

                            <div
                                className="p-2 rounded-3"
                                style={{
                                    backgroundColor: "#dcfce7",
                                    color: "#166534"
                                }}
                            >
                                <i className="bi bi-check-square-fill"></i>
                            </div>

                            <span
                                className="badge rounded-pill fw-normal px-2 py-1"
                                style={{
                                    backgroundColor: "#dcfce7",
                                    color: "#16a34a"
                                }}
                            >
                                activos
                            </span>

                        </div>

                        <div>

                            <h2
                                className="fw-bold m-0"
                                style={{ color: "#16a34a" }}
                            >
                                {estudiantesActivos}
                            </h2>

                            <small className="text-muted">
                                Estudiantes activos
                            </small>

                        </div>

                    </div>

                </div>


                {/* APODERADOS */}

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
                                <i className="bi bi-people-fill"></i>
                            </div>

                            <span
                                className="badge rounded-pill fw-normal px-2 py-1"
                                style={{
                                    backgroundColor: "#fef3c7",
                                    color: "#d97706"
                                }}
                            >
                                en el sistema
                            </span>

                        </div>

                        <div>

                            <h2
                                className="fw-bold m-0"
                                style={{ color: "#d97706" }}
                            >
                                {apoderadosVinculados}
                            </h2>

                            <small className="text-muted">
                                Apoderados vinculados
                            </small>

                        </div>

                    </div>

                </div>


                {/* INACTIVOS */}

                <div className="col-12 col-sm-6 col-xl-3">

                    <div className="bg-white p-3 rounded-4 shadow-sm border border-light d-flex flex-column gap-2">

                        <div className="d-flex justify-content-between align-items-center">

                            <div
                                className="p-2 rounded-3"
                                style={{
                                    backgroundColor: "#e0e7ff",
                                    color: "#2563eb"
                                }}
                            >
                                <i className="bi bi-pause-btn-fill"></i>
                            </div>

                            <span
                                className="badge rounded-pill fw-normal px-2 py-1"
                                style={{
                                    backgroundColor: "#f1f5f9",
                                    color: "#64748b"
                                }}
                            >
                                sin matrícula
                            </span>

                        </div>

                        <div>

                            <h2
                                className="fw-bold m-0"
                                style={{ color: "#2563eb" }}
                            >
                                {estudiantesSinMatricula}
                            </h2>

                            <small className="text-muted">
                                Estudiantes sin matrícula
                            </small>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                3. FORMULARIO
            ================================================== */}

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
                            Registro de Estudiantes
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


                <form onSubmit={handleGuardar}>

                    <div className="row g-3">

                        {/* ID */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                ID DEL ESTUDIANTE
                            </label>

                            <div className="input-group">

                                <span className="input-group-text bg-light border-0 text-muted">
                                    <i className="bi bi-card-text"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control bg-light border-0 fw-bold"
                                    style={{ color: "#1d3b8f" }}
                                    value={
                                        formData.idEstudiante ||
                                        generarIdEstudiante()
                                    }
                                    readOnly
                                />

                            </div>

                        </div>


                        {/* DNI */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                DNI <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                name="dni"
                                className="form-control bg-light border-0"
                                placeholder="Ej: 75432198"
                                value={formData.dni}
                                onChange={handleChange}
                            />

                        </div>


                        {/* NOMBRES */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                NOMBRES <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                name="nombres"
                                className="form-control bg-light border-0"
                                placeholder="Ej: Camila Sofía"
                                value={formData.nombres}
                                onChange={handleChange}
                            />

                        </div>


                        {/* APELLIDOS */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                APELLIDOS <span className="text-danger">*</span>
                            </label>

                            <input
                                type="text"
                                name="apellidos"
                                className="form-control bg-light border-0"
                                placeholder="Ej: Ríos Torres"
                                value={formData.apellidos}
                                onChange={handleChange}
                            />

                        </div>


                        {/* TELÉFONO */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                TELÉFONO
                            </label>

                            <input
                                type="text"
                                name="telefono"
                                className="form-control bg-light border-0"
                                placeholder="Ej: 987 654 321"
                                value={formData.telefono}
                                onChange={handleChange}
                            />

                        </div>


                        {/* CORREO */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                CORREO ELECTRÓNICO
                            </label>

                            <input
                                type="email"
                                name="correo"
                                className="form-control bg-light border-0"
                                placeholder="correo@ejemplo.com"
                                value={formData.correo}
                                onChange={handleChange}
                            />

                        </div>


                        {/* FECHA */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                FECHA DE NACIMIENTO
                                <span className="text-danger"> *</span>
                            </label>

                            <input
                                type="date"
                                name="fechaNacimiento"
                                className="form-control bg-light border-0 text-secondary"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                            />

                        </div>


                        {/* DIRECCIÓN */}

                        <div className="col-12 col-md-6">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                DIRECCIÓN
                            </label>

                            <input
                                type="text"
                                name="direccion"
                                className="form-control bg-light border-0"
                                placeholder="Av. Principal 123, Distrito, Lima"
                                value={formData.direccion}
                                onChange={handleChange}
                            />

                        </div>


                        {/* APODERADO */}

                        <div className="col-12">

                            <label
                                className="form-label text-uppercase fw-bold text-muted"
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.5px"
                                }}
                            >
                                APODERADO
                                <span className="text-danger"> *</span>
                            </label>

                            <select
                                name="apoderado"
                                className="form-select bg-light border-0 text-secondary"
                                value={formData.apoderado}
                                onChange={handleChange}
                            >

                                <option value="">
                                    — Seleccionar apoderado —
                                </option>

                                {apoderados.map((apoderado) => (

                                    <option
                                        key={apoderado.id}
                                        value={apoderado.id}
                                    >
                                        {apoderado.nombres}{" "}
                                        {apoderado.apellidos}{" "}
                                        ({apoderado.dni})
                                    </option>

                                ))}

                            </select>

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
                                    border: "1px solid #bfdbfe",
                                    fontSize: "14px"
                                }}
                            >
                                + Nuevo
                            </button>


                            <button
                                type="submit"
                                className="btn px-4 py-2 rounded-3 fw-bold text-white"
                                style={{
                                    backgroundColor: "#10b981",
                                    border: "none",
                                    fontSize: "14px"
                                }}
                            >
                                <i className="bi bi-floppy me-2"></i>
                                Guardar
                            </button>


                            <button
                                type="button"
                                className="btn px-3 py-2 rounded-3 text-secondary"
                                style={{
                                    backgroundColor: "#f1f5f9",
                                    border: "none",
                                    fontSize: "14px"
                                }}
                                onClick={() => alert("Función Editar próximamente.")}
                            >
                                <i className="bi bi-pencil-square me-2"></i>
                                Editar
                            </button>


                            <button
                                type="button"
                                className="btn px-3 py-2 rounded-3 text-secondary"
                                style={{
                                    backgroundColor: "#f1f5f9",
                                    border: "none",
                                    fontSize: "14px"
                                }}
                                onClick={() => alert("Función Eliminar próximamente.")}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Eliminar
                            </button>


                            <button
                                type="button"
                                className="btn px-3 py-2 rounded-3 fw-bold"
                                style={{
                                    backgroundColor: "#eff6ff",
                                    color: "#2563eb",
                                    border: "1px solid #bfdbfe",
                                    fontSize: "14px"
                                }}
                                onClick={cargarEstudiantes}
                            >
                                <i className="bi bi-search me-2"></i>
                                Actualizar
                            </button>

                        </div>


                        <div>

                            <button
                                type="button"
                                onClick={limpiarFormulario}
                                className="btn px-3 py-2 rounded-3 text-secondary border"
                                style={{
                                    backgroundColor: "#ffffff",
                                    fontSize: "14px"
                                }}
                            >
                                ✕ Cancelar
                            </button>

                        </div>

                    </div>

                </form>

            </div>


            {/* ==================================================
                4. TABLA DE ESTUDIANTES
            ================================================== */}

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
                            Padrón de Estudiantes
                        </h5>

                    </div>

                    <button
                        className="btn-pill-blue"
                        onClick={cargarEstudiantes}
                    >
                        Actualizar Lista
                    </button>

                </div>


                <div
                    className="table-responsive"
                    style={{ overflowX: "auto" }}
                >

                    <table
                        className="table table-borderless align-middle m-0"
                        style={{ minWidth: "1050px" }}
                    >

                        <thead>

                            <tr
                                style={{
                                    backgroundColor: "#f8fafc"
                                }}
                            >

                                <th
                                    className="py-3 px-3 text-muted small fw-bold"
                                    style={{
                                        borderTopLeftRadius: "10px",
                                        borderBottomLeftRadius: "10px"
                                    }}
                                >
                                    ID
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold">
                                    DNI
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold">
                                    NOMBRES
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold">
                                    APELLIDOS
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold">
                                    FECHA NAC. / EDAD
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold">
                                    TELÉFONO
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold">
                                    APODERADO
                                </th>

                                <th className="py-3 px-3 text-muted small fw-bold text-center">
                                    ESTADO
                                </th>

                                <th
                                    className="py-3 px-3 text-muted small fw-bold text-end"
                                    style={{
                                        borderTopRightRadius: "10px",
                                        borderBottomRightRadius: "10px"
                                    }}
                                >
                                    ACCIONES
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {cargando ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center py-5 text-muted"
                                    >
                                        <div
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></div>

                                        Cargando estudiantes...

                                    </td>

                                </tr>

                            ) : estudiantes.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center py-5 text-muted"
                                    >
                                        <i className="bi bi-person-x fs-2 d-block mb-2"></i>

                                        No hay estudiantes registrados.

                                    </td>

                                </tr>

                            ) : (

                                estudiantes.map((e) => {

                                    const iniciales =
                                        obtenerIniciales(
                                            e.nombres,
                                            e.apellidos
                                        );

                                    const edad =
                                        calcularEdad(
                                            e.fecha_nac
                                        );

                                    const apoderado =
                                        obtenerApoderado(
                                            e.id_apoderado
                                        );

                                    return (

                                        <tr
                                            key={e.id}
                                            style={{
                                                borderBottom:
                                                    "1px solid #f1f5f9"
                                            }}
                                        >

                                            {/* ID */}

                                            <td
                                                className="py-3 px-3 fw-bold"
                                                style={{
                                                    color: "#1d3b8f",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                {`EST-${String(
                                                    e.id
                                                ).padStart(3, "0")}`}
                                            </td>


                                            {/* DNI */}

                                            <td
                                                className="py-3 px-3 text-secondary"
                                                style={{
                                                    fontSize: "13px"
                                                }}
                                            >
                                                {e.dni}
                                            </td>


                                            {/* NOMBRES */}

                                            <td
                                                className="py-3 px-3"
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >

                                                <div className="d-flex align-items-center gap-2">

                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                                        style={{
                                                            width: "32px",
                                                            height: "32px",
                                                            backgroundColor: "#2563eb",
                                                            fontSize: "11px",
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        {iniciales}
                                                    </div>

                                                    <span
                                                        className="fw-bold"
                                                        style={{
                                                            color: "#0f172a",
                                                            fontSize: "14px"
                                                        }}
                                                    >
                                                        {e.nombres}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* APELLIDOS */}

                                            <td
                                                className="py-3 px-3 text-dark fw-medium"
                                                style={{
                                                    fontSize: "14px",
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {e.apellidos}
                                            </td>


                                            {/* FECHA / EDAD */}

                                            <td
                                                className="py-3 px-3"
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >

                                                <div className="d-flex flex-column">

                                                    <span
                                                        className="text-dark fw-medium"
                                                        style={{
                                                            fontSize: "13px"
                                                        }}
                                                    >
                                                        {formatearFecha(
                                                            e.fecha_nac
                                                        )}
                                                    </span>

                                                    <span
                                                        className="text-muted"
                                                        style={{
                                                            fontSize: "11px"
                                                        }}
                                                    >
                                                        {edad} años
                                                    </span>

                                                </div>

                                            </td>


                                            {/* TELÉFONO */}

                                            <td
                                                className="py-3 px-3 text-secondary"
                                                style={{
                                                    fontSize: "13px",
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {e.telefono || "-"}
                                            </td>


                                            {/* APODERADO */}

                                            <td
                                                className="py-3 px-3"
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >

                                                <div className="d-flex align-items-center gap-2">

                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            backgroundColor: "#e0e7ff",
                                                            color: "#1e3a8a",
                                                            fontSize: "10px",
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        {obtenerIniciales(
                                                            apoderado,
                                                            ""
                                                        )}
                                                    </div>

                                                    <span
                                                        className="text-secondary"
                                                        style={{
                                                            fontSize: "13px"
                                                        }}
                                                    >
                                                        {apoderado}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* ESTADO */}

                                            <td
                                                className="py-3 px-3 text-center"
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >

                                                <span
                                                    className="px-3 py-1 rounded-pill small fw-semibold"
                                                    style={{
                                                        backgroundColor: "#dcfce7",
                                                        color: "#166534",
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    ● Activo
                                                </span>

                                            </td>


                                            {/* ACCIONES */}

                                            <td
                                                className="py-3 px-3 text-end"
                                                style={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >

                                                <button
                                                    className="btn btn-sm px-3 py-1 rounded-2 fw-semibold"
                                                    style={{
                                                        backgroundColor: "#eff6ff",
                                                        color: "#2563eb",
                                                        border: "none",
                                                        fontSize: "13px"
                                                    }}
                                                    onClick={() =>
                                                        alert(
                                                            `Editar estudiante ID ${e.id}`
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>

                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </tbody>

                    </table>

                </div>


                {/* ==================================================
                    5. PIE DE TABLA
                ================================================== */}

                <div className="d-flex justify-content-between align-items-center mt-4 pt-2">

                    <span
                        className="text-muted small"
                        style={{ fontSize: "13px" }}
                    >
                        Mostrando {estudiantes.length} de{" "}
                        {estudiantes.length} estudiantes
                    </span>

                </div>

            </div>

    </div>
);
}
