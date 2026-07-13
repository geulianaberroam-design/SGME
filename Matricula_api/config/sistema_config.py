class SistemaConfig:

    _instancia = None

    def __new__(cls):

        if cls._instancia is None:

            cls._instancia = super().__new__(cls)

            cls._instancia.nombre = "SGME"
            cls._instancia.version = "1.0"
            cls._instancia.empresa = "Institución Educativa"

        return cls._instancia