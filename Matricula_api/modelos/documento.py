class Documento:
     """
    Representa un documento asociado a un estudiante.

    Atributos:
        id (int): Identificador único del documento.
        tipo (str): Tipo de documento (DNI, Partida de Nacimiento, Certificado, etc.).
        estado (str): Estado del documento (Pendiente, Aprobado, Rechazado).
        estudiante: Objeto estudiante al que pertenece el documento.
    """

def __init__(self, tipo, estado, estudiante):
        self.id = None
        self.tipo = tipo
        self.estado = estado
        self.estudiante = estudiante

def __str__(self):
         """Devuelve una representación legible del documento."""
         return (f"[{self.id}] "
                f"Documento: {self.tipo} | "
                f"Estado: {self.estado}")