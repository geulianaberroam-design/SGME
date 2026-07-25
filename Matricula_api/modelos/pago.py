class Pago:
    """Representa un pago realizado por un estudiante."""

    def __init__(self, fecha, monto, comprobante, estudiante):
        """Inicializa un nuevo pago."""
        self.id = None
        self.fecha = fecha
        self.monto = monto
        self.comprobante = comprobante.strip()
        self.estudiante = estudiante

    def obtener_resumen(self):
        """Devuelve un resumen del pago."""
        return (
            f"{self.estudiante.nombres} {self.estudiante.apellidos} "
            f"- S/. {self.monto:.2f}"
        )

    def __str__(self):
        """Devuelve una representación legible del pago."""
        return (
            f"[{self.id}] "
            f"Fecha: {self.fecha} | "
            f"Monto: S/. {self.monto:.2f} | "
            f"Comprobante: {self.comprobante} | "
            f"Estudiante: {self.estudiante.nombres} {self.estudiante.apellidos}"
        )