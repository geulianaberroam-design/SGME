from modelos.estudiante import Estudiante


class EstudianteDAO:

    def __init__(self):
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, estudiante):

        if self.buscar_por_dni(estudiante.dni):
            raise Exception("El DNI ya está registrado.")

        estudiante.id = self.__cid
        self.__cid += 1

        self.__bd.append(estudiante)

        return estudiante

    # READ ALL
    def obtener_todos(self):
        return self.__bd

    # READ
    def buscar_por_id(self, id):

        for estudiante in self.__bd:
            if estudiante.id == id:
                return estudiante

        return None

    # READ
    def buscar_por_dni(self, dni):

        for estudiante in self.__bd:
            if estudiante.dni == dni:
                return estudiante

        return None

    # UPDATE
    def actualizar(self, id, telefono, email, direccion):

        estudiante = self.buscar_por_id(id)

        if estudiante:

            estudiante.telefono = telefono
            estudiante.email = email
            estudiante.direccion = direccion

            return True

        return False

    # DELETE
    def eliminar(self, id):

        estudiante = self.buscar_por_id(id)

        if estudiante:

            self.__bd.remove(estudiante)
            return True

        return False

    # COUNT
    def total(self):
        return len(self.__bd)