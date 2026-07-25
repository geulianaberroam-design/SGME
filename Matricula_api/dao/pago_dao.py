from modelos.pago import Pago


class PagoDAO:
    """
    Gestiona las operaciones CRUD de los pagos
    almacenados en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de pagos y el contador de identificadores.
        """
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, pago):
        """
        Registra un nuevo pago.
        """
        pago.id = self.__cid
        self.__cid += 1

        self.__bd.append(pago)

        return pago

    # READ ALL
    def obtener_todos(self):
        """
        Devuelve la lista de todos los pagos registrados.
        """
        return self.__bd

    # READ
    def buscar_por_id(self, id):
        """
        Busca un pago por su identificador.
        """
        for pago in self.__bd:
            if pago.id == id:
                return pago

        return None

    # UPDATE
    def actualizar(self, id, monto, comprobante):
        """
        Actualiza el monto y el comprobante de un pago.
        """
        pago = self.buscar_por_id(id)

        if pago:
            pago.monto = monto
            pago.comprobante = comprobante
            return True

        return False

    # DELETE
    def eliminar(self, id):
        """
        Elimina un pago por su identificador.
        """
        pago = self.buscar_por_id(id)

        if pago:
            self.__bd.remove(pago)
            return True

        return False

    # COUNT
    def total(self):
        """
        Devuelve la cantidad total de pagos registrados.
        """
        return len(self.__bd)