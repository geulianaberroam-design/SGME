from modelos.apoderado import Apoderado


class ApoderadoDAO:
    """
    Gestiona las operaciones CRUD de los apoderados
    almacenados en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de apoderados y el contador de IDs.
        """
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, apoderado):
        """
        Inserta un nuevo apoderado.
        """
        if self.buscar_por_dni(apoderado.dni):
            raise Exception("El DNI ya está registrado.")

        apoderado.id = self.__cid
        self.__cid += 1

        self.__bd.append(apoderado)

        return apoderado

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve la lista de todos los apoderados.
        """
        return self.__bd

    # READ
    def buscar_por_id(self, id):
        """
        Busca un apoderado por su ID.
        """
        for apoderado in self.__bd:
            if apoderado.id == id:
                return apoderado

        return None

    # READ
    def buscar_por_dni(self, dni):
        """
        Busca un apoderado por su DNI.
        """
        for apoderado in self.__bd:
            if apoderado.dni == dni:
                return apoderado

        return None

    # UPDATE
    def actualizar(self, id, telefono, email):
        """
        Actualiza el teléfono y correo de un apoderado.
        """
        apoderado = self.buscar_por_id(id)

        if apoderado:
            apoderado.telefono = telefono
            apoderado.email = email
            return True

        return False

    # DELETE
    def eliminar(self, id):
        """
        Elimina un apoderado por su ID.
        """
        apoderado = self.buscar_por_id(id)

        if apoderado:
            self.__bd.remove(apoderado)
            return True

        return False

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de apoderados registrados.
        """
        return len(self.__bd)