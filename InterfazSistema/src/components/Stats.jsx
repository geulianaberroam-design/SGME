function Stats() {

  // Arreglo que almacena las estadísticas del sistema
  const cards = [

    {
      titulo: "Total Estudiantes",
      valor: "1248"
    },

    {
      titulo: "Matrículas Activas",
      valor: "1136"
    },

    {
      titulo: "Pagos Pendientes",
      valor: "84"
    },

    {
      titulo: "Docs. por Validar",
      valor: "37"
    }

  ];

  return (

    // Fila que contiene todas las tarjetas
    <div className="row mt-4">

      {/* Recorre el arreglo y crea una tarjeta por cada elemento */}
      {

        cards.map((c, i) => (

          <div className="col-md-3" key={i}>

            <div className="card shadow-sm p-3">

              {/* Número */}
              <h2>{c.valor}</h2>

              {/* Descripción */}
              <span>{c.titulo}</span>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default Stats;

