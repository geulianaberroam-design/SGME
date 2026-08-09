class SistemaConfig:
    """
    Clase que implementa el patrón de diseño Singleton para gestionar la
    configuración global del sistema. Garantiza que solo exista una instancia
    única en toda la aplicación.
    """

    # Atributo de clase privado para almacenar la instancia única
    _instancia = None

    def __new__(cls):
        """
        Método especial __new__ que controla la creación de la instancia.
        Si la instancia aún no existe, la crea e inicializa sus valores.
        Si ya existe, retorna la instancia previamente creada.
        """

        if cls._instancia is None:

            # Crea la única instancia de la clase
            cls._instancia = super().__new__(cls)

            # Atributos de configuración iniciales del sistema
            cls._instancia.nombre_sistema = (
                "SGME - Sistema de Gestión de Matrícula Escolar"
            )

            cls._instancia.version = "1.0.0"
            cls._instancia.institucion = "Institución Educativa SGME"
            cls._instancia.anio_escolar = 2026
            cls._instancia.moneda = "PEN"

        return cls._instancia

    def obtener_resumen(self):
        """
        Retorna un diccionario con los datos principales
        de la configuración general del sistema.
        """

        return {
            "nombre": self.nombre_sistema,
            "version": self.version,
            "institucion": self.institucion,
            "anio_escolar": self.anio_escolar,
            "moneda": self.moneda
        }


# Instancia global del sistema
sistema_config = SistemaConfig()