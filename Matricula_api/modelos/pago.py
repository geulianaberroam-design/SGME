from modelos.estudiante import Estudiante

class Pago:
    """Representa un pago realizado por un estudiante."""

    def __init__(self, fecha="", monto=0.0, comprobante="", estudiante=None):
        """Inicializa un nuevo pago."""
        self.id = None
        self.fecha = fecha
        self.monto = float(monto) if monto else 0.0
        self.comprobante = comprobante.strip() if comprobante else ""
        self.estudiante = estudiante

    def obtener_resumen(self):
        """Devuelve un resumen del pago."""
        nombre_estudiante = "Sin estudiante"
        if self.estudiante:
            nombre_estudiante = f"{getattr(self.estudiante, 'nombres', '')} {getattr(self.estudiante, 'apellidos', '')}"

        return f"{nombre_estudiante} - S/. {self.monto:.2f}"

    def __str__(self):
        """Devuelve una representación legible del pago."""
        doc_id = f"[{self.id}]" if self.id is not None else "[Sin ID]"

        nombre_est = "N/A"
        if self.estudiante:
            nombre_est = f"{getattr(self.estudiante, 'nombres', '')} {getattr(self.estudiante, 'apellidos', '')}"

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
        Convierte la instancia de Pago a un diccionario.
        Serializa recursivamente el objeto Estudiante si posee to_dict().
        """
        estudiante_data = self.estudiante
        if hasattr(self.estudiante, "to_dict"):
            estudiante_data = self.estudiante.to_dict()

        return {
            "id": self.id,
            "fecha": self.fecha,
            "monto": self.monto,
            "comprobante": self.comprobante,
            "estudiante": estudiante_data
        }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """
        Crea una nueva instancia de Pago a partir de un diccionario.
        Reconstruye automáticamente el objeto Estudiante si viene en los datos.
        """
        datos_est = datos.get("estudiante", None)
        obj_est = datos_est
        if isinstance(datos_est, dict):
            obj_est = Estudiante.from_dict(datos_est)

        pago = cls(
            fecha=datos.get("fecha", ""),
            monto=datos.get("monto", 0.0),
            comprobante=datos.get("comprobante", ""),
            estudiante=obj_est
        )

        pago.id = datos.get("id", None)
        return pago