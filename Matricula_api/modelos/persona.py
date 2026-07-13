class Persona:

    def __init__(self, dni, nombres, apellidos, telefono, email):
        self.__dni = dni
        self.__nombres = nombres
        self.__apellidos = apellidos
        self.__telefono = telefono
        self.__email = email

    # GETTERS Y SETTERS

    @property
    def dni(self):
        return self.__dni

    @dni.setter
    def dni(self, valor):
        self.__dni = valor

    @property
    def nombres(self):
        return self.__nombres

    @nombres.setter
    def nombres(self, valor):
        self.__nombres = valor

    @property
    def apellidos(self):
        return self.__apellidos

    @apellidos.setter
    def apellidos(self, valor):
        self.__apellidos = valor

    @property
    def telefono(self):
        return self.__telefono

    @telefono.setter
    def telefono(self, valor):
        self.__telefono = valor

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, valor):
        self.__email = valor

    # Método polimórfico
    def obtener_descripcion(self):
        return f"Persona: {self.nombres} {self.apellidos}"

    def __str__(self):
        return f"{self.nombres} {self.apellidos} - DNI: {self.dni}"