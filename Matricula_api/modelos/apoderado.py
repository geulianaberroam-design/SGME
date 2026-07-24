from modelos.persona import Persona

class Apoderado(Persona):
     """
    Clase que representa a un Apoderado del sistema.
    Hereda los atributos básicos de la clase Persona.
    """
    
def __init__(self, dni, nombres, apellidos, telefono, email):
        # Llama al constructor de la clase padre (Persona)
    super().__init__(dni, nombres, apellidos, telefono, email)
    self.id = None   # Identificador único que se asignará en la base de datos
        
def obtener_descripcion(self):
        """Devuelve una descripción simple del apoderado."""
        return f"Apoderado: {self.nombres} {self.apellidos}" 

def __str__(self):
        """Formatea la representación en texto del objeto."""
        return f"[{self.id}] {self.nombres} {self.apellidos} | DNI: {self.dni}"