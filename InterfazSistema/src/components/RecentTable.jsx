import { useEffect, useState } from "react";
import api from "../services/api";

export default function RecentTable() {


const [estudiantes, setEstudiantes] = useState([]);

useEffect(() => {
    api.get("/estudiantes")
        .then((respuesta) => {
            console.log("Datos recibidos:", respuesta.data);
            setEstudiantes(respuesta.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}, []);

return (
    <div className="recent-table">

        <h2>Estudiantes registrados</h2>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                </tr>
            </thead>

            <tbody>
                {estudiantes.map((estudiante) => (
                    <tr key={estudiante.id}>
                        <td>{estudiante.id}</td>
                        <td>{estudiante.dni}</td>
                        <td>{estudiante.nombres}</td>
                        <td>{estudiante.apellidos}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
);


}
