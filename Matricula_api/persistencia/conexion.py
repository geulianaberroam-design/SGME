import psycopg2


def obtener_conexion():
    """
    Establece la conexión con la base de datos PostgreSQL.
    Retorna el objeto conexión o None si ocurre un error.
    """

    host = "localhost"
    port = "5432"
    database = "MatriculaEscolar"      # Cambia si tu BD tiene otro nombre
    user = "postgres"                  # Cambia por tu usuario
    password = "root"         # Cambia por tu contraseña

    try:
        conexion = psycopg2.connect(
            host=host,
            port=port,
            dbname=database,
            user=user,
            password=password
        )
        return conexion

    except Exception as e:
        print(f"❌ Error al conectar a PostgreSQL: {e}")
        return None


# Prueba de conexión
if __name__ == "__main__":
    print("Iniciando prueba de conexión...")

    conexion = obtener_conexion()

    if conexion:
        print("✅ Conexión exitosa a PostgreSQL.")
        conexion.close()
    else:
        print("❌ No fue posible conectarse.")