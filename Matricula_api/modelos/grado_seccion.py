class GradoSeccion:

    def __init__(self, grado, seccion):
        self.id = None
        self.grado = grado
        self.seccion = seccion

    def __str__(self):
        return f"[{self.id}] Grado: {self.grado} - Sección: {self.seccion}"