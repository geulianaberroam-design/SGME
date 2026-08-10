# ============================================================
# BACKEND PRINCIPAL - SGME
# Sistema de Gestión de Matrícula Escolar
# ============================================================
#
# Conexión principal:
#
# REACT → FLASK → DAO → POSTGRESQL
#
# Módulos:
# - Estudiantes
# - Apoderados
# - Matrículas
# - Grados y Secciones
# - Pagos
# - Documentos
# - Eventos
#
# ============================================================


# ============================================================
# IMPORTACIONES FLASK
# ============================================================

from flask import Flask, jsonify, request
from flask_cors import CORS


# ============================================================
# IMPORTACIÓN DE MODELOS
# ============================================================

from modelos.estudiante import Estudiante
from modelos.apoderado import Apoderado
from modelos.matricula import Matricula
from modelos.grado_seccion import GradoSeccion


# ============================================================
# IMPORTACIÓN DE DAO
# ============================================================

from dao.estudiante_dao import EstudianteDAO
from dao.apoderado_dao import ApoderadoDAO
from dao.matricula_dao import MatriculaDAO
from dao.grado_seccion_dao import GradoSeccionDAO
from dao.pago_dao import PagoDAO
from dao.documento_dao import DocumentoDAO
from dao.evento_dao import EventoDAO


# ============================================================
# CREACIÓN DE FLASK
# ============================================================

app = Flask(__name__)


# ============================================================
# CONFIGURACIÓN CORS
# ============================================================

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "http://localhost:5174"
        ]
    }
})


# ============================================================
# CREACIÓN DE DAO
# ============================================================

estudianteDAO = EstudianteDAO()
apoderadoDAO = ApoderadoDAO()
matriculaDAO = MatriculaDAO()
gradoSeccionDAO = GradoSeccionDAO()
pagoDAO = PagoDAO()
documentoDAO = DocumentoDAO()
eventoDAO = EventoDAO()


# ============================================================
# INICIO API
# ============================================================

@app.route("/")
def inicio():

    return {
        "mensaje": "API SGME funcionando correctamente"
    }


# ============================================================
# ESTUDIANTES
# ============================================================


# ============================================================
# LISTAR ESTUDIANTES
# GET /api/estudiantes
# ============================================================

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


# ============================================================
# REGISTRAR ESTUDIANTE
# POST /api/estudiantes
# ============================================================

@app.route("/api/estudiantes", methods=["POST"])
def registrar_estudiante():

    try:

        datos = request.get_json()

        if not datos:

            return jsonify({
                "mensaje": "No se recibieron datos"
            }), 400


        estudiante = Estudiante(
            dni=datos.get("dni"),
            nombres=datos.get("nombres"),
            apellidos=datos.get("apellidos"),
            telefono=datos.get("telefono"),
            email=datos.get("email"),
            fecha_nac=datos.get("fecha_nac"),
            direccion=datos.get("direccion"),
            id_apoderado=datos.get("id_apoderado")
        )


        estudiante_guardado = estudianteDAO.insertar(
            estudiante
        )


        if estudiante_guardado is None:

            return jsonify({
                "mensaje": "No se pudo registrar el estudiante"
            }), 400


        return jsonify({
            "mensaje": "Estudiante registrado correctamente",
            "id": estudiante_guardado.id
        }), 201


    except Exception as e:

        print(
            "Error al registrar estudiante:",
            e
        )

        return jsonify({
            "mensaje": "Error al registrar estudiante",
            "error": str(e)
        }), 500


# ============================================================
# APODERADOS
# ============================================================


# ============================================================
# LISTAR APODERADOS
# GET /api/apoderados
# ============================================================

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
            "email": apoderado.email,
            "parentesco": apoderado.parentesco
        })

    return jsonify(datos)


# ============================================================
# REGISTRAR APODERADO
# POST /api/apoderados
# ============================================================

@app.route("/api/apoderados", methods=["POST"])
def registrar_apoderado():

    try:

        datos = request.get_json()

        if not datos:

            return jsonify({
                "mensaje": "No se recibieron datos"
            }), 400


        apoderado = Apoderado.from_dict(
            datos
        )


        apoderado_guardado = apoderadoDAO.insertar(
            apoderado
        )


        if apoderado_guardado is None:

            return jsonify({
                "mensaje": "No se pudo registrar el apoderado"
            }), 400


        return jsonify({
            "mensaje": "Apoderado registrado correctamente",
            "apoderado": apoderado_guardado.to_dict()
        }), 201


    except Exception as e:

        print(
            "Error al registrar apoderado:",
            e
        )

        return jsonify({
            "mensaje": "Error al registrar apoderado",
            "error": str(e)
        }), 500


# ============================================================
# ACTUALIZAR APODERADO
# PUT /api/apoderados/<id>
# ============================================================

@app.route(
    "/api/apoderados/<int:id_apoderado>",
    methods=["PUT"]
)
def actualizar_apoderado(id_apoderado):

    try:

        datos = request.get_json()

        if not datos:

            return jsonify({
                "mensaje": "No se recibieron datos"
            }), 400


        datos_nuevos = {
            "nombres": datos.get("nombres", ""),
            "apellidos": datos.get("apellidos", ""),
            "telefono": datos.get("telefono", ""),
            "email": datos.get("email", ""),
            "parentesco": datos.get("parentesco", "")
        }


        actualizado = apoderadoDAO.actualizar_completo(
            id_apoderado,
            datos_nuevos
        )


        if not actualizado:

            return jsonify({
                "mensaje": "No se encontró el apoderado"
            }), 404


        return jsonify({
            "mensaje": "Apoderado actualizado correctamente"
        }), 200


    except Exception as e:

        print(
            "Error al actualizar apoderado:",
            e
        )

        return jsonify({
            "mensaje": "Error al actualizar apoderado",
            "error": str(e)
        }), 500


# ============================================================
# ELIMINAR APODERADO
# DELETE /api/apoderados/<id>
# ============================================================

@app.route(
    "/api/apoderados/<int:id_apoderado>",
    methods=["DELETE"]
)
def eliminar_apoderado(id_apoderado):

    try:

        eliminado = apoderadoDAO.eliminar(
            id_apoderado
        )


        if not eliminado:

            return jsonify({
                "mensaje": "No se pudo eliminar el apoderado"
            }), 400


        return jsonify({
            "mensaje": "Apoderado eliminado correctamente"
        }), 200


    except Exception as e:

        print(
            "Error al eliminar apoderado:",
            e
        )

        return jsonify({
            "mensaje": "Error al eliminar apoderado",
            "error": str(e)
        }), 500


# ============================================================
# GRADOS Y SECCIONES
# ============================================================


# ============================================================
# LISTAR GRADOS Y SECCIONES
# GET /api/grados
# ============================================================

@app.route("/api/grados", methods=["GET"])
def obtener_grados():

    grados = gradoSeccionDAO.obtener_todos()

    datos = []

    for grado in grados:

        datos.append({
            "id": grado.id,
            "grado": grado.grado,
            "seccion": grado.seccion
        })

    return jsonify(datos)


# ============================================================
# MATRÍCULAS
# ============================================================


# ============================================================
# LISTAR MATRÍCULAS
# GET /api/matriculas
# ============================================================

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
                "apellidos": matricula.estudiante.apellidos,
                "id_apoderado":
                    matricula.estudiante.id_apoderado
            },

            "grado_seccion": {
                "id": matricula.grado_seccion.id,
                "grado":
                    matricula.grado_seccion.grado,
                "seccion":
                    matricula.grado_seccion.seccion
            }
        })

    return jsonify(datos)


# ============================================================
# REGISTRAR MATRÍCULA
# POST /api/matriculas
# ============================================================

@app.route("/api/matriculas", methods=["POST"])
def registrar_matricula():

    try:

        datos = request.get_json()

        if not datos:

            return jsonify({
                "mensaje": "No se recibieron datos"
            }), 400


        id_estudiante = datos.get(
            "id_estudiante"
        )

        id_grado_seccion = datos.get(
            "id_grado_seccion"
        )


        if not id_estudiante:

            return jsonify({
                "mensaje": "Debe seleccionar un estudiante"
            }), 400


        if not id_grado_seccion:

            return jsonify({
                "mensaje": "Debe seleccionar grado y sección"
            }), 400


        # Crear referencia al estudiante

        estudiante = Estudiante()

        estudiante.id = int(
            id_estudiante
        )


        # Crear referencia a grado/sección

        grado_seccion = GradoSeccion()

        grado_seccion.id = int(
            id_grado_seccion
        )


        # Crear objeto Matrícula

        matricula = Matricula(
            anio=datos.get("anio"),
            fecha=datos.get("fecha"),
            estado=datos.get("estado"),
            estudiante=estudiante,
            grado_seccion=grado_seccion
        )


        # Guardar mediante DAO

        matricula_guardada = matriculaDAO.insertar(
            matricula
        )


        if matricula_guardada is None:

            return jsonify({
                "mensaje":
                    "No se pudo registrar la matrícula"
            }), 400


        return jsonify({
            "mensaje":
                "Matrícula registrada correctamente",

            "id":
                matricula_guardada.id

        }), 201


    except Exception as e:

        print(
            "Error al registrar matrícula:",
            e
        )

        return jsonify({
            "mensaje":
                "Error al registrar matrícula",

            "error":
                str(e)

        }), 500


# ============================================================
# ACTUALIZAR MATRÍCULA
# PUT /api/matriculas/<id>
#
# Por ahora modifica solamente el estado.
# ============================================================

@app.route(
    "/api/matriculas/<int:id_matricula>",
    methods=["PUT"]
)
def actualizar_matricula(
    id_matricula
):

    try:

        datos = request.get_json()

        if not datos:

            return jsonify({
                "mensaje":
                    "No se recibieron datos"
            }), 400


        estado = datos.get(
            "estado"
        )


        if not estado:

            return jsonify({
                "mensaje":
                    "El estado es obligatorio"
            }), 400


        actualizado = matriculaDAO.actualizar(
            id_matricula,
            estado
        )


        if not actualizado:

            return jsonify({
                "mensaje":
                    "No se encontró la matrícula"
            }), 404


        return jsonify({
            "mensaje":
                "Matrícula actualizada correctamente"
        }), 200


    except Exception as e:

        print(
            "Error al actualizar matrícula:",
            e
        )

        return jsonify({
            "mensaje":
                "Error al actualizar matrícula",

            "error":
                str(e)

        }), 500


# ============================================================
# ELIMINAR MATRÍCULA
# DELETE /api/matriculas/<id>
# ============================================================

@app.route(
    "/api/matriculas/<int:id_matricula>",
    methods=["DELETE"]
)
def eliminar_matricula(
    id_matricula
):

    try:

        eliminado = matriculaDAO.eliminar(
            id_matricula
        )


        if not eliminado:

            return jsonify({
                "mensaje":
                    "No se pudo eliminar la matrícula"
            }), 400


        return jsonify({
            "mensaje":
                "Matrícula eliminada correctamente"
        }), 200


    except Exception as e:

        print(
            "Error al eliminar matrícula:",
            e
        )

        return jsonify({
            "mensaje":
                "Error al eliminar matrícula",

            "error":
                str(e)

        }), 500


# ============================================================
# PAGOS
# ============================================================


# ============================================================
# LISTAR PAGOS
# GET /api/pagos
# ============================================================

@app.route("/api/pagos", methods=["GET"])
def obtener_pagos():

    pagos = pagoDAO.obtener_todos()

    datos = []

    for pago in pagos:

        datos.append({
            "id": pago.id,
            "fecha": str(pago.fecha),
            "monto": float(pago.monto),
            "comprobante": pago.comprobante
        })

    return jsonify(datos)


# ============================================================
# DOCUMENTOS
# ============================================================


# ============================================================
# LISTAR DOCUMENTOS
# GET /api/documentos
# ============================================================

@app.route("/api/documentos", methods=["GET"])
def obtener_documentos():

    documentos = documentoDAO.obtener_todos()

    datos = []

    for documento in documentos:

        datos.append({
            "id": documento.id,
            "nombre": documento.nombre,
            "tipo": documento.tipo,
            "ruta": documento.ruta,
            "id_estudiante":
                documento.id_estudiante
        })

    return jsonify(datos)


# ============================================================
# EVENTOS
# ============================================================


# ============================================================
# LISTAR EVENTOS
# GET /api/eventos
# ============================================================

@app.route("/api/eventos", methods=["GET"])
def obtener_eventos():

    eventos = eventoDAO.obtener_todos()

    datos = []

    for evento in eventos:

        datos.append({
            "id": evento.id,
            "titulo": evento.titulo,
            "descripcion": evento.descripcion,
            "fecha": str(evento.fecha),
            "tipo": evento.tipo,
            "estado": evento.estado
        })

    return jsonify(datos)


# ============================================================
# EJECUTAR API
# ============================================================
#
# Esta sección SIEMPRE debe quedar al final.
#
# ============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )