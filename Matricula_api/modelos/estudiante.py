from modelos.persona import Persona

class Estudiante(Persona):
    """
    Representa a un estudiante del sistema de matrícula.
    Hereda los atributos de la clase Persona y agrega
    información propia del estudiante.
    """

    def __init__(self, dni, nombres, apellidos, telefono, email,
                 fecha_nac, direccion, apoderado):
        """Inicializa un nuevo estudiante."""
        super().__init__(dni, nombres, apellidos, telefono, email)

        self.id = None
        self.fecha_nac = fecha_nac
        self.direccion = direccion
        self.apoderado = apoderado

    def obtener_descripcion(self):
        """Devuelve una descripción breve del estudiante."""
        
        return f"Estudiante: {self.nombres} {self.apellidos}"
        
    def __str__(self):
        """Devuelve una representación legible del estudiante."""
        return (f"[{self.id}] {self.nombres} {self.apellidos} |"
                f"DNI: {self.dni} | "
                f"Apoderado: {self.apoderado.nombres} {self.apoderado.apellidos}")