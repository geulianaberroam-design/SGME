from modelos.persona import Persona

class Estudiante(Persona):

    def __init__(self, dni, nombres, apellidos, telefono, email,
                 fecha_nac, direccion, apoderado):

        super().__init__(dni, nombres, apellidos, telefono, email)

        self.id = None
        self.fecha_nac = fecha_nac
        self.direccion = direccion
        self.apoderado = apoderado

    def obtener_descripcion(self):
        return f"Estudiante: {self.nombres} {self.apellidos}"

    def __str__(self):
        return (f"[{self.id}] {self.nombres} {self.apellidos} | "
                f"DNI: {self.dni} | "
                f"Apoderado: {self.apoderado.nombres} {self.apoderado.apellidos}")