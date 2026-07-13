from persistencia.inicializar_bd import inicializar_bd

from dao.apoderado_dao import ApoderadoDAO
from dao.estudiante_dao import EstudianteDAO
from dao.grado_seccion_dao import GradoSeccionDAO
from dao.matricula_dao import MatriculaDAO
from dao.pago_dao import PagoDAO
from dao.documento_dao import DocumentoDAO

from modelos.apoderado import Apoderado
from modelos.estudiante import Estudiante
from modelos.grado_seccion import GradoSeccion
from modelos.matricula import Matricula
from modelos.pago import Pago
from modelos.documento import Documento
from config.logger import Logger
from config.sistema_config import SistemaConfig

# Crear la base de datos
inicializar_bd()

logger = Logger()
config = SistemaConfig()

apoderadoDAO = ApoderadoDAO()
estudianteDAO = EstudianteDAO()
gradoDAO = GradoSeccionDAO()
matriculaDAO = MatriculaDAO()
pagoDAO = PagoDAO()
documentoDAO = DocumentoDAO()


while True:

    print("\n===================================")
    print(config.nombre)
    print("Versión:", config.version)
    print("===================================")

    print("1. Registrar Apoderado")
    print("2. Registrar Estudiante")
    print("3. Registrar Grado y Sección")
    print("4. Registrar Matrícula")
    print("5. Registrar Pago")
    print("6. Registrar Documento")
    print("7. Listar Apoderados")
    print("8. Mostrar Logs")
    print("0. Salir")

    opcion = input("Seleccione una opción: ")

    match opcion:

        case "1":

            dni = input("DNI: ")
            nombres = input("Nombres: ")
            apellidos = input("Apellidos: ")
            telefono = input("Teléfono: ")
            email = input("Email: ")

            apoderado = Apoderado(
                dni,
                nombres,
                apellidos,
                telefono,
                email
            )

            apoderadoDAO.insertar(apoderado)

            logger.info("Se registró un apoderado.")

            print("Apoderado registrado correctamente.")

        case "2":

            print("Función en proceso...")

        case "3":

            print("Función en proceso...")

        case "4":

            print("Función en proceso...")

        case "5":

            print("Función en proceso...")

        case "6":

            print("Función en proceso...")

        case "7":

            print("\nLISTA DE APODERADOS")

            for apoderado in apoderadoDAO.obtener_todos():
                print(apoderado)

        case "8":

            logger.mostrar_logs()

        case "0":

            print("Gracias por usar el sistema.")
            break

        case _:

            print("Opción inválida.")