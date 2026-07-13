class Documento:

    def __init__(self, tipo, estado, estudiante):
        self.id = None
        self.tipo = tipo
        self.estado = estado
        self.estudiante = estudiante

    def __str__(self):
        return (f"[{self.id}] "
                f"Documento: {self.tipo} | "
                f"Estado: {self.estado}")