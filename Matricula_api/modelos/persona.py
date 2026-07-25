class Persona:

    class Persona:
     """Representa a una persona dentro del sistema de matrícula."""

    def __init__(self, dni, nombres, apellidos, telefono, email):
        """
        Inicializa una nueva persona.
        """
        self.__dni = dni.strip()
        self.__nombres = nombres.strip().title()
        self.__apellidos = apellidos.strip().title()
        self.__telefono = telefono.strip()
        self.__email = email.strip().lower()

    # GETTERS Y SETTERS

    @property
    def dni(self):
        return self.__dni

    @dni.setter
    def dni(self, valor):
        self.__dni = valor.strip()

    @property
    def nombres(self):
        return self.__nombres

    @nombres.setter
    def nombres(self, valor):
        self.__nombres = valor.strip().title()

    @property
    def apellidos(self):
        return self.__apellidos

    @apellidos.setter
    def apellidos(self, valor):
        self.__apellidos = valor.strip().title()

    @property
    def telefono(self):
        return self.__telefono

    @telefono.setter
    def telefono(self, valor):
        self.__telefono = valor.strip()

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, valor):
        self.__email = valor.strip().lower()

    def obtener_descripcion(self):
        """
        Devuelve una descripción de la persona.
        """
        return f"Persona: {self.nombres} {self.apellidos}"

    def __str__(self):
        """
        Devuelve una representación legible de la persona.
        """
        return (
            f"{self.nombres} {self.apellidos} | "
            f"DNI: {self.dni} | "
            f"Teléfono: {self.telefono}"
        )