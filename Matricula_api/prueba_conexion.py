from persistencia.conexion import obtener_conexion

try:
    conexion = obtener_conexion()
    print("Conexión exitosa.")
    conexion.close()

except Exception as e:
    print(e)