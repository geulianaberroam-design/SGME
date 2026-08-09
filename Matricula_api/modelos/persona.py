class Persona:
    """
    Representa los datos básicos de una persona.
    """

    def __init__(
        self,
        dni="",
        nombres="",
        apellidos="",
        telefono="",
        email=""
    ):
        self.dni = dni
        self.nombres = nombres
        self.apellidos = apellidos
        self.telefono = telefono
        self.email = email

    def obtener_nombre_completo(self):
        """
        Devuelve el nombre completo de la persona.
        """
        return f"{self.nombres} {self.apellidos}"

    def __str__(self):
        """
        Devuelve una representación legible de la persona.
        """
        return (
            f"{self.nombres} {self.apellidos} | "
            f"DNI: {self.dni}"
        )