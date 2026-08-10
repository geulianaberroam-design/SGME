import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ collapsed }) {
  const menuItems = [
    { path: "/", label: "Inicio", icon: "bi-grid-1x2" },
    { path: "/estudiantes", label: "Estudiantes", icon: "bi-person" },
    { path: "/apoderados", label: "Apoderados", icon: "bi-people" },
    { path: "/matriculas", label: "Matrículas", icon: "bi-journal-bookmark" },
    { path: "/grados", label: "Grados", icon: "bi-building" },
    { path: "/pagos", label: "Pagos", icon: "bi-credit-card" },
    { path: "/documentos", label: "Documentos", icon: "bi-folder" },
  ];

  return (
    <aside
      className={collapsed ? "sidebar collapsed" : "sidebar"}
      style={{
        width: collapsed ? "80px" : "240px",
        minHeight: "100vh",
        backgroundColor: "#1b3f94",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 15px",
        transition: "all 0.3s ease",
        fontFamily: "sans-serif"
      }}
    >
      <div>
        {/* LOGO DEL SISTEMA */}
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "30px",
            paddingLeft: "10px"
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "0.5px"
            }}
          >
            SGME
          </h2>
          {!collapsed && (
            <span
              style={{
                fontSize: "13px",
                color: "#e0e7ff",
                fontWeight: "normal"
              }}
            >
              Colegio San Martín
            </span>
          )}
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "active-link" : ""
                }
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 14px",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontSize: "15px",
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.15)"
                    : "transparent",
                  fontWeight: isActive ? "600" : "normal",
                  transition: "background-color 0.2s"
                })}
              >
                <i
                  className={`bi ${item.icon}`}
                  style={{ fontSize: "18px" }}
                ></i>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTÓN CERRAR SESIÓN */}
      <div style={{ marginTop: "20px" }}>
        <button
          className="logout"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#ffffff",
            color: "#0f172a",
            border: "none",
            borderRadius: "4px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          {!collapsed ? (
            "Cerrar sesión"
          ) : (
            <i className="bi bi-box-arrow-right" style={{ fontSize: "16px" }}></i>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;