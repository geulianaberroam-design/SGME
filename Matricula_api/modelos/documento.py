class Documento:
    """Clase que representa un documento o trámite asociado a un estudiante."""

    def __init__(self, tipo="", estado="", estudiante=None, id=None):
        """
        Inicializa una nueva instancia de la clase Documento.

        Parámetros:
            tipo (str): El tipo de documento (ej. 'Certificado', 'Matrícula').
            estado (str): El estado actual (ej. 'Pendiente', 'Aprobado').
            estudiante (object/dict/str): El estudiante asociado al documento.
            id (int/str, opcional): Identificador único del documento.
        """
        self.id = id
        self.tipo = tipo
        self.estado = estado
        self.estudiante = estudiante

    def __str__(self):
        """Devuelve una representación en cadena de texto legible del documento."""
        doc_id = f"[{self.id}]" if self.id is not None else "[Sin ID]"
        return (f"{doc_id} "
                f"Documento: {self.tipo} | "
                f"Estado: {self.estado}")

    # --- 1. Objeto -> Diccionario (Necesario para serializar a JSON) ---
    def to_dict(self):
        """
        Convierte la instancia de Documento a un diccionario.
        Si 'estudiante' es un objeto con método to_dict(), también lo serializa.
        """
        estudiante_data = self.estudiante
        if hasattr(self.estudiante, "to_dict"):
            estudiante_data = self.estudiante.to_dict()

        return {
            "id": self.id,
            "tipo": self.tipo,
            "estado": self.estado,
            "estudiante": estudiante_data
        }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON/Dict) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """
        Crea una nueva instancia de Documento a partir de un diccionario.
        """
        doc = cls(
            tipo=datos.get("tipo", ""),
            estado=datos.get("estado", ""),
            estudiante=datos.get("estudiante", None)
        )
        # Asignamos el ID original
        doc.id = datos.get("id", None)
        return doc