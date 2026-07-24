class GradoSeccion:
    """Representa un grado y una sección del sistema de matrícula."""
    def __init__(self, grado, seccion):
        
        """Inicializa un nuevo grado y sección."""
        self.id = None
        self.grado = grado
        self.seccion = seccion.strip().upper()
        
    def obtener_descripcion(self):
        """Devuelve la descripción del grado y la sección."""
        return f"{self.grado} - {self.seccion}"
    
    def __str__(self):
        """Devuelve una representacion legible del grado y sección."""
        return f"[{self.id}] Grado: {self.grado} - Sección: {self.seccion}"