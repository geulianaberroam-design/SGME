from persistencia.conexion import obtener_conexion
from modelos.evento import Evento


class EventoDAO:
    """
    Gestiona las operaciones de los eventos
    almacenados en PostgreSQL.
    """

    # ==========================================
    # READ ALL
    # ==========================================

    def obtener_todos(self):
        """
        Devuelve todos los eventos registrados.
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
                titulo,
                descripcion,
                fecha,
                tipo,
                estado
            FROM evento
            ORDER BY fecha;
            """

            cursor.execute(sql)

            registros = cursor.fetchall()

            lista = []

            for fila in registros:

                evento = Evento(
                    id=fila[0],
                    titulo=fila[1],
                    descripcion=fila[2],
                    fecha=fila[3],
                    tipo=fila[4],
                    estado=fila[5]
                )

                lista.append(evento)

            return lista

        except Exception as e:

            print("Error al obtener eventos:", e)

            return []

        finally:

            if cursor:
                cursor.close()

            conexion.close()