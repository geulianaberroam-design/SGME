from modelos.grado_seccion import GradoSeccion


class GradoSeccionDAO:

    def __init__(self):
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, grado_seccion):

        if self.buscar_por_grado_seccion(grado_seccion.grado,
                                         grado_seccion.seccion):
            raise Exception("El grado y sección ya existen.")

        grado_seccion.id = self.__cid
        self.__cid += 1

        self.__bd.append(grado_seccion)

        return grado_seccion

    # READ ALL
    def obtener_todos(self):
        return self.__bd

    # READ
    def buscar_por_id(self, id):

        for grado_seccion in self.__bd:
            if grado_seccion.id == id:
                return grado_seccion

        return None

    # READ
    def buscar_por_grado_seccion(self, grado, seccion):

        for grado_seccion in self.__bd:
            if (grado_seccion.grado == grado and
                    grado_seccion.seccion == seccion):
                return grado_seccion

        return None

    # UPDATE
    def actualizar(self, id, grado, seccion):

        grado_seccion = self.buscar_por_id(id)

        if grado_seccion:

            grado_seccion.grado = grado
            grado_seccion.seccion = seccion

            return True

        return False

    # DELETE
    def eliminar(self, id):

        grado_seccion = self.buscar_por_id(id)

        if grado_seccion:

            self.__bd.remove(grado_seccion)
            return True

        return False

    # COUNT
    def total(self):
        return len(self.__bd)