class GradoSeccion:
    """Representa un grado y una sección del sistema de matrícula."""

    def __init__(self, grado="", seccion=""):
        """Inicializa un nuevo grado y sección."""
        self.id = None
        self.grado = grado
        # Formatea la sección eliminando espacios y pasándola a mayúsculas
        self.seccion = seccion.strip().upper() if seccion else ""

    def obtener_descripcion(self):
        """Devuelve la descripción del grado y la sección."""
        return f"{self.grado} - {self.seccion}"

    def __str__(self):
        """Devuelve una representación legible del grado y sección."""
        doc_id = f"[{self.id}]" if self.id is not None else "[Sin ID]"
        return f"{doc_id} Grado: {self.grado} - Sección: {self.seccion}"

    # --- 1. Objeto -> Diccionario (Para respuestas JSON) ---
    def to_dict(self):
        """Convierte la instancia de GradoSeccion a un diccionario."""
        return {
            "id": self.id,
            "grado": self.grado,
            "seccion": self.seccion
        }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """Crea una nueva instancia de GradoSeccion a partir de un diccionario."""
        grado_sec = cls(
            grado=datos.get("grado", ""),
            seccion=datos.get("seccion", "")
        )
        grado_sec.id = datos.get("id", None)
        return grado_sec