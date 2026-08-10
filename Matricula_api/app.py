from flask import Flask, jsonify

from dao.estudiante_dao import EstudianteDAO
from dao.apoderado_dao import ApoderadoDAO
from dao.matricula_dao import MatriculaDAO



# ==========================================
# CREACIÓN DE LOS DAO
# ==========================================
app = Flask(__name__)

estudianteDAO = EstudianteDAO()
apoderadoDAO = ApoderadoDAO()
matriculaDAO = MatriculaDAO()


# ==========================================
# INICIO
# ==========================================

@app.route("/")
def inicio():

    return {
        "mensaje": "API SGME funcionando correctamente"
    }


# ==========================================
# LISTAR ESTUDIANTES
# ==========================================

@app.route("/api/estudiantes", methods=["GET"])
def obtener_estudiantes():

    estudiantes = estudianteDAO.obtener_todos()

    datos = []

    for estudiante in estudiantes:

        datos.append({
            "id": estudiante.id,
            "dni": estudiante.dni,
            "nombres": estudiante.nombres,
            "apellidos": estudiante.apellidos,
            "telefono": estudiante.telefono,
            "email": estudiante.email,
            "fecha_nac": str(estudiante.fecha_nac),
            "direccion": estudiante.direccion,
            "id_apoderado": estudiante.id_apoderado
        })

    return jsonify(datos)

# ==========================================
# LISTAR APODERADOS
# ==========================================

@app.route("/api/apoderados", methods=["GET"])
def obtener_apoderados():

    apoderados = apoderadoDAO.obtener_todos()

    datos = []

    for apoderado in apoderados:

        datos.append({
            "id": apoderado.id,
            "dni": apoderado.dni,
            "nombres": apoderado.nombres,
            "apellidos": apoderado.apellidos,
            "telefono": apoderado.telefono,
            "email": apoderado.email
        })

    return jsonify(datos)

# ==========================================
# LISTAR MATRÍCULAS
# ==========================================

@app.route("/api/matriculas", methods=["GET"])
def obtener_matriculas():

    matriculas = matriculaDAO.obtener_todos()

    datos = []

    for matricula in matriculas:

        datos.append({
            "id": matricula.id,
            "anio": matricula.anio,
            "fecha": str(matricula.fecha),
            "estado": matricula.estado,
            "estudiante": {
                "id": matricula.estudiante.id,
                "dni": matricula.estudiante.dni,
                "nombres": matricula.estudiante.nombres,
                "apellidos": matricula.estudiante.apellidos
            },
            "grado_seccion": {
                "id": matricula.grado_seccion.id,
                "grado": matricula.grado_seccion.grado,
                "seccion": matricula.grado_seccion.seccion
            }
        })

    return jsonify(datos)

# ==========================================
# EJECUTAR API
# ==========================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )