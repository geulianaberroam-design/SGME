class Matricula:
    """Representa una matricula de un estudiantes."""

    def __init__(self, anio, fecha, estado, estudiante, grado_seccion):
       
         """ Inicializa una nueva matricula."""
         
         self.id = None
         self.anio = anio
         self.fecha = fecha
         self.estado = estado.strip().title()
         self.estudiante = estudiante
         self.grado_seccion = grado_seccion
        
    def obtener_resumen(self):
         """Devuelve un resumen de matricula."""
         return(
            f"{self.estudiantes.nombres} {self.estudiantes.apellidos}"
            f"{self.grado_seccion.grado} {self.grado_seccion.seccion}")
    
    def __str__(self):
        """Devuelve una representación legible de la matrícula."""
        return (f"[{self.id}] "
                f"Año: {self.anio} | "
                f"Fecha:{self.fecha} |"
                f"Fecha:{self.estado} |"
                f"Estudiante: {self.estudiante.nombres} {self.estudiante.apellidos} | "
                f"Grado: {self.grado_seccion.grado} "
                f"Sección: {self.grado_seccion.seccion}")