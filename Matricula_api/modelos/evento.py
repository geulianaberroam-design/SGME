class Evento:
    """
    Representa un evento del calendario escolar.
    """

    def __init__(
        self,
        titulo="",
        descripcion="",
        fecha=None,
        tipo="",
        estado="Activo",
        id=None
    ):
        self.id = id
        self.titulo = titulo
        self.descripcion = descripcion
        self.fecha = fecha
        self.tipo = tipo
        self.estado = estado