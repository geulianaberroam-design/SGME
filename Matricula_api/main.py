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

from config.logger import logger
from config.sistema_config import SistemaConfig


# ==========================================
# CONFIGURACIÓN DEL SISTEMA
# ==========================================

config = SistemaConfig()


# ==========================================
# CREACIÓN DE LOS DAO
# ==========================================

apoderadoDAO = ApoderadoDAO()
estudianteDAO = EstudianteDAO()
gradoDAO = GradoSeccionDAO()
matriculaDAO = MatriculaDAO()
pagoDAO = PagoDAO()
documentoDAO = DocumentoDAO()


# ==========================================
# MENÚ PRINCIPAL
# ==========================================

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


    # ==========================================
    # REGISTRAR APODERADO
    # ==========================================

    match opcion:

        case "1":

            print("\n--- REGISTRAR APODERADO ---")

            dni = input("DNI: ")
            nombres = input("Nombres: ")
            apellidos = input("Apellidos: ")
            telefono = input("Teléfono: ")
            email = input("Email: ")

            apoderado = Apoderado(
                dni=dni,
                nombres=nombres,
                apellidos=apellidos,
                telefono=telefono,
                email=email
            )

            resultado = apoderadoDAO.insertar(apoderado)

            if resultado:
                logger.info("Se registró un apoderado.")
                print("Apoderado registrado correctamente.")
            else:
                logger.error("No se pudo registrar el apoderado.")
                print("No se pudo registrar el apoderado.")


        # ==========================================
        # REGISTRAR ESTUDIANTE
        # ==========================================

        case "2":

            print("\n--- REGISTRAR ESTUDIANTE ---")

            dni = input("DNI: ")
            nombres = input("Nombres: ")
            apellidos = input("Apellidos: ")
            telefono = input("Teléfono: ")
            email = input("Email: ")
            fecha_nac = input("Fecha de nacimiento (YYYY-MM-DD): ")
            direccion = input("Dirección: ")

            estudiante = Estudiante(
                dni=dni,
                nombres=nombres,
                apellidos=apellidos,
                telefono=telefono,
                email=email,
                fecha_nac=fecha_nac,
                direccion=direccion,
                id_apoderado=None
            )

            resultado = estudianteDAO.insertar(estudiante)

            if resultado:

                logger.info(
                    f"Se registró un estudiante: "
                    f"{estudiante.obtener_nombre_completo()}"
                )

                print("\nEstudiante registrado correctamente.")
                print("ID asignado:", estudiante.id)

            else:

                logger.error("No se pudo registrar el estudiante.")
                print("\nNo se pudo registrar el estudiante.")


        # ==========================================
        # GRADO Y SECCIÓN
        # ==========================================

        case "3":

            print("\n--- GRADO Y SECCIÓN ---")
            print("Función en proceso...")


        # ==========================================
        # MATRÍCULA
        # ==========================================

        case "4":

            print("\n--- MATRÍCULA ---")
            print("Función en proceso...")


        # ==========================================
        # PAGO
        # ==========================================

        case "5":

            print("\n--- PAGO ---")
            print("Función en proceso...")


        # ==========================================
        # DOCUMENTO
        # ==========================================

        case "6":

            print("\n--- DOCUMENTO ---")
            print("Función en proceso...")


        # ==========================================
        # LISTAR APODERADOS
        # ==========================================

        case "7":

            print("\n========== LISTA DE APODERADOS ==========")

            apoderados = apoderadoDAO.obtener_todos()

            if not apoderados:

                print("No hay apoderados registrados.")

            else:

                for apoderado in apoderados:
                    print(apoderado)


        # ==========================================
        # MOSTRAR LOGS
        # ==========================================

        case "8":

            print("\n========== LOGS ==========")

            try:

                with open(
                    "logs/app.log",
                    "r",
                    encoding="utf-8"
                ) as archivo:

                    contenido = archivo.read()

                    if contenido:
                        print(contenido)
                    else:
                        print("No existen registros.")

            except FileNotFoundError:

                print("No existen logs todavía.")


        # ==========================================
        # SALIR
        # ==========================================

        case "0":

            logger.info("El usuario salió del sistema.")

            print("\nGracias por usar el sistema.")
            break


        # ==========================================
        # OPCIÓN INVÁLIDA
        # ==========================================

        case _:

            print("\nOpción inválida.")