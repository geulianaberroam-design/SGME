from modelos.apoderado import Apoderado


class ApoderadoDAO:
    """
    Gestiona las operaciones CRUD de los apoderados
    almacenados en memoria.
    """

    def __init__(self):
        """
        Inicializa la lista de apoderados en memoria y el auto-incrementador de IDs.
        """
        self.__bd = []
        self.__cid = 1

    # --- CREATE ---
    def insertar(self, apoderado: Apoderado):
        """
        Inserta un nuevo apoderado validando que el DNI no se repita.
        """
        if self.buscar_por_dni(apoderado.dni):
            raise ValueError("El DNI ya está registrado en el sistema.")

        apoderado.id = self.__cid
        self.__cid += 1

        self.__bd.append(apoderado)
        return apoderado

    # --- READ ALL ---
    def obtener_todos(self):
        """
        Devuelve la lista completa de apoderados registrados.
        """
        return self.__bd

    # --- READ BY ID ---
    def buscar_por_id(self, id_apoderado):
        """
        Busca un apoderado por su ID (convierte a entero por seguridad).
        """
        try:
            id_num = int(id_apoderado)
        except (ValueError, TypeError):
            return None

        for apoderado in self.__bd:
            if apoderado.id == id_num:
                return apoderado

        return None

    # --- READ BY DNI ---
    def buscar_por_dni(self, dni):
        """
        Busca un apoderado por su número de DNI.
        """
        dni_str = str(dni).strip() if dni else ""
        for apoderado in self.__bd:
            if apoderado.dni == dni_str:
                return apoderado

        return None

    # --- UPDATE (Contacto) ---
    def actualizar(self, id_apoderado, telefono, email):
        """
        Actualiza únicamente el teléfono y correo de un apoderado.
        """
        apoderado = self.buscar_por_id(id_apoderado)

        if apoderado:
            apoderado.telefono = telefono
            apoderado.email = email
            return True

        return False

    # --- UPDATE (Completo) ---
    def actualizar_completo(self, id_apoderado, datos_nuevos: dict):
        """
        Actualiza todos los campos permitidos de un apoderado existente.
        """
        apoderado = self.buscar_por_id(id_apoderado)
        if not apoderado:
            return False

        if "nombres" in datos_nuevos:
            apoderado.nombres = datos_nuevos["nombres"]
        if "apellidos" in datos_nuevos:
            apoderado.apellidos = datos_nuevos["apellidos"]
        if "telefono" in datos_nuevos:
            apoderado.telefono = datos_nuevos["telefono"]
        if "email" in datos_nuevos:
            apoderado.email = datos_nuevos["email"]
        if "parentesco" in datos_nuevos:
            apoderado.parentesco = datos_nuevos["parentesco"]

        return True

    # --- DELETE ---
    def eliminar(self, id_apoderado):
        """
        Elimina un apoderado por su ID.
        """
        apoderado = self.buscar_por_id(id_apoderado)

        if apoderado:
            self.__bd.remove(apoderado)
            return True

        return False

    # --- COUNT ---
    def total(self):
        """
        Devuelve la cantidad total de apoderados registrados.
        """
        return len(self.__bd)