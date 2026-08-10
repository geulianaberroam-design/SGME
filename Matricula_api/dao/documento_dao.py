from persistencia.conexion import obtener_conexion
from modelos.documento import Documento


class DocumentoDAO:
    """
    Gestiona las operaciones CRUD de los documentos
    almacenados en PostgreSQL.
    """

    # ==========================================
    # CREATE
    # ==========================================

    def insertar(self, documento: Documento):
        """
        Registra un nuevo documento en PostgreSQL.
        Verifica que exista el estudiante.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:

            cursor = conexion.cursor()

            # Verificar estudiante
            if documento.id_estudiante is None:
                raise Exception(
                    "El documento no tiene un estudiante asociado."
                )

            cursor.execute(
                """
                SELECT id
                FROM estudiante
                WHERE id = %s;
                """,
                (documento.id_estudiante,)
            )

            if cursor.fetchone() is None:
                raise Exception(
                    "El estudiante no existe."
                )

            # Insertar documento
            sql = """
            INSERT INTO documento
            (
                nombre,
                tipo,
                ruta,
                id_estudiante
            )
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """

            cursor.execute(sql, (
                documento.nombre,
                documento.tipo,
                documento.ruta,
                documento.id_estudiante
            ))

            documento.id = cursor.fetchone()[0]

            conexion.commit()

            return documento

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
        Devuelve todos los documentos registrados.
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
                nombre,
                tipo,
                ruta,
                id_estudiante
            FROM documento
            ORDER BY id;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                documento = Documento(
                    id=fila[0],
                    nombre=fila[1],
                    tipo=fila[2],
                    ruta=fila[3],
                    id_estudiante=fila[4]
                )

                lista.append(documento)

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
        Busca un documento por su ID.
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
                nombre,
                tipo,
                ruta,
                id_estudiante
            FROM documento
            WHERE id = %s;
            """

            cursor.execute(sql, (id,))

            fila = cursor.fetchone()

            if fila:

                documento = Documento(
                    id=fila[0],
                    nombre=fila[1],
                    tipo=fila[2],
                    ruta=fila[3],
                    id_estudiante=fila[4]
                )

                return documento

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
        Devuelve los documentos de un estudiante.
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
                nombre,
                tipo,
                ruta,
                id_estudiante
            FROM documento
            WHERE id_estudiante = %s
            ORDER BY id;
            """

            cursor.execute(sql, (id_estudiante,))

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                documento = Documento(
                    id=fila[0],
                    nombre=fila[1],
                    tipo=fila[2],
                    ruta=fila[3],
                    id_estudiante=fila[4]
                )

                lista.append(documento)

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

    def actualizar(self, id, nombre, tipo, ruta):
        """
        Actualiza los datos de un documento.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            UPDATE documento
            SET nombre = %s,
                tipo = %s,
                ruta = %s
            WHERE id = %s;
            """

            cursor.execute(sql, (
                nombre,
                tipo,
                ruta,
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
        Elimina un documento por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            DELETE FROM documento
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
        Devuelve la cantidad total de documentos.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return 0

        cursor = None

        try:

            cursor = conexion.cursor()

            cursor.execute(
                "SELECT COUNT(*) FROM documento;"
            )

            return cursor.fetchone()[0]

        except Exception as e:

            print("Error:", e)

            return 0

        finally:

            if cursor:
                cursor.close()

            conexion.close()