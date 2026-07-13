from persistencia.conexion import obtener_conexion


def inicializar_bd():

    conexion = obtener_conexion()

    cursor = conexion.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Apoderado(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        dni TEXT UNIQUE NOT NULL,

        nombres TEXT NOT NULL,

        apellidos TEXT NOT NULL,

        telefono TEXT,

        email TEXT

    )
    """)

    conexion.commit()

    conexion.close()