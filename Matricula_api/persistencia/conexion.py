import pyodbc

def obtener_conexion():

    conexion = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=(local)\\SQLEXPRESS;"
        "DATABASE=BD_MatriculaEscolar;"
        "Trusted_Connection=yes;"
    )

    return conexion