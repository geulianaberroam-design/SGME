class Persona:
    """Representa a una persona dentro del sistema de matrícula."""

    def __init__(self, dni="", nombres="", apellidos="", telefono="", email=""):
        """
        Inicializa una nueva persona.
        """
        self.__dni = dni.strip() if dni else ""
        self.__nombres = nombres.strip().title() if nombres else ""
        self.__apellidos = apellidos.strip().title() if apellidos else ""
        self.__telefono = telefono.strip() if telefono else ""
        self.__email = email.strip().lower() if email else ""

    # --- GETTERS Y SETTERS ---

    @property
    def dni(self):
        return self.__dni

    @dni.setter
    def dni(self, valor):
        self.__dni = valor.strip() if valor else ""

    @property
    def nombres(self):
        return self.__nombres

    @nombres.setter
    def nombres(self, valor):
        self.__nombres = valor.strip().title() if valor else ""

    @property
    def apellidos(self):
        return self.__apellidos

    @apellidos.setter
    def apellidos(self, valor):
        self.__apellidos = valor.strip().title() if valor else ""

    @property
    def telefono(self):
        return self.__telefono

    @telefono.setter
    def telefono(self, valor):
        self.__telefono = valor.strip() if valor else ""

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, valor):
        self.__email = valor.strip().lower() if valor else ""

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

    # --- 1. Objeto -> Diccionario (Para respuestas JSON) ---
    def to_dict(self):
        """Convierte los datos básicos de Persona a un diccionario."""
        return {
            "dni": self.dni,
            "nombres": self.nombres,
            "apellidos": self.apellidos,
            "telefono": self.telefono,
            "email": self.email
        }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """Crea una nueva instancia de Persona a partir de un diccionario."""
        return cls(
            dni=datos.get("dni", ""),
            nombres=datos.get("nombres", ""),
            apellidos=datos.get("apellidos", ""),
            telefono=datos.get("telefono", ""),
            email=datos.get("email", "")
        )