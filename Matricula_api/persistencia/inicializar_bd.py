from persistencia.conexion import obtener_conexion


def inicializar_bd():

    conexion = obtener_conexion()

    if not conexion:
        print("❌ No se pudo establecer la conexión para inicializar la BD.")
        return

    cursor = conexion.cursor()

    script_tablas = """

    CREATE TABLE IF NOT EXISTS apoderado (
        id SERIAL PRIMARY KEY,
        dni VARCHAR(8) NOT NULL UNIQUE,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        email VARCHAR(150),
        parentesco VARCHAR(50)
    );


    CREATE TABLE IF NOT EXISTS estudiante (
        id SERIAL PRIMARY KEY,
        dni VARCHAR(8) NOT NULL UNIQUE,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        email VARCHAR(150),
        fecha_nac DATE,
        direccion VARCHAR(200),
        id_apoderado INTEGER NOT NULL,

        CONSTRAINT fk_estudiante_apoderado
            FOREIGN KEY (id_apoderado)
            REFERENCES apoderado(id)
    );


    CREATE TABLE IF NOT EXISTS grado_seccion (
        id SERIAL PRIMARY KEY,
        grado VARCHAR(20) NOT NULL,
        seccion VARCHAR(10) NOT NULL,

        CONSTRAINT uq_grado_seccion
            UNIQUE (grado, seccion)
    );


    CREATE TABLE IF NOT EXISTS matricula (
        id SERIAL PRIMARY KEY,
        anio INTEGER NOT NULL,
        fecha DATE NOT NULL,
        estado VARCHAR(30) NOT NULL,
        id_estudiante INTEGER NOT NULL,
        id_grado_seccion INTEGER NOT NULL,

        CONSTRAINT fk_matricula_estudiante
            FOREIGN KEY (id_estudiante)
            REFERENCES estudiante(id),

        CONSTRAINT fk_matricula_grado
            FOREIGN KEY (id_grado_seccion)
            REFERENCES grado_seccion(id)
    );


    CREATE TABLE IF NOT EXISTS pago (
        id SERIAL PRIMARY KEY,
        fecha DATE NOT NULL,
        monto NUMERIC(10,2) NOT NULL,
        comprobante VARCHAR(100),
        id_matricula INTEGER NOT NULL,

        CONSTRAINT fk_pago_matricula
            FOREIGN KEY (id_matricula)
            REFERENCES matricula(id)
    );


    CREATE TABLE IF NOT EXISTS documento (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        ruta VARCHAR(300),
        id_estudiante INTEGER NOT NULL,

        CONSTRAINT fk_documento_estudiante
            FOREIGN KEY (id_estudiante)
            REFERENCES estudiante(id)
    );


    CREATE TABLE IF NOT EXISTS evento (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(150) NOT NULL,
        descripcion TEXT,
        fecha DATE NOT NULL,
        tipo VARCHAR(50),
        estado VARCHAR(30) DEFAULT 'Activo'
    );

    """

    try:

        cursor.execute(script_tablas)

        conexion.commit()

        print("✅ Estructura PostgreSQL verificada correctamente.")

    except Exception as e:

        conexion.rollback()

        print(f"❌ Error al inicializar la base de datos: {e}")

    finally:

        cursor.close()
        conexion.close()


if __name__ == "__main__":
    inicializar_bd()