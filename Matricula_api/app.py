# ============================================================
# BACKEND PRINCIPAL - SGME
# Sistema de Gestión de Matrícula Escolar
# ============================================================
#
# Este archivo contiene el servidor Backend desarrollado
# utilizando Python y Flask.
#
# Su función principal es conectar:
#
#       REACT → FLASK → DAO → POSTGRESQL
#
# Módulos gestionados:
# - Estudiantes
# - Apoderados
# - Matrículas
# - Pagos
# - Documentos
# - Eventos
#
# ============================================================


# ============================================================
# IMPORTACIÓN DE FLASK
# ============================================================

from flask import Flask, jsonify, request
from flask_cors import CORS


# ============================================================
# IMPORTACIÓN DE MODELOS
# ============================================================

from modelos.estudiante import Estudiante
from modelos.apoderado import Apoderado


# ============================================================
# IMPORTACIÓN DE LOS DAO
# ============================================================

from dao.estudiante_dao import EstudianteDAO
from dao.apoderado_dao import ApoderadoDAO
from dao.matricula_dao import MatriculaDAO
from dao.pago_dao import PagoDAO
from dao.documento_dao import DocumentoDAO
from dao.evento_dao import EventoDAO


# ============================================================
# CREACIÓN DE LA APLICACIÓN FLASK
# ============================================================

app = Flask(__name__)


# ============================================================
# CONFIGURACIÓN CORS
# ============================================================
#
# Permite que React pueda comunicarse con Flask.
#
# React:
# http://localhost:5173
# http://localhost:5174
#
# Flask:
# http://127.0.0.1:5000
#
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
# CREACIÓN DE LOS DAO
# ============================================================

estudianteDAO = EstudianteDAO()
apoderadoDAO = ApoderadoDAO()
matriculaDAO = MatriculaDAO()
pagoDAO = PagoDAO()
documentoDAO = DocumentoDAO()
eventoDAO = EventoDAO()


# ============================================================
# RUTA DE INICIO
# ============================================================

@app.route("/")
def inicio():

    return {
        "mensaje": "API SGME funcionando correctamente"
    }


# ============================================================
# LISTAR ESTUDIANTES
# ============================================================
#
# Método:
# GET
#
# URL:
# /api/estudiantes
#
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
# ============================================================
#
# Método:
# POST
#
# URL:
# /api/estudiantes
#
# ============================================================

@app.route("/api/estudiantes", methods=["POST"])
def registrar_estudiante():

    try:

        datos = request.get_json()

        print("Datos recibidos:", datos)

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

        estudiante_guardado = estudianteDAO.insertar(estudiante)

        if estudiante_guardado is None:

            return jsonify({
                "mensaje": "No se pudo registrar el estudiante"
            }), 400

        return jsonify({
            "mensaje": "Estudiante registrado correctamente",
            "id": estudiante_guardado.id
        }), 201

    except Exception as e:

        print("Error al registrar estudiante:", e)

        return jsonify({
            "mensaje": "Error al registrar estudiante",
            "error": str(e)
        }), 500


# ============================================================
# LISTAR APODERADOS
# ============================================================
#
# Método:
# GET
#
# URL:
# /api/apoderados
#
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
# ============================================================
#
# Método:
# POST
#
# URL:
# /api/apoderados
#
# Recibe los datos enviados desde React.
# Convierte el JSON en un objeto Apoderado.
# Luego utiliza ApoderadoDAO para guardar en PostgreSQL.
#
# ============================================================

@app.route("/api/apoderados", methods=["POST"])
def registrar_apoderado():

    try:

        # Recibir JSON desde React
        datos = request.get_json()

        print("Datos del apoderado recibidos:", datos)

        if not datos:

            return jsonify({
                "mensaje": "No se recibieron datos del apoderado"
            }), 400


        # Validar campos obligatorios
        if not datos.get("dni"):

            return jsonify({
                "mensaje": "El DNI es obligatorio"
            }), 400


        if not datos.get("nombres"):

            return jsonify({
                "mensaje": "Los nombres son obligatorios"
            }), 400


        if not datos.get("apellidos"):

            return jsonify({
                "mensaje": "Los apellidos son obligatorios"
            }), 400


        # Convertir diccionario JSON a objeto Apoderado
        apoderado = Apoderado.from_dict(datos)


        # Guardar mediante DAO
        apoderado_guardado = apoderadoDAO.insertar(apoderado)


        # Verificar resultado
        if apoderado_guardado is None:

            return jsonify({
                "mensaje": "No se pudo registrar el apoderado"
            }), 400


        # Respuesta exitosa
        return jsonify({
            "mensaje": "Apoderado registrado correctamente",
            "apoderado": apoderado_guardado.to_dict()
        }), 201


    except Exception as e:

        print("Error al registrar apoderado:", e)

        return jsonify({
            "mensaje": "Error al registrar apoderado",
            "error": str(e)
        }), 500

    # ============================================================
# ACTUALIZAR APODERADO
# ============================================================
#
# Método:
# PUT
#
# URL:
# /api/apoderados/<id>
#
# ============================================================

@app.route("/api/apoderados/<int:id_apoderado>", methods=["PUT"])
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

        print("Error al actualizar apoderado:", e)

        return jsonify({
            "mensaje": "Error al actualizar apoderado",
            "error": str(e)
        }), 500


# ============================================================
# ELIMINAR APODERADO
# ============================================================
#
# Método:
# DELETE
#
# URL:
# /api/apoderados/<id>
#
# ============================================================

@app.route("/api/apoderados/<int:id_apoderado>", methods=["DELETE"])
def eliminar_apoderado(id_apoderado):

    try:

        eliminado = apoderadoDAO.eliminar(id_apoderado)

        if not eliminado:
            return jsonify({
                "mensaje": "No se encontró el apoderado"
            }), 404

        return jsonify({
            "mensaje": "Apoderado eliminado correctamente"
        }), 200

    except Exception as e:

        print("Error al eliminar apoderado:", e)

        return jsonify({
            "mensaje": "Error al eliminar apoderado",
            "error": str(e)
        }), 500


# ============================================================
# LISTAR MATRÍCULAS
# ============================================================
#
# Método:
# GET
#
# URL:
# /api/matriculas
#
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
                "id_apoderado": matricula.estudiante.id_apoderado
            },

            "grado_seccion": {
                "id": matricula.grado_seccion.id,
                "grado": matricula.grado_seccion.grado,
                "seccion": matricula.grado_seccion.seccion
            }
        })

    return jsonify(datos)


# ============================================================
# LISTAR PAGOS
# ============================================================
#
# Método:
# GET
#
# URL:
# /api/pagos
#
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
# LISTAR DOCUMENTOS
# ============================================================
#
# Método:
# GET
#
# URL:
# /api/documentos
#
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
            "id_estudiante": documento.id_estudiante
        })

    return jsonify(datos)


# ============================================================
# LISTAR EVENTOS
# ============================================================
#
# Método:
# GET
#
# URL:
# /api/eventos
#
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
# IMPORTANTE:
# Esta sección siempre debe estar al FINAL.
#
# ============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )