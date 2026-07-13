class Pago:

    def __init__(self, fecha, monto, comprobante, estudiante):
        self.id = None
        self.fecha = fecha
        self.monto = monto
        self.comprobante = comprobante
        self.estudiante = estudiante

    def __str__(self):
        return (f"[{self.id}] "
                f"Fecha: {self.fecha} | "
                f"Monto: S/. {self.monto:.2f} | "
                f"Comprobante: {self.comprobante}")