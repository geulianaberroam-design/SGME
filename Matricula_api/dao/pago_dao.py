from persistencia.conexion import obtener_conexion
from modelos.pago import Pago


class PagoDAO:
    """
    Gestiona las operaciones CRUD de los pagos
    almacenados en PostgreSQL.
    """

    # ==========================================
    # CREATE
    # ==========================================

    def insertar(self, pago: Pago):
        """
        Registra un nuevo pago en PostgreSQL.
        Verifica que la matrícula exista.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:
            cursor = conexion.cursor()

            # Verificar que exista la matrícula
            if pago.matricula is None:
                raise Exception(
                    "El pago no tiene una matrícula asociada."
                )

            id_matricula = pago.matricula.id

            if id_matricula is None:
                raise Exception(
                    "La matrícula no tiene un ID válido."
                )

            cursor.execute(
                """
                SELECT id
                FROM matricula
                WHERE id = %s;
                """,
                (id_matricula,)
            )

            if cursor.fetchone() is None:
                raise Exception(
                    "La matrícula no existe."
                )

            # Insertar pago
            sql = """
            INSERT INTO pago
            (
                fecha,
                monto,
                comprobante,
                id_matricula
            )
            VALUES (%s, %s, %s, %s)
            RETURNING id;
            """

            cursor.execute(sql, (
                pago.fecha,
                pago.monto,
                pago.comprobante,
                id_matricula
            ))

            pago.id = cursor.fetchone()[0]

            conexion.commit()

            return pago

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
        Devuelve todos los pagos registrados.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return []

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            SELECT
                p.id,
                p.fecha,
                p.monto,
                p.comprobante,
                p.id_matricula
            FROM pago p
            ORDER BY p.id;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                pago = Pago(
                    fecha=fila[1],
                    monto=fila[2],
                    comprobante=fila[3]
                )

                pago.id = fila[0]

                lista.append(pago)

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
        Busca un pago por su ID.
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
                fecha,
                monto,
                comprobante,
                id_matricula
            FROM pago
            WHERE id = %s;
            """

            cursor.execute(sql, (id,))

            fila = cursor.fetchone()

            if fila:

                pago = Pago(
                    fecha=fila[1],
                    monto=fila[2],
                    comprobante=fila[3]
                )

                pago.id = fila[0]

                return pago

            return None

        except Exception as e:

            print("Error:", e)

            return None

        finally:

            if cursor:
                cursor.close()

            conexion.close()

    # ==========================================
    # READ BY MATRÍCULA
    # ==========================================

    def obtener_por_matricula(self, id_matricula):
        """
        Devuelve los pagos asociados a una matrícula.
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
                fecha,
                monto,
                comprobante,
                id_matricula
            FROM pago
            WHERE id_matricula = %s
            ORDER BY id;
            """

            cursor.execute(sql, (id_matricula,))

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                pago = Pago(
                    fecha=fila[1],
                    monto=fila[2],
                    comprobante=fila[3]
                )

                pago.id = fila[0]

                lista.append(pago)

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

    def actualizar(self, id, monto, comprobante):
        """
        Actualiza el monto y comprobante de un pago.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            UPDATE pago
            SET monto = %s,
                comprobante = %s
            WHERE id = %s;
            """

            cursor.execute(sql, (
                monto,
                comprobante,
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
        Elimina un pago por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:

            cursor = conexion.cursor()

            sql = """
            DELETE FROM pago
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
        Devuelve la cantidad total de pagos.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return 0

        cursor = None

        try:

            cursor = conexion.cursor()

            cursor.execute(
                "SELECT COUNT(*) FROM pago;"
            )

            return cursor.fetchone()[0]

        except Exception as e:

            print("Error:", e)

            return 0

        finally:

            if cursor:
                cursor.close()

            conexion.close()