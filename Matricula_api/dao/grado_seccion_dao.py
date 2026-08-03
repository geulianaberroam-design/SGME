from modelos.grado_seccion import GradoSeccion


class GradoSeccionDAO:
    """
    Gestiona las operaciones CRUD de los grados y secciones
    almacenados en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de grados y secciones
        y el contador de identificadores.
        """
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, grado_seccion):
        """
        Registra un nuevo grado y sección.

        Verifica que no exista un registro duplicado.
        """
        if self.buscar_por_grado_seccion(
                grado_seccion.grado,
                grado_seccion.seccion):
            raise Exception("El grado y sección ya existen.")

        grado_seccion.id = self.__cid
        self.__cid += 1

        self.__bd.append(grado_seccion)

        return grado_seccion

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve la lista de todos los grados y secciones.
        """
        return self.__bd

    # READ
    def buscar_por_id(self, id):
        """
        Busca un grado y sección por su identificador.
        """
        for grado_seccion in self.__bd:
            if grado_seccion.id == id:
                return grado_seccion

        return None

    # READ
    def buscar_por_grado_seccion(self, grado, seccion):
        """
        Busca un grado y sección específicos.
        """
        for grado_seccion in self.__bd:
            if (grado_seccion.grado == grado and
                    grado_seccion.seccion == seccion):
                return grado_seccion

        return None

    # UPDATE
    def actualizar(self, id, grado, seccion):
        """
        Actualiza el grado y la sección.
        """
        grado_seccion = self.buscar_por_id(id)

        if grado_seccion:
            grado_seccion.grado = grado
            grado_seccion.seccion = seccion
            return True

        return False

    # DELETE
    def eliminar(self, id):
        """
        Elimina un grado y sección por su identificador.
        """
        grado_seccion = self.buscar_por_id(id)

        if grado_seccion:
            self.__bd.remove(grado_seccion)
            return True

        return False

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de grados y secciones registrados.
        """
        return len(self.__bd)