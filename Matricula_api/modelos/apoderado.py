from modelos.persona import Persona

class Apoderado(Persona):
    """
    Clase que representa a un Apoderado del sistema.
    Hereda los atributos básicos de la clase Persona.
    """

    def __init__(self, dni="", nombres="", apellidos="", telefono="", email="", parentesco=""):
        # Llama al constructor de la clase padre (Persona)
        super().__init__(dni, nombres, apellidos, telefono, email)
        self.id = None  # Identificador único asignado en la base de datos
        self.parentesco = parentesco

    def obtener_descripcion(self):
        """Devuelve una descripción simple del apoderado."""
        return f"Apoderado: {self.nombres} {self.apellidos}"

    def __str__(self):
        """Formatea la representación en texto del objeto."""
        return f"[{self.id}] {self.nombres} {self.apellidos} | DNI: {self.dni}"

    # --- 1. Objeto -> Diccionario (Para responder en JSON) ---
    def to_dict(self):
        """Convierte la instancia de Apoderado a un diccionario."""
        return {
            "id": self.id,
            "dni": self.dni,
            "nombres": self.nombres,
            "apellidos": self.apellidos,
            "telefono": self.telefono,
            "email": self.email,
            "parentesco": self.parentesco
        }

    # --- 2. Diccionario -> Objeto (Para leer solicitudes JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """
        Crea una nueva instancia de Apoderado a partir de un diccionario.
        Funciona como un constructor alternativo.
        """
        # Se usa .get() para evitar errores KeyError si algún campo viene vacío
        apoderado = cls(
            dni=datos.get("dni", ""),
            nombres=datos.get("nombres", ""),
            apellidos=datos.get("apellidos", ""),
            telefono=datos.get("telefono", ""),
            email=datos.get("email", ""),
            parentesco=datos.get("parentesco", "")
        )
        
        # Asignamos el ID si viene en el diccionario
        apoderado.id = datos.get("id", None)
        return apoderado