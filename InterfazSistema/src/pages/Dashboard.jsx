// Importa todos los componentes que forman el panel principal
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import RecentTable from "../components/RecentTable";
import Calendar from "../components/Calendar";
import Notifications from "../components/Notifications";

// Recibe las propiedades enviadas desde App.jsx
function Dashboard({ collapsed, setCollapsed }) {

  return (

    // Contenedor principal del Dashboard
    <div className="content">

      {/* Encabezado superior */}
      <Header
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Tarjeta de bienvenida */}
      <Hero />

      {/* Tarjetas de estadísticas */}
      <Stats />

      {/* Sección inferior */}
      <div className="row mt-4">

        {/* Tabla de matrículas */}
        <div className="col-lg-8">
          <RecentTable />
        </div>

        {/* Panel derecho */}
        <div className="col-lg-4">

          {/* Calendario */}
          <Calendar />

          {/* Notificaciones */}
          <Notifications />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;