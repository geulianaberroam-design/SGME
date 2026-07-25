from modelos.matricula import Matricula


class MatriculaDAO:

    def __init__(self):
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, matricula):

        matricula.id = self.__cid
        self.__cid += 1

        self.__bd.append(matricula)

        return matricula

    # READ ALL
    def obtener_todos(self):
        return self.__bd

    # READ
    def buscar_por_id(self, id):

        for matricula in self.__bd:
            if matricula.id == id:
                return matricula

        return None

    # UPDATE
    def actualizar(self, id, estado):

        matricula = self.buscar_por_id(id)

        if matricula:

            matricula.estado = estado
            return True

        return False

    # DELETE
    def eliminar(self, id):

        matricula = self.buscar_por_id(id)

        if matricula:

            self.__bd.remove(matricula)
            return True

        return False

    # COUNT
    def total(self):
        return len(self.__bd)
    from modelos.matricula import Matricula


class MatriculaDAO:
    """
    Gestiona las operaciones CRUD de las matrículas
    almacenadas en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de matrículas y el contador de IDs.
        """
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, matricula):
        """
        Registra una nueva matrícula.
        """
        matricula.id = self.__cid
        self.__cid += 1

        self.__bd.append(matricula)

        return matricula

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve la lista de todas las matrículas registradas.
        """
        return self.__bd

    # READ
    def buscar_por_id(self, id):
        """
        Busca una matrícula por su identificador.
        """
        for matricula in self.__bd:
            if matricula.id == id:
                return matricula

        return None

    # UPDATE
    def actualizar(self, id, estado):
        """
        Actualiza el estado de una matrícula.
        """
        matricula = self.buscar_por_id(id)

        if matricula:
            matricula.estado = estado
            return True

        return False

    # DELETE
    def eliminar(self, id):
        """
        Elimina una matrícula por su identificador.
        """
        matricula = self.buscar_por_id(id)

        if matricula:
            self.__bd.remove(matricula)
            return True

        return False

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de matrículas registradas.
        """
        return len(self.__bd)