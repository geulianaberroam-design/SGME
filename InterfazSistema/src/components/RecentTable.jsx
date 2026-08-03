function RecentTable() {

  // Lista de matrículas recientes
  const alumnos = [

    {
      codigo: "MAT-001",
      estudiante: "Camila Ríos",
      estado: "Activa"
    },

    {
      codigo: "MAT-002",
      estudiante: "Andrés Mamani",
      estado: "Pendiente"
    },

    {
      codigo: "MAT-003",
      estudiante: "Lucía Fernández",
      estado: "Activa"
    }

  ];

  return (

    // Tarjeta que contiene la tabla
    <div className="card p-3">

      <h4>Matrículas Recientes</h4>

      <table className="table">

        {/* Cabecera */}
        <thead>

          <tr>

            <th>Código</th>

            <th>Estudiante</th>

            <th>Estado</th>

          </tr>

        </thead>

        {/* Cuerpo */}
        <tbody>

          {/* Recorre el arreglo para mostrar los registros */}
          {

            alumnos.map((a, i) => (

              <tr key={i}>

                <td>{a.codigo}</td>

                <td>{a.estudiante}</td>

                <td>{a.estado}</td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default RecentTable;