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
    print(config.nombre_sistema)
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

            # Buscar apoderado por DNI
            dni_apoderado = input("DNI del apoderado: ")

            apoderado = apoderadoDAO.buscar_por_dni(dni_apoderado)

            if not apoderado:

                print("\nNo existe un apoderado con ese DNI.")

                logger.warning(
                    f"No se encontró el apoderado con DNI {dni_apoderado}."
                )

                continue

            print(
                f"\nApoderado encontrado: "
                f"{apoderado.nombres} {apoderado.apellidos}"
            )

            print(f"ID del apoderado: {apoderado.id}")

            # Crear estudiante relacionado con el apoderado
            estudiante = Estudiante(
                dni=dni,
                nombres=nombres,
                apellidos=apellidos,
                telefono=telefono,
                email=email,
                fecha_nac=fecha_nac,
                direccion=direccion,
                id_apoderado=apoderado.id
            )

            resultado = estudianteDAO.insertar(estudiante)

            if resultado:

                logger.info(
                    f"Se registró un estudiante: "
                    f"{estudiante.obtener_nombre_completo()}"
                )

                print("\nEstudiante registrado correctamente.")
                print("ID asignado:", estudiante.id)
                print(
                    "Apoderado:",
                    apoderado.nombres,
                    apoderado.apellidos
                )

            else:

                logger.error("No se pudo registrar el estudiante.")

                print("\nNo se pudo registrar el estudiante.")

        # ==========================================
        # GRADO Y SECCIÓN
        # ==========================================

        case "3":

            print("\n--- REGISTRAR GRADO Y SECCIÓN ---")

            grado = input("Grado: ")
            seccion = input("Sección: ")

            grado_seccion = GradoSeccion(
                grado=grado,
                seccion=seccion
            )

            resultado = gradoDAO.insertar(grado_seccion)

            if resultado:

                logger.info(
                    f"Se registró el grado y sección: "
                    f"{grado_seccion.obtener_descripcion()}"
                )

                print("\nGrado y sección registrados correctamente.")
                print("ID asignado:", grado_seccion.id)

            else:

                logger.error(
                    "No se pudo registrar el grado y sección."
                )

                print("\nNo se pudo registrar el grado y sección.")

        

        # ==========================================
        # MATRÍCULA
        # ==========================================

        case "4":

            print("\n--- REGISTRAR MATRÍCULA ---")

            # Buscar estudiante
            dni_estudiante = input("DNI del estudiante: ")

            estudiante = estudianteDAO.buscar_por_dni(dni_estudiante)

            if estudiante is None:

                print("\nNo se encontró un estudiante con ese DNI.")
                logger.warning(
                    f"No se encontró estudiante con DNI {dni_estudiante}."
                )

                continue

            print(
                "\nEstudiante encontrado:",
                estudiante.obtener_nombre_completo()
            )

            print("ID del estudiante:", estudiante.id)

            # Buscar grado y sección
            grado = input("\nGrado: ")
            seccion = input("Sección: ")

            grado_seccion = gradoDAO.buscar_por_grado_seccion(
                grado,
                seccion.upper()
            )

            if grado_seccion is None:

                print("\nNo se encontró ese grado y sección.")
                logger.warning(
                    f"No se encontró grado/sección: "
                    f"{grado} - {seccion}"
                )

                continue

            print(
                "Grado y sección encontrados:",
                grado_seccion.obtener_descripcion()
            )

            print("ID del grado/sección:", grado_seccion.id)

            # Datos de la matrícula
            anio = input("\nAño escolar: ")
            fecha = input(
                "Fecha de matrícula (YYYY-MM-DD): "
            )
            estado = input(
                "Estado de matrícula: "
            )

            # Crear matrícula
            matricula = Matricula(
                anio=int(anio),
                fecha=fecha,
                estado=estado,
                estudiante=estudiante,
                grado_seccion=grado_seccion
            )

            # Guardar en PostgreSQL
            resultado = matriculaDAO.insertar(matricula)

            if resultado:

                logger.info(
                    f"Se registró matrícula ID {matricula.id} "
                    f"para {estudiante.obtener_nombre_completo()}."
                )

                print("\n===================================")
                print("MATRÍCULA REGISTRADA CORRECTAMENTE")
                print("===================================")
                print("ID matrícula:", matricula.id)
                print(
                    "Estudiante:",
                    estudiante.obtener_nombre_completo()
                )
                print(
                    "Grado y sección:",
                    grado_seccion.obtener_descripcion()
                )
                print("Año:", matricula.anio)
                print("Fecha:", matricula.fecha)
                print("Estado:", matricula.estado)

            else:

                logger.error(
                    "No se pudo registrar la matrícula."
                )

                print("\nNo se pudo registrar la matrícula.")

            # ==========================================
            # PAGO
            # ==========================================

        case "5":

            print("\n--- REGISTRAR PAGO ---")

            # Buscar matrícula
            id_matricula = input("ID de matrícula: ")

            try:
                matricula = matriculaDAO.buscar_por_id(
                    int(id_matricula)
                )

            except ValueError:
                print("\nID de matrícula inválido. Debe ser un número.")
                logger.warning(f"ID de matrícula inválido: {id_matricula}")
                continue

            if matricula is None:

                print("\nNo existe una matrícula con ese ID.")

                logger.warning(
                    f"No se encontró matrícula con ID {id_matricula}."
                )

                continue

            print("\nMatrícula encontrada:")
            print(
                "Estudiante:",
                matricula.estudiante.obtener_nombre_completo()
            )

            print(
                "Grado y sección:",
                matricula.grado_seccion.obtener_descripcion()
            )

            print(
                "Año:",
                matricula.anio
            )

            # Datos del pago
            fecha = input(
                "\nFecha del pago (YYYY-MM-DD): "
            )

            monto = input(
                "Monto del pago: "
            )

            comprobante = input(
                "Número de comprobante: "
            )

            try:
                # Crear objeto Pago
                pago = Pago(
                    fecha=fecha,
                    monto=float(monto),
                    comprobante=comprobante,
                    matricula=matricula
                )

            except ValueError:
                print(
                    "\nError: el ID de matrícula y el monto "
                    "deben tener un formato válido."
                )
                continue

            # Guardar en PostgreSQL
            resultado = pagoDAO.insertar(pago)

            if resultado:

                logger.info(
                    f"Se registró pago ID {pago.id} "
                    f"para matrícula {matricula.id}."
                )

                print("\n===================================")
                print("PAGO REGISTRADO CORRECTAMENTE")
                print("===================================")
                print("ID pago:", pago.id)
                print(
                    "Estudiante:",
                    matricula.estudiante.obtener_nombre_completo()
                )
                print("Matrícula:", matricula.id)
                print("Fecha:", pago.fecha)
                print(f"Monto: S/. {pago.monto:.2f}")
                print("Comprobante:", pago.comprobante)

            else:

                logger.error(
                    "No se pudo registrar el pago."
                )

                print("\nNo se pudo registrar el pago.")

            # ==========================================
            # DOCUMENTO
            # ==========================================

        case "6":

            print("\n--- REGISTRAR DOCUMENTO ---")

            # Buscar estudiante
            dni_estudiante = input("DNI del estudiante: ")

            estudiante = estudianteDAO.buscar_por_dni(
                dni_estudiante
            )

            if estudiante is None:

                print(
                    "\nNo se encontró un estudiante con ese DNI."
                )

                logger.warning(
                    f"No se encontró estudiante con DNI "
                    f"{dni_estudiante}."
                )

                continue

            print(
                "\nEstudiante encontrado:",
                estudiante.obtener_nombre_completo()
            )

            print(
                "ID del estudiante:",
                estudiante.id
            )

            # Datos del documento
            nombre = input(
                "\nNombre del documento: "
            )

            tipo = input(
                "Tipo de documento: "
            )

            ruta = input(
                "Ruta del documento: "
            )

            # Crear documento
            documento = Documento(
                nombre=nombre,
                tipo=tipo,
                ruta=ruta,
                id_estudiante=estudiante.id
            )

            # Guardar en PostgreSQL
            resultado = documentoDAO.insertar(
                documento
            )

            if resultado:

                logger.info(
                    f"Se registró documento ID "
                    f"{documento.id} para el estudiante "
                    f"{estudiante.obtener_nombre_completo()}."
                )

                print("\n===================================")
                print("DOCUMENTO REGISTRADO CORRECTAMENTE")
                print("===================================")
                print("ID documento:", documento.id)
                print(
                    "Estudiante:",
                    estudiante.obtener_nombre_completo()
                )
                print("Nombre:", documento.nombre)
                print("Tipo:", documento.tipo)
                print("Ruta:", documento.ruta)

            else:

                logger.error(
                    "No se pudo registrar el documento."
                )

                print(
                    "\nNo se pudo registrar el documento."
                )

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