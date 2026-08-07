from persistencia.conexion import obtener_conexion
from modelos.apoderado import Apoderado


class ApoderadoDAO:

    # CREATE
    def insertar(self, apoderado: Apoderado):
        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:
            cursor = conexion.cursor()

            sql = """
            INSERT INTO apoderado
            (dni, nombres, apellidos, telefono, email, parentesco)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
            """

            cursor.execute(sql, (
                apoderado.dni,
                apoderado.nombres,
                apoderado.apellidos,
                apoderado.telefono,
                apoderado.email,
                apoderado.parentesco
            ))

            apoderado.id = cursor.fetchone()[0]

            conexion.commit()

            return apoderado

        except Exception as e:
            if conexion:
                conexion.rollback()
            print("Error:", e)
            return None

        finally:
            if cursor:
                cursor.close()
            conexion.close()

    # READ ALL
    def obtener_todos(self):

        conexion = obtener_conexion()

        if conexion is None:
            return []

        cursor = None

        try:
            cursor = conexion.cursor()

            sql = """
            SELECT id,dni,nombres,apellidos,telefono,email,parentesco
            FROM apoderado
            ORDER BY id;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                apoderado = Apoderado(
                    fila[1],
                    fila[2],
                    fila[3],
                    fila[4],
                    fila[5],
                    fila[6]
                )

                apoderado.id = fila[0]

                lista.append(apoderado)

            return lista

        except Exception as e:
            print("Error:", e)
            return []

        finally:
            if cursor:
                cursor.close()
            conexion.close()

    # READ BY ID
    def buscar_por_id(self, id_apoderado):

        conexion = obtener_conexion()

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT id,dni,nombres,apellidos,telefono,email,parentesco
            FROM apoderado
            WHERE id=%s;
            """

            cursor.execute(sql, (id_apoderado,))

            fila = cursor.fetchone()

            if fila:

                apoderado = Apoderado(
                    fila[1],
                    fila[2],
                    fila[3],
                    fila[4],
                    fila[5],
                    fila[6]
                )

                apoderado.id = fila[0]

                return apoderado

            return None

        except Exception as e:
            print("Error:", e)
            return None

        finally:
            cursor.close()
            conexion.close()

    # READ BY DNI
    def buscar_por_dni(self, dni):

        conexion = obtener_conexion()

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT id,dni,nombres,apellidos,telefono,email,parentesco
            FROM apoderado
            WHERE dni=%s;
            """

            cursor.execute(sql, (dni,))

            fila = cursor.fetchone()

            if fila:

                apoderado = Apoderado(
                    fila[1],
                    fila[2],
                    fila[3],
                    fila[4],
                    fila[5],
                    fila[6]
                )

                apoderado.id = fila[0]

                return apoderado

            return None

        except Exception as e:
            print("Error:", e)
            return None

        finally:
            cursor.close()
            conexion.close()

    # UPDATE
    def actualizar(self, id_apoderado, telefono, email):

        conexion = obtener_conexion()

        try:

            cursor = conexion.cursor()

            sql = """
            UPDATE apoderado
            SET telefono=%s,
                email=%s
            WHERE id=%s;
            """

            cursor.execute(sql, (
                telefono,
                email,
                id_apoderado
            ))

            conexion.commit()

            return cursor.rowcount > 0

        except Exception as e:
            conexion.rollback()
            print("Error:", e)
            return False

        finally:
            cursor.close()
            conexion.close()

    # UPDATE COMPLETO
    def actualizar_completo(self, id_apoderado, datos_nuevos):

        conexion = obtener_conexion()

        try:

            cursor = conexion.cursor()

            sql = """
            UPDATE apoderado
            SET nombres=%s,
                apellidos=%s,
                telefono=%s,
                email=%s,
                parentesco=%s
            WHERE id=%s;
            """

            cursor.execute(sql, (
                datos_nuevos["nombres"],
                datos_nuevos["apellidos"],
                datos_nuevos["telefono"],
                datos_nuevos["email"],
                datos_nuevos["parentesco"],
                id_apoderado
            ))

            conexion.commit()

            return cursor.rowcount > 0

        except Exception as e:
            conexion.rollback()
            print("Error:", e)
            return False

        finally:
            cursor.close()
            conexion.close()

    # DELETE
    def eliminar(self, id_apoderado):

        conexion = obtener_conexion()

        try:

            cursor = conexion.cursor()

            sql = """
            DELETE FROM apoderado
            WHERE id=%s;
            """

            cursor.execute(sql, (id_apoderado,))

            conexion.commit()

            return cursor.rowcount > 0

        except Exception as e:
            conexion.rollback()
            print("Error:", e)
            return False

        finally:
            cursor.close()
            conexion.close()

    # COUNT
    def total(self):

        conexion = obtener_conexion()

        try:

            cursor = conexion.cursor()

            cursor.execute("SELECT COUNT(*) FROM apoderado;")

            return cursor.fetchone()[0]

        except Exception as e:
            print("Error:", e)
            return 0

        finally:
            cursor.close()
            conexion.close()