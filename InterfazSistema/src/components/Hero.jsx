function Hero() {

  return (

    // Tarjeta principal de bienvenida
    <div className="hero">

      {/* Título */}
      <h1>

        Bienvenido al Sistema de Gestión de Matrícula Escolar

      </h1>

      {/* Descripción */}
      <p>

        Año Escolar 2025 · Proceso de Matrícula en Curso

      </p>

      {/* Botón para nueva matrícula */}
      <button className="btn btn-success me-2">

        Nueva Matrícula

      </button>

      {/* Botón para registrar estudiante */}
      <button className="btn btn-light">

        Registrar Estudiante

      </button>

    </div>

  );

}

export default Hero;