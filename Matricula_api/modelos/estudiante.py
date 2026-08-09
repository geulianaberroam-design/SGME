from modelos.persona import Persona


class Estudiante(Persona):
    """
    Representa los datos de un estudiante.
    """

    def __init__(
        self,
        dni="",
        nombres="",
        apellidos="",
        telefono="",
        email="",
        fecha_nac=None,
        direccion="",
        id_apoderado=None,
        id=None
    ):
        super().__init__(
            dni=dni,
            nombres=nombres,
            apellidos=apellidos,
            telefono=telefono,
            email=email
        )

        self.id = id
        self.fecha_nac = fecha_nac
        self.direccion = direccion
        self.id_apoderado = id_apoderado