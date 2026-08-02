from modelos.persona import Persona
from modelos.apoderado import Apoderado

class Estudiante(Persona):
    """
    Representa a un estudiante del sistema de matrícula.
    Hereda los atributos de la clase Persona y agrega
    información propia del estudiante.
    """

    def __init__(self, dni="", nombres="", apellidos="", telefono="", email="",
                 fecha_nac="", direccion="", apoderado=None):
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
        # Evitamos error si el apoderado aún no ha sido cargado/asignado
        nombre_apoderado = "Sin asignación"
        if self.apoderado:
            if isinstance(self.apoderado, dict):
                nombre_apoderado = f"{self.apoderado.get('nombres', '')} {self.apoderado.get('apellidos', '')}"
            else:
                nombre_apoderado = f"{getattr(self.apoderado, 'nombres', '')} {getattr(self.apoderado, 'apellidos', '')}"

        return (f"[{self.id}] {self.nombres} {self.apellidos} | "
                f"DNI: {self.dni} | "
                f"Apoderado: {nombre_apoderado}")

    # --- 1. Objeto -> Diccionario (Para respuestas JSON) ---
    def to_dict(self):
        """
        Convierte la instancia de Estudiante a un diccionario.
        Serializa también el objeto Apoderado si este posee to_dict().
        """
        apoderado_data = self.apoderado
        if hasattr(self.apoderado, "to_dict"):
            apoderado_data = self.apoderado.to_dict()

        return {
            "id": self.id,
            "dni": self.dni,
            "nombres": self.nombres,
            "apellidos": self.apellidos,
            "telefono": self.telefono,
            "email": self.email,
            "fecha_nac": self.fecha_nac,
            "direccion": self.direccion,
            "apoderado": apoderado_data
        }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """
        Crea una nueva instancia de Estudiante a partir de un diccionario.
        Reconstruye automáticamente el objeto Apoderado si viene en los datos.
        """
        datos_apoderado = datos.get("apoderado", None)
        obj_apoderado = datos_apoderado

        # Si los datos del apoderado vienen en formato diccionario, los convertimos a objeto Apoderado
        if isinstance(datos_apoderado, dict):
            obj_apoderado = Apoderado.from_dict(datos_apoderado)

        estudiante = cls(
            dni=datos.get("dni", ""),
            nombres=datos.get("nombres", ""),
            apellidos=datos.get("apellidos", ""),
            telefono=datos.get("telefono", ""),
            email=datos.get("email", ""),
            fecha_nac=datos.get("fecha_nac", ""),
            direccion=datos.get("direccion", ""),
            apoderado=obj_apoderado
        )

        estudiante.id = datos.get("id", None)
        return estudiante