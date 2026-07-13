class Matricula:

    def __init__(self, anio, fecha, estado, estudiante, grado_seccion):
        self.id = None
        self.anio = anio
        self.fecha = fecha
        self.estado = estado
        self.estudiante = estudiante
        self.grado_seccion = grado_seccion

    def __str__(self):
        return (f"[{self.id}] "
                f"Año: {self.anio} | "
                f"Estudiante: {self.estudiante.nombres} {self.estudiante.apellidos} | "
                f"Grado: {self.grado_seccion.grado} "
                f"Sección: {self.grado_seccion.seccion}")