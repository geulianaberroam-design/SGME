from flask import Flask, jsonify

from dao.estudiante_dao import EstudianteDAO


app = Flask(__name__)

estudianteDAO = EstudianteDAO()


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
# EJECUTAR API
# ==========================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )