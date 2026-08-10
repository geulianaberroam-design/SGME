from persistencia.conexion import obtener_conexion
from modelos.matricula import Matricula
from modelos.estudiante import Estudiante
from modelos.grado_seccion import GradoSeccion


class MatriculaDAO:
    """
    Gestiona las operaciones CRUD de las matrículas
    almacenadas en PostgreSQL.
    """

    # ==========================================
    # CREATE
    # ==========================================

    def insertar(self, matricula: Matricula):
        """
        Registra una nueva matrícula en PostgreSQL.
        Verifica que existan el estudiante y
        el grado/sección.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:

            cursor = conexion.cursor()

            # Verificar estudiante
            if matricula.estudiante is None:
                raise Exception(
                    "La matrícula no tiene estudiante."
                )

            id_estudiante = matricula.estudiante.id

            if id_estudiante is None:
                raise Exception(
                    "El estudiante no tiene un ID válido."
                )

            cursor.execute(
                """
                SELECT id
                FROM estudiante
                WHERE id = %s;
                """,
                (id_estudiante,)
            )

            if cursor.fetchone() is None:
                raise Exception(
                    "El estudiante no existe."
                )

            # Verificar grado y sección
            if matricula.grado_seccion is None:
                raise Exception(
                    "La matrícula no tiene grado y sección."
                )

            id_grado_seccion = matricula.grado_seccion.id

            if id_grado_seccion is None:
                raise Exception(
                    "El grado y sección no tiene un ID válido."
                )

            cursor.execute(
                """
                SELECT id
                FROM grado_seccion
                WHERE id = %s;
                """,
                (id_grado_seccion,)
            )

            if cursor.fetchone() is None:
                raise Exception(
                    "El grado y sección no existe."
                )

            # Verificar matrícula duplicada
            cursor.execute(
                """
                SELECT id
                FROM matricula
                WHERE anio = %s
                AND id_estudiante = %s;
                """,
                (
                    matricula.anio,
                    id_estudiante
                )
            )

            if cursor.fetchone():
                raise Exception(
                    "El estudiante ya tiene una matrícula "
                    "registrada para ese año."
                )

            # Insertar matrícula
            sql = """
            INSERT INTO matricula
            (
                anio,
                fecha,
                estado,
                id_estudiante,
                id_grado_seccion
            )
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
            """

            cursor.execute(sql, (
                matricula.anio,
                matricula.fecha,
                matricula.estado,
                id_estudiante,
                id_grado_seccion
            ))

            matricula.id = cursor.fetchone()[0]

            conexion.commit()

            return matricula

        except Exception as e:

            conexion.rollback()

            print("Error:", e)

            return None

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # READ ALL
    # ==========================================

    def obtener_todos(self):
        """
        Devuelve todas las matrículas registradas.
        Incluye los datos del estudiante y
        grado/sección relacionados.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return []

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                m.id,
                m.anio,
                m.fecha,
                m.estado,

                e.id,
                e.dni,
                e.nombres,
                e.apellidos,
                e.telefono,
                e.email,
                e.fecha_nac,
                e.direccion,
                e.id_apoderado,

                gs.id,
                gs.grado,
                gs.seccion

            FROM matricula m

            INNER JOIN estudiante e
                ON m.id_estudiante = e.id

            INNER JOIN grado_seccion gs
                ON m.id_grado_seccion = gs.id

            ORDER BY m.id;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                estudiante = Estudiante(
                    dni=fila[5],
                    nombres=fila[6],
                    apellidos=fila[7],
                    telefono=fila[8],
                    email=fila[9],
                    fecha_nac=fila[10],
                    direccion=fila[11],
                    id_apoderado=fila[12]
                )

                estudiante.id = fila[4]

                grado_seccion = GradoSeccion(
                    grado=fila[14],
                    seccion=fila[15]
                )

                grado_seccion.id = fila[13]

                matricula = Matricula(
                    anio=fila[1],
                    fecha=fila[2],
                    estado=fila[3],
                    estudiante=estudiante,
                    grado_seccion=grado_seccion
                )

                matricula.id = fila[0]

                lista.append(matricula)

            return lista

        except Exception as e:

            print("Error:", e)

            return []

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # READ BY ID
    # ==========================================

    def buscar_por_id(self, id):
        """
        Busca una matrícula por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                m.id,
                m.anio,
                m.fecha,
                m.estado,

                e.id,
                e.dni,
                e.nombres,
                e.apellidos,
                e.telefono,
                e.email,
                e.fecha_nac,
                e.direccion,
                e.id_apoderado,

                gs.id,
                gs.grado,
                gs.seccion

            FROM matricula m

            INNER JOIN estudiante e
                ON m.id_estudiante = e.id

            INNER JOIN grado_seccion gs
                ON m.id_grado_seccion = gs.id

            WHERE m.id = %s;
            """

            cursor.execute(sql, (id,))

            fila = cursor.fetchone()

            if fila:

                estudiante = Estudiante(
                    dni=fila[5],
                    nombres=fila[6],
                    apellidos=fila[7],
                    telefono=fila[8],
                    email=fila[9],
                    fecha_nac=fila[10],
                    direccion=fila[11],
                    id_apoderado=fila[12]
                )

                estudiante.id = fila[4]

                grado_seccion = GradoSeccion(
                    grado=fila[14],
                    seccion=fila[15]
                )

                grado_seccion.id = fila[13]

                matricula = Matricula(
                    anio=fila[1],
                    fecha=fila[2],
                    estado=fila[3],
                    estudiante=estudiante,
                    grado_seccion=grado_seccion
                )

                matricula.id = fila[0]

                return matricula

            return None

        except Exception as e:

            print("Error:", e)

            return None

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # READ BY ESTUDIANTE
    # ==========================================

    def obtener_por_estudiante(self, id_estudiante):
        """
        Devuelve las matrículas de un estudiante.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return []

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                m.id,
                m.anio,
                m.fecha,
                m.estado,

                e.id,
                e.dni,
                e.nombres,
                e.apellidos,
                e.telefono,
                e.email,
                e.fecha_nac,
                e.direccion,
                e.id_apoderado,

                gs.id,
                gs.grado,
                gs.seccion

            FROM matricula m

            INNER JOIN estudiante e
                ON m.id_estudiante = e.id

            INNER JOIN grado_seccion gs
                ON m.id_grado_seccion = gs.id

            WHERE m.id_estudiante = %s

            ORDER BY m.id;
            """

            cursor.execute(sql, (id_estudiante,))

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                estudiante = Estudiante(
                    dni=fila[5],
                    nombres=fila[6],
                    apellidos=fila[7],
                    telefono=fila[8],
                    email=fila[9],
                    fecha_nac=fila[10],
                    direccion=fila[11],
                    id_apoderado=fila[12]
                )

                estudiante.id = fila[4]

                grado_seccion = GradoSeccion(
                    grado=fila[14],
                    seccion=fila[15]
                )

                grado_seccion.id = fila[13]

                matricula = Matricula(
                    anio=fila[1],
                    fecha=fila[2],
                    estado=fila[3],
                    estudiante=estudiante,
                    grado_seccion=grado_seccion
                )

                matricula.id = fila[0]

                lista.append(matricula)

            return lista

        except Exception as e:

            print("Error:", e)

            return []

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # UPDATE
    # ==========================================

    def actualizar(self, id, estado):
        """
        Actualiza el estado de una matrícula.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            UPDATE matricula
            SET estado = %s
            WHERE id = %s;
            """

            cursor.execute(sql, (
                estado,
                id
            ))

            conexion.commit()

            return cursor.rowcount > 0

        except Exception as e:

            conexion.rollback()

            print("Error:", e)

            return False

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # DELETE
    # ==========================================

    def eliminar(self, id):
        """
        Elimina una matrícula por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            DELETE FROM matricula
            WHERE id = %s;
            """

            cursor.execute(sql, (id,))

            conexion.commit()

            return cursor.rowcount > 0

        except Exception as e:

            conexion.rollback()

            print("Error:", e)

            return False

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # COUNT
    # ==========================================

    def total(self):
        """
        Devuelve la cantidad total de matrículas.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return 0

        cursor = None

        try:

            cursor = conexion.cursor()

            cursor.execute(
                "SELECT COUNT(*) FROM matricula;"
            )

            return cursor.fetchone()[0]

        except Exception as e:

            print("Error:", e)

            return 0

        finally:

            if cursor:
                cursor.close()

            conexion.close()