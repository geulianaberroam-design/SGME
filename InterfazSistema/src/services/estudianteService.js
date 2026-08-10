import api from "./api";

export const obtenerEstudiantes = async () => {
    const respuesta = await api.get("/estudiantes");
    return respuesta.data;
};