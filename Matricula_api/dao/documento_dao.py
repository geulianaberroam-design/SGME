from persistencia.conexion import obtener_conexion
from modelos.documento import Documento


class DocumentoDAO:

    def insertar(self, documento):
        conexion = obtener_conexion()

        if conexion is None:
            return False

        try:
            cursor = conexion.cursor()

            sql = """
                INSERT INTO documento(tipo, estado, id_estudiante)
                VALUES (%s, %s, %s)
            """

            cursor.execute(
                sql,
                (
                    documento.tipo,
                    documento.estado,
                    documento.estudiante.id
                )
            )

            conexion.commit()
            return True

        except Exception as e:
            print(e)
            conexion.rollback()
            return False

        finally:
            cursor.close()
            conexion.close()