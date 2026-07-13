from modelos.persona import Persona

class Apoderado(Persona):

    def __init__(self, dni, nombres, apellidos, telefono, email):
        super().__init__(dni, nombres, apellidos, telefono, email)
        self.id = None

    def obtener_descripcion(self):
        return f"Apoderado: {self.nombres} {self.apellidos}"

    def __str__(self):
        return f"[{self.id}] {self.nombres} {self.apellidos} | DNI: {self.dni}"