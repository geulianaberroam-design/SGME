from modelos.apoderado import Apoderado


class ApoderadoDAO:

    def __init__(self):
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, apoderado):

        if self.buscar_por_dni(apoderado.dni):
            raise Exception("El DNI ya está registrado.")

        apoderado.id = self.__cid
        self.__cid += 1

        self.__bd.append(apoderado)

        return apoderado

    # READ ALL
    def obtener_todos(self):
        return self.__bd

    # READ
    def buscar_por_id(self, id):

        for apoderado in self.__bd:
            if apoderado.id == id:
                return apoderado

        return None

    # READ
    def buscar_por_dni(self, dni):

        for apoderado in self.__bd:
            if apoderado.dni == dni:
                return apoderado

        return None

    # UPDATE
    def actualizar(self, id, telefono, email):

        apoderado = self.buscar_por_id(id)

        if apoderado:

            apoderado.telefono = telefono
            apoderado.email = email

            return True

        return False

    # DELETE
    def eliminar(self, id):

        apoderado = self.buscar_por_id(id)

        if apoderado:

            self.__bd.remove(apoderado)
            return True

        return False

    # COUNT
    def total(self):
        return len(self.__bd)

#apoderado dao parte ana