from modelos.documento import Documento


class DocumentoDAO:

    def __init__(self):
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, documento):

        documento.id = self.__cid
        self.__cid += 1

        self.__bd.append(documento)

        return documento

    # READ ALL
    def obtener_todos(self):
        return self.__bd

    # READ
    def buscar_por_id(self, id):

        for documento in self.__bd:
            if documento.id == id:
                return documento

        return None

    # UPDATE
    def actualizar(self, id, estado):

        documento = self.buscar_por_id(id)

        if documento:

            documento.estado = estado

            return True

        return False

    # DELETE
    def eliminar(self, id):

        documento = self.buscar_por_id(id)

        if documento:

            self.__bd.remove(documento)

            return True

        return False

    # COUNT
    def total(self):
        return len(self.__bd)