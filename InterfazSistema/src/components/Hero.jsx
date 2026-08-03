function Hero() {

  return (

    // Tarjeta principal de bienvenida
    <div className="hero">

      {/* Título de la sección */}
      <small className="panel-control">
        Panel de Control
      </small>

      {/* Título principal */}
      <h1>
        Bienvenido al Sistema de Gestión de Matrícula Escolar
      </h1>

      {/* Descripción */}
      <p>
        Año Escolar 2025 · Proceso de Matrícula en Curso
      </p>

      {/* Botones de acción */}
      <button className="btn btn-success btn-accion me-2">
           + Nueva Matrícula
      </button>

      <button className="btn btn-registrar btn-accion">
            Registrar Estudiante
       </button>
    </div>

  );

}

export default Hero;