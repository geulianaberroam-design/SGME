# Importas la conexión oficial a SQL Server que ya creaste
from conexion import obtener_conexion

def probar_conexion_persistencia():
    conexion = obtener_conexion()
    if conexion:
        print("✅ Persistencia conectada correctamente a SQL Server")
        conexion.close()
    else:
        print("❌ Error al probar la persistencia con SQL Server")

# Esta línea ejecuta la función cuando corres el archivo directamente
if __name__ == "__main__":
    probar_conexion_persistencia()