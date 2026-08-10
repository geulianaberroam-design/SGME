import React from 'react';
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import RecentTable from "../components/RecentTable";
import Calendar from "../components/Calendar";
import Notifications from "../components/Notifications";

function Dashboard() {
  return (
    <div className="dashboard-content d-flex flex-column gap-4">
      {/* 1. Tarjeta principal de bienvenida */}
      <Hero />

      {/* 2. Tarjetas de métricas y estadísticas */}
      <Stats />

      {/* 3. Sección inferior: Tabla a la izquierda, Calendario y Notificaciones a la derecha */}
      <div className="row g-4">
        {/* Columna Izquierda: Tabla de Matrículas Recientes */}
        <div className="col-12 col-xl-8">
          <RecentTable />
        </div>

        {/* Columna Derecha: Calendario + Notificaciones */}
        <div className="col-12 col-xl-4 d-flex flex-column gap-4">
          <Calendar />
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;