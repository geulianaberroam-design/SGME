from persistencia.conexion import obtener_conexion

conexion = obtener_conexion()

if conexion:
    try:
        cursor = conexion.cursor()

        # Ver estudiantes existentes
        cursor.execute("""
            SELECT id, dni, nombres, apellidos
            FROM estudiante
            ORDER BY id;
        """)

        estudiantes = cursor.fetchall()

        print("ESTUDIANTES:")
        for estudiante in estudiantes:
            print(estudiante)

        # Ver grados y secciones existentes
        cursor.execute("""
            SELECT id, grado, seccion
            FROM grado_seccion
            ORDER BY id;
        """)

        grados = cursor.fetchall()

        print("\nGRADOS Y SECCIONES:")
        for grado in grados:
            print(grado)

        # Insertar matrícula de prueba
        cursor.execute("""
            INSERT INTO matricula
            (
                anio,
                fecha,
                estado,
                id_estudiante,
                id_grado_seccion
            )
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
        """, (
            2026,
            "2026-08-09",
            "Matriculado",
            2,
            1
        ))

        id_matricula = cursor.fetchone()[0]

        print("\nID de matrícula creada:", id_matricula)

        conexion.commit()

        print("COMMIT ejecutado correctamente.")

        # Comprobar inmediatamente
        cursor.execute("""
            SELECT *
            FROM public.matricula;
        """)

        registros = cursor.fetchall()

        print("\nMATRÍCULAS EN LA BASE DE DATOS:")

        for registro in registros:
            print(registro)

    except Exception as e:
        conexion.rollback()
        print("\nERROR:", e)

    finally:
        cursor.close()
        conexion.close()
else:
    print("No se pudo conectar.")
    