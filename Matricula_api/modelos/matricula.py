from modelos.estudiante import Estudiante
from modelos.grado_seccion import GradoSeccion

class Matricula:
    """Representa una matrícula de un estudiante."""

    def __init__(self, anio="", fecha="", estado="", estudiante=None, grado_seccion=None):
        """Inicializa una nueva matrícula."""
        self.id = None
        self.anio = anio
        self.fecha = fecha
        self.estado = estado.strip().title() if estado else ""
        self.estudiante = estudiante
        self.grado_seccion = grado_seccion

    def obtener_resumen(self):
        """Devuelve un resumen de la matrícula."""
        nombre_estudiante = "Sin estudiante"
        if self.estudiante:
            nombre_estudiante = f"{getattr(self.estudiante, 'nombres', '')} {getattr(self.estudiante, 'apellidos', '')}"

        gs_info = "Sin grado/sección"
        if self.grado_seccion:
            gs_info = f"{getattr(self.grado_seccion, 'grado', '')} - {getattr(self.grado_seccion, 'seccion', '')}"

        return f"{nombre_estudiante} | {gs_info}"

    def __str__(self):
        """Devuelve una representación legible de la matrícula."""
        doc_id = f"[{self.id}]" if self.id is not None else "[Sin ID]"

        # Obtención segura de nombres
        nombre_est = "N/A"
        if self.estudiante:
            nombre_est = f"{getattr(self.estudiante, 'nombres', '')} {getattr(self.estudiante, 'apellidos', '')}"

        # Obtención segura de Grado / Sección
        grado_str = getattr(self.grado_seccion, 'grado', 'N/A') if self.grado_seccion else 'N/A'
        seccion_str = getattr(self.grado_seccion, 'seccion', 'N/A') if self.grado_seccion else 'N/A'

        return (f"{doc_id} "
                f"Año: {self.anio} | "
                f"Fecha: {self.fecha} | "
                f"Estado: {self.estado} | "
                f"Estudiante: {nombre_est} | "
                f"Grado: {grado_str} | "
                f"Sección: {seccion_str}")

    # --- 1. Objeto -> Diccionario (Para respuestas JSON) ---
    def to_dict(self):
        """
        Convierte la instancia de Matricula a un diccionario.
        Serializa recursivamente los objetos asociados.
        """
        estudiante_data = self.estudiante
        if hasattr(self.estudiante, "to_dict"):
            estudiante_data = self.estudiante.to_dict()

        grado_seccion_data = self.grado_seccion
        if hasattr(self.grado_seccion, "to_dict"):
            grado_seccion_data = self.grado_seccion.to_dict()

        return {
            "id": self.id,
            "anio": self.anio,
            "fecha": self.fecha,
            "estado": self.estado,
            "estudiante": estudiante_data,
            "grado_seccion": grado_seccion_data
        }

    # --- 2. Diccionario -> Objeto (Constructor alternativo desde JSON) ---
    @classmethod
    def from_dict(cls, datos: dict):
        """
        Crea una nueva instancia de Matricula a partir de un diccionario.
        Reconstruye automáticamente los objetos Estudiante y GradoSeccion.
        """
        datos_est = datos.get("estudiante", None)
        obj_est = datos_est
        if isinstance(datos_est, dict):
            obj_est = Estudiante.from_dict(datos_est)

        datos_gs = datos.get("grado_seccion", None)
        obj_gs = datos_gs
        if isinstance(datos_gs, dict):
            obj_gs = GradoSeccion.from_dict(datos_gs)

        matricula = cls(
            anio=datos.get("anio", ""),
            fecha=datos.get("fecha", ""),
            estado=datos.get("estado", ""),
            estudiante=obj_est,
            grado_seccion=obj_gs
        )

        matricula.id = datos.get("id", None)
        return matricula