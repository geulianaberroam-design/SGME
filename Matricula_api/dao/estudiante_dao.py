from persistencia.conexion import obtener_conexion
from modelos.estudiante import Estudiante


class EstudianteDAO:
    """
    Gestiona las operaciones CRUD de los estudiantes
    almacenados en PostgreSQL.
    """

    # CREATE
    def insertar(self, estudiante: Estudiante):
        """
        Registra un nuevo estudiante en PostgreSQL.
        Verifica que el DNI no esté duplicado.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return None

        cursor = None

        try:
            cursor = conexion.cursor()

            # Verificar DNI duplicado
            cursor.execute(
                "SELECT id FROM estudiante WHERE dni = %s;",
                (estudiante.dni,)
            )

            if cursor.fetchone():
                raise Exception("El DNI ya está registrado.")

            # Obtener ID del apoderado
            id_apoderado = estudiante.id_apoderado

            sql = """
            INSERT INTO estudiante
            (dni, nombres, apellidos, telefono, email,
             fecha_nac, direccion, id_apoderado)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """

            cursor.execute(sql, (
                estudiante.dni,
                estudiante.nombres,
                estudiante.apellidos,
                estudiante.telefono,
                estudiante.email,
                estudiante.fecha_nac,
                estudiante.direccion,
                id_apoderado
            ))

            estudiante.id = cursor.fetchone()[0]

            conexion.commit()

            return estudiante

        except Exception as e:
            conexion.rollback()
            print("Error:", e)
            return None

        finally:
            if cursor:
                cursor.close()
            conexion.close()

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve todos los estudiantes registrados.
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
                dni,
                nombres,
                apellidos,
                telefono,
                email,
                fecha_nac,
                direccion,
                id_apoderado
            FROM estudiante
            ORDER BY id;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                estudiante = Estudiante(
                    dni=fila[1],
                    nombres=fila[2],
                    apellidos=fila[3],
                    telefono=fila[4],
                    email=fila[5],
                    fecha_nac=fila[6],
                    direccion=fila[7]
                )

                estudiante.id = fila[0]
                estudiante.id_apoderado = fila[8]

                lista.append(estudiante)

            return lista

        except Exception as e:
            print("Error:", e)
            return []

        finally:
            if cursor:
                cursor.close()
            conexion.close()

    # READ BY ID
    def buscar_por_id(self, id_estudiante):
        """
        Busca un estudiante por su ID.
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
                dni,
                nombres,
                apellidos,
                telefono,
                email,
                fecha_nac,
                direccion,
                id_apoderado
            FROM estudiante
            WHERE id = %s;
            """

            cursor.execute(sql, (id_estudiante,))

            fila = cursor.fetchone()

            if fila:

                estudiante = Estudiante(
                    dni=fila[1],
                    nombres=fila[2],
                    apellidos=fila[3],
                    telefono=fila[4],
                    email=fila[5],
                    fecha_nac=fila[6],
                    direccion=fila[7]
                )

                estudiante.id = fila[0]
                estudiante.id_apoderado = fila[8]

                return estudiante
            

            return None

        except Exception as e:
            print("Error:", e)
            return None

        finally:
            if cursor:
                cursor.close()
            conexion.close()

    # READ BY DNI
    def buscar_por_dni(self, dni):
        """
        Busca un estudiante por su DNI.
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
                dni,
                nombres,
                apellidos,
                telefono,
                email,
                fecha_nac,
                direccion,
                id_apoderado
            FROM estudiante
            WHERE dni = %s;
            """

            cursor.execute(sql, (dni,))

            fila = cursor.fetchone()

            if fila:

                estudiante = Estudiante(
                    dni=fila[1],
                    nombres=fila[2],
                    apellidos=fila[3],
                    telefono=fila[4],
                    email=fila[5],
                    fecha_nac=fila[6],
                    direccion=fila[7]
                )

                estudiante.id = fila[0]
                estudiante.id_apoderado = fila[8]

                return estudiante

            return None

        except Exception as e:
            print("Error:", e)
            return None

        finally:
            if cursor:
                cursor.close()
            conexion.close()

    # UPDATE
    def actualizar(self, id_estudiante, telefono, email, direccion):
        """
        Actualiza teléfono, correo y dirección.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:
            cursor = conexion.cursor()

            sql = """
            UPDATE estudiante
            SET telefono = %s,
                email = %s,
                direccion = %s
            WHERE id = %s;
            """

            cursor.execute(sql, (
                telefono,
                email,
                direccion,
                id_estudiante
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

    # DELETE
    def eliminar(self, id_estudiante):
        """
        Elimina un estudiante por su ID.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return False

        cursor = None

        try:
            cursor = conexion.cursor()

            sql = """
            DELETE FROM estudiante
            WHERE id = %s;
            """

            cursor.execute(sql, (id_estudiante,))

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

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de estudiantes.
        """

        conexion = obtener_conexion()

        if conexion is None:
            return 0

        cursor = None

        try:
            cursor = conexion.cursor()

            cursor.execute(
                "SELECT COUNT(*) FROM estudiante;"
            )

            return cursor.fetchone()[0]

        except Exception as e:
            print("Error:", e)
            return 0

        finally:
            if cursor:
                cursor.close()
            conexion.close()