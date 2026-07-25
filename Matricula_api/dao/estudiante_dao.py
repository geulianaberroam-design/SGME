from modelos.estudiante import Estudiante


class EstudianteDAO:
    """
    Gestiona las operaciones CRUD de los estudiantes
    almacenados en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de estudiantes y el contador de IDs.
        """
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, estudiante):
        """
        Registra un nuevo estudiante.
        Verifica que el DNI no esté duplicado.
        """
        if self.buscar_por_dni(estudiante.dni):
            raise Exception("El DNI ya está registrado.")

        estudiante.id = self.__cid
        self.__cid += 1

        self.__bd.append(estudiante)

        return estudiante

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve la lista de todos los estudiantes.
        """
        return self.__bd

    # READ
    def buscar_por_id(self, id):
        """
        Busca un estudiante por su identificador.
        """
        for estudiante in self.__bd:
            if estudiante.id == id:
                return estudiante

        return None

    # READ
    def buscar_por_dni(self, dni):
        """
        Busca un estudiante por su número de DNI.
        """
        for estudiante in self.__bd:
            if estudiante.dni == dni:
                return estudiante

        return None

    # UPDATE
    def actualizar(self, id, telefono, email, direccion):
        """
        Actualiza el teléfono, correo y dirección de un estudiante.
        """
        estudiante = self.buscar_por_id(id)

        if estudiante:
            estudiante.telefono = telefono
            estudiante.email = email
            estudiante.direccion = direccion
            return True

        return False

    # DELETE
    def eliminar(self, id):
        """
        Elimina un estudiante por su identificador.
        """
        estudiante = self.buscar_por_id(id)

        if estudiante:
            self.__bd.remove(estudiante)
            return True

        return False

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de estudiantes registrados.
        """
        return len(self.__bd)