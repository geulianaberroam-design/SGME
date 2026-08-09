from persistencia.conexion import obtener_conexion
from modelos.grado_seccion import GradoSeccion


class GradoSeccionDAO:
    """
    Gestiona las operaciones CRUD de los grados y secciones
    almacenados en PostgreSQL.
    """

    # ==========================================
    # CREATE
    # ==========================================

    def insertar(self, grado_seccion: GradoSeccion):
        """
        Registra un nuevo grado y sección.
        Verifica que no exista un registro duplicado.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:

            cursor = conexion.cursor()

            # Verificar duplicado
            cursor.execute(
                """
                SELECT id
                FROM grado_seccion
                WHERE grado = %s
                AND seccion = %s;
                """,
                (
                    grado_seccion.grado,
                    grado_seccion.seccion
                )
            )

            if cursor.fetchone():
                raise Exception(
                    "El grado y sección ya existen."
                )

            # Insertar
            sql = """
            INSERT INTO grado_seccion
            (grado, seccion)
            VALUES (%s, %s)
            RETURNING id;
            """

            cursor.execute(sql, (
                grado_seccion.grado,
                grado_seccion.seccion
            ))

            grado_seccion.id = cursor.fetchone()[0]

            conexion.commit()

            return grado_seccion

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
        Devuelve todos los grados y secciones.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return []

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                id,
                grado,
                seccion
            FROM grado_seccion
            ORDER BY id;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                grado_seccion = GradoSeccion(
                    grado=fila[1],
                    seccion=fila[2]
                )

                grado_seccion.id = fila[0]

                lista.append(grado_seccion)

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
        Busca un grado y sección por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                id,
                grado,
                seccion
            FROM grado_seccion
            WHERE id = %s;
            """

            cursor.execute(sql, (id,))

            fila = cursor.fetchone()

            if fila:

                grado_seccion = GradoSeccion(
                    grado=fila[1],
                    seccion=fila[2]
                )

                grado_seccion.id = fila[0]

                return grado_seccion

            return None

        except Exception as e:

            print("Error:", e)

            return None

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # READ BY GRADO Y SECCIÓN
    # ==========================================

    def buscar_por_grado_seccion(self, grado, seccion):
        """
        Busca un grado y sección específicos.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                id,
                grado,
                seccion
            FROM grado_seccion
            WHERE grado = %s
            AND seccion = %s;
            """

            cursor.execute(sql, (
                grado,
                seccion
            ))

            fila = cursor.fetchone()

            if fila:

                grado_seccion = GradoSeccion(
                    grado=fila[1],
                    seccion=fila[2]
                )

                grado_seccion.id = fila[0]

                return grado_seccion

            return None

        except Exception as e:

            print("Error:", e)

            return None

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # UPDATE
    # ==========================================

    def actualizar(self, id, grado, seccion):
        """
        Actualiza el grado y la sección.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            # Verificar duplicado
            cursor.execute(
                """
                SELECT id
                FROM grado_seccion
                WHERE grado = %s
                AND seccion = %s
                AND id <> %s;
                """,
                (
                    grado,
                    seccion,
                    id
                )
            )

            if cursor.fetchone():

                print(
                    "El grado y sección ya existen."
                )

                return False

            sql = """
            UPDATE grado_seccion
            SET
                grado = %s,
                seccion = %s
            WHERE id = %s;
            """

            cursor.execute(sql, (
                grado,
                seccion,
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
        Elimina un grado y sección por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            DELETE FROM grado_seccion
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
        Devuelve la cantidad total de grados y secciones.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return 0

        cursor = None

        try:

            cursor = conexion.cursor()

            cursor.execute(
                "SELECT COUNT(*) FROM grado_seccion;"
            )

            return cursor.fetchone()[0]

        except Exception as e:

            print("Error:", e)

            return 0

        finally:

            if cursor:
                cursor.close()

            conexion.close()