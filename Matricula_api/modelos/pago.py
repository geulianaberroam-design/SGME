from modelos.matricula import Matricula

class Pago:
    """Representa un pago realizado por una matrícula."""

    def __init__(self, fecha="", monto=0.0, comprobante="", matricula=None):
        self.id = None
        self.fecha = fecha
        self.monto = float(monto) if monto else 0.0
        self.comprobante = comprobante.strip() if comprobante else ""
        self.matricula = matricula

    def obtener_resumen(self):
         """Devuelve un resumen del pago."""
         nombre = "Sin matrícula"

         if self.matricula and self.matricula.estudiante:
           nombre = (
             f"{self.matricula.estudiante.nombres} "
             f"{self.matricula.estudiante.apellidos}"
            )

         return f"{nombre} - S/. {self.monto:.2f}"

    def __str__(self):
        """Devuelve una representación legible del pago."""
        doc_id = f"[{self.id}]" if self.id is not None else "[Sin ID]"

        nombre_est = "N/A"

        if self.matricula and self.matricula.estudiante:
           nombre_est = (
               f"{self.matricula.estudiante.nombres} "
               f"{self.matricula.estudiante.apellidos}"
            )

        return (
            f"{doc_id} "
            f"Fecha: {self.fecha} | "
            f"Monto: S/. {self.monto:.2f} | "
            f"Comprobante: {self.comprobante} | "
            f"Estudiante: {nombre_est}"
        )

    # --- 1. Objeto -> Diccionario (Para respuestas JSON) ---
    def to_dict(self):
         """
         Devuelve un resumen del pago.
         Serializa recursivamente el objeto Matricula asociado.
         """
         matricula_data = self.matricula

         if hasattr(self.matricula, "to_dict"):
            matricula_data = self.matricula.to_dict()

         return {
            "id": self.id,
            "fecha": self.fecha,
            "monto": self.monto,
            "comprobante": self.comprobante,
            "matricula": matricula_data
         }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """
        Crea una nueva instancia de Pago a partir de un diccionario.
        Reconstruye automáticamente el objeto Matricula.
        """

        datos_mat = datos.get("matricula", None)
        obj_mat = datos_mat

        if isinstance(datos_mat, dict):
            obj_mat = Matricula.from_dict(datos_mat)

        pago = cls(
            fecha=datos.get("fecha", ""),
            monto=datos.get("monto", 0.0),
            comprobante=datos.get("comprobante", ""),
            matricula=obj_mat
        )

        pago.id = datos.get("id", None)

        return pago