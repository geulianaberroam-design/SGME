import pyodbc

def obtener_conexion():
    """
    Establece la conexión con la base de datos SQL Server 'MatriculaEscolar'.
    Retorna el objeto conexion o None si ocurre un fallo.
    """
    # Tu servidor exacto de SQL Server
    servidor = r"DESKTOP-LOJPVLR\SQLEXPRESS"  
    base_datos = "MatriculaEscolar"
    
    cadena_conexion = (
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={servidor};"
        f"DATABASE={base_datos};"
        f"Trusted_Connection=yes;"
    )
    
    try:
        conexion = pyodbc.connect(cadena_conexion)
        return conexion
    except Exception as e:
        print(f"❌ Error crítico al conectar con la BD '{base_datos}': {e}")
        return None

# --- BLOQUE DE PRUEBA DE CONEXIÓN ---
if __name__ == "__main__":
    print("Iniciando prueba de conexión...")
    con = obtener_conexion()
    
    if con:
        print("✅ ¡Conexión exitosa a la base de datos MatriculaEscolar!")
        con.close()
    else:
        print("⚠️ No se pudo establecer la conexión. Verifica SQL Server.")
 