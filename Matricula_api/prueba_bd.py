from persistencia.conexion import obtener_conexion

conexion = obtener_conexion()

if conexion:
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT
            current_database(),
            current_user,
            current_schema(),
            inet_server_addr(),
            inet_server_port();
    """)

    resultado = cursor.fetchone()

    print("Base de datos:", resultado[0])
    print("Usuario:", resultado[1])
    print("Schema:", resultado[2])
    print("Servidor:", resultado[3])
    print("Puerto:", resultado[4])

    cursor.execute("SELECT COUNT(*) FROM public.matricula;")

    cantidad = cursor.fetchone()[0]

    print("Cantidad de matrículas:", cantidad)

    cursor.close()
    conexion.close()
else:
    print("No se pudo conectar.")