class Documento:
    """Clase que representa un documento o trámite asociado a un estudiante."""

    def __init__(self, tipo, estado, estudiante, id=None):
        """Inicializa una nueva instancia de la clase Documento.

        Parámetros:
            tipo (str): El tipo de documento (ej. 'Certificado', 'Matrícula').
            estado (str): El estado actual (ej. 'Pendiente', 'Aprobado').
            estudiante (object/str): El estudiante asociado al documento.
            id (int/str, opcional): Identificador único del documento (por defecto None).
        """
        self.id = id
        self.tipo = tipo
        self.estado = estado
        self.estudiante = estudiante

    def __str__(self):
        """Devuelve una representación en cadena de texto legible del documento."""
        # Si el ID aún no ha sido asignado, muestra '[Sin ID]' para evitar mostrar '[None]'
        doc_id = f"[{self.id}]" if self.id is not None else "[Sin ID]"
        
        return (f"{doc_id} "
                f"Documento: {self.tipo} | "
                f"Estado: {self.estado}")