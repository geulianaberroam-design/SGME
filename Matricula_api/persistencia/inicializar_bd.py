from persistencia.conexion import obtener_conexion

def inicializar_bd():
    conexion = obtener_conexion()
    if not conexion:
        print("❌ No se pudo establecer la conexión para inicializar la BD.")
        return

    cursor = conexion.cursor()

    # Script con la estructura exacta de tus 6 tablas
    script_tablas = """
    -- Tabla Apoderado
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Apoderado')
    CREATE TABLE Apoderado (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombres VARCHAR(100),
        apellidos VARCHAR(100),
        dni VARCHAR(8),
        telefono VARCHAR(15),
        email VARCHAR(100)
    );

    -- Tabla Estudiante
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Estudiante')
    CREATE TABLE Estudiante (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombres VARCHAR(100),
        apellidos VARCHAR(100),
        fecha_nac DATE NOT NULL,
        direccion VARCHAR(200),
        dni VARCHAR(8) UNIQUE,
        id_apoderado INT FOREIGN KEY REFERENCES Apoderado(id)
    );

    -- Tabla GradoSeccion
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'GradoSeccion')
    CREATE TABLE GradoSeccion (
        id INT IDENTITY(1,1) PRIMARY KEY,
        grado VARCHAR(20),
        seccion VARCHAR(1)
    );

    -- Tabla Matricula
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Matricula')
    CREATE TABLE Matricula (
        id INT IDENTITY(1,1) PRIMARY KEY,
        anio INT,
        estado VARCHAR(20),
        fecha DATE,
        id_estudiante INT NOT NULL FOREIGN KEY REFERENCES Estudiante(id),
        id_grado_seccion INT FOREIGN KEY REFERENCES GradoSeccion(id)
    );

    -- Tabla Pago
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Pago')
    CREATE TABLE Pago (
        id INT IDENTITY(1,1) PRIMARY KEY,
        fecha DATE,
        monto DECIMAL(10,2),
        comprobante VARCHAR(50),
        id_matricula INT FOREIGN KEY REFERENCES Matricula(id)
    );

    -- Tabla Documento
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Documento')
    CREATE TABLE Documento (
        id INT IDENTITY(1,1) PRIMARY KEY,
        tipo VARCHAR(50),
        estado VARCHAR(20),
        id_estudiante INT FOREIGN KEY REFERENCES Estudiante(id)
    );
    """

    try:
        cursor.execute(script_tablas)
        conexion.commit()
        print("✅ ¡Estructura de base de datos e inicialización verificadas con éxito!")
    except Exception as e:
        print(f"❌ Error al inicializar la base de datos: {e}")
    finally:
        cursor.close()
        conexion.close()

if __name__ == "__main__":
    inicializar_bd()