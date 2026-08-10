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
#
# Los DAO realizan las operaciones sobre PostgreSQL.
#
# Flask → DAO → PostgreSQL
#
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
#
# Método:
# GET
#
# URL:
# http://127.0.0.1:5000/
#
# Permite comprobar que la API está funcionando.
#
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
# Obtiene los estudiantes registrados en PostgreSQL.
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
# Recibe desde React los datos de un estudiante y utiliza
# EstudianteDAO para guardarlo en PostgreSQL.
#
# ============================================================

@app.route("/api/estudiantes", methods=["POST"])
def registrar_estudiante():

    try:

        # Recibir los datos enviados por React
        datos = request.get_json()

        print("Datos recibidos:", datos)

        # Crear objeto Estudiante
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

        # Guardar estudiante en PostgreSQL
        estudiante_guardado = estudianteDAO.insertar(estudiante)

        # Verificar si se pudo registrar
        if estudiante_guardado is None:

            return jsonify({
                "mensaje": "No se pudo registrar el estudiante"
            }), 400

        # Respuesta exitosa
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
# Obtiene los apoderados registrados en PostgreSQL.
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
            "email": apoderado.email
        })

    return jsonify(datos)


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
# Obtiene las matrículas registradas en PostgreSQL.
#
# También envía la información del estudiante,
# apoderado, grado y sección.
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
# Obtiene los pagos registrados en PostgreSQL.
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
# Obtiene los documentos registrados en PostgreSQL.
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
# Obtiene los eventos del calendario registrados
# en PostgreSQL.
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
# Esta sección siempre debe estar al FINAL del archivo,
# después de todas las rutas.
#
# Servidor:
# http://127.0.0.1:5000
#
# ============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )