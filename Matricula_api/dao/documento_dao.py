from modelos.documento import Documento


class DocumentoDAO:
    """
    Gestiona las operaciones CRUD de los documentos
    almacenados en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de documentos y el contador de IDs.
        """
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, documento):
        """
        Registra un nuevo documento.
        """
        documento.id = self.__cid
        self.__cid += 1

        self.__bd.append(documento)

        return documento

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve la lista de todos los documentos registrados.
        """
        return self.__bd

    # READ
    def buscar_por_id(self, id):
        """
        Busca un documento por su identificador.
        """
        for documento in self.__bd:
            if documento.id == id:
                return documento

        return None

    # UPDATE
    def actualizar(self, id, estado):
        """
        Actualiza el estado de un documento.
        """
        documento = self.buscar_por_id(id)

        if documento:
            documento.estado = estado
            return True

        return False

    # DELETE
    def eliminar(self, id):
        """
        Elimina un documento por su identificador.
        """
        documento = self.buscar_por_id(id)

        if documento:
            self.__bd.remove(documento)
            return True

        return False

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de documentos registrados.
        """
        return len(self.__bd)