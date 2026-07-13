from modelos.pago import Pago


class PagoDAO:

    def __init__(self):
        self.__bd = []
        self.__cid = 1

    # CREATE
    def insertar(self, pago):

        pago.id = self.__cid
        self.__cid += 1

        self.__bd.append(pago)

        return pago

    # READ ALL
    def obtener_todos(self):
        return self.__bd

    # READ
    def buscar_por_id(self, id):

        for pago in self.__bd:
            if pago.id == id:
                return pago

        return None

    # UPDATE
    def actualizar(self, id, monto, comprobante):

        pago = self.buscar_por_id(id)

        if pago:

            pago.monto = monto
            pago.comprobante = comprobante

            return True

        return False

    # DELETE
    def eliminar(self, id):

        pago = self.buscar_por_id(id)

        if pago:

            self.__bd.remove(pago)
            return True

        return False

    # COUNT
    def total(self):
        return len(self.__bd)