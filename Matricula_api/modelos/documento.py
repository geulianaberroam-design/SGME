class Documento:
    """
    Representa un documento asociado a un estudiante.
    """

    def __init__(
        self,
        id=None,
        nombre="",
        tipo="",
        ruta="",
        id_estudiante=None
    ):
        self.id = id
        self.nombre = nombre
        self.tipo = tipo
        self.ruta = ruta
        self.id_estudiante = id_estudiante

    def __str__(self):
        return (
            f"{self.nombre} | "
            f"Tipo: {self.tipo}"
        )