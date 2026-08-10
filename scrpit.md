-- ============================================================
-- SGME - SISTEMA DE GESTIÓN DE MATRÍCULA ESCOLAR
-- Base de datos: MatriculaEscolar
-- Motor: PostgreSQL
-- ============================================================
--
-- Este script crea la estructura de la base de datos
-- necesaria para ejecutar el proyecto SGME.
--
-- Tablas:
-- 1. apoderado
-- 2. estudiante
-- 3. grado_seccion
-- 4. matricula
-- 5. pago
-- 6. documento
-- 7. evento
--
-- ============================================================


-- ============================================================
-- ELIMINAR TABLAS SI YA EXISTEN
-- ============================================================
--
-- Se eliminan en este orden debido a las claves foráneas.
-- ============================================================

DROP TABLE IF EXISTS pago CASCADE;
DROP TABLE IF EXISTS documento CASCADE;
DROP TABLE IF EXISTS matricula CASCADE;
DROP TABLE IF EXISTS estudiante CASCADE;
DROP TABLE IF EXISTS grado_seccion CASCADE;
DROP TABLE IF EXISTS apoderado CASCADE;
DROP TABLE IF EXISTS evento CASCADE;


-- ============================================================
-- TABLA APODERADO
-- ============================================================

CREATE TABLE apoderado (

    id SERIAL PRIMARY KEY,

    dni VARCHAR(8) NOT NULL UNIQUE,

    nombres VARCHAR(100) NOT NULL,

    apellidos VARCHAR(100) NOT NULL,

    telefono VARCHAR(20),

    email VARCHAR(150),

    parentesco VARCHAR(50)

);


-- ============================================================
-- TABLA ESTUDIANTE
-- ============================================================

CREATE TABLE estudiante (

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
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);


-- ============================================================
-- TABLA GRADO Y SECCIÓN
-- ============================================================

CREATE TABLE grado_seccion (

    id SERIAL PRIMARY KEY,

    grado VARCHAR(20) NOT NULL,

    seccion VARCHAR(10) NOT NULL,

    CONSTRAINT uq_grado_seccion
        UNIQUE (grado, seccion)

);


-- ============================================================
-- TABLA MATRÍCULA
-- ============================================================

CREATE TABLE matricula (

    id SERIAL PRIMARY KEY,

    anio INTEGER NOT NULL,

    fecha DATE NOT NULL,

    estado VARCHAR(30) NOT NULL,

    id_estudiante INTEGER NOT NULL,

    id_grado_seccion INTEGER NOT NULL,

    CONSTRAINT fk_matricula_estudiante
        FOREIGN KEY (id_estudiante)
        REFERENCES estudiante(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_matricula_grado_seccion
        FOREIGN KEY (id_grado_seccion)
        REFERENCES grado_seccion(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);


-- ============================================================
-- TABLA PAGO
-- ============================================================

CREATE TABLE pago (

    id SERIAL PRIMARY KEY,

    fecha DATE NOT NULL,

    monto NUMERIC(10,2) NOT NULL,

    comprobante VARCHAR(100),

    id_matricula INTEGER NOT NULL,

    CONSTRAINT fk_pago_matricula
        FOREIGN KEY (id_matricula)
        REFERENCES matricula(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);


-- ============================================================
-- TABLA DOCUMENTO
-- ============================================================

CREATE TABLE documento (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(150) NOT NULL,

    tipo VARCHAR(50) NOT NULL,

    ruta VARCHAR(300),

    id_estudiante INTEGER NOT NULL,

    CONSTRAINT fk_documento_estudiante
        FOREIGN KEY (id_estudiante)
        REFERENCES estudiante(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);


-- ============================================================
-- TABLA EVENTO
-- ============================================================
--
-- Almacena eventos que serán mostrados en el calendario
-- del Dashboard de SGME.
-- ============================================================

CREATE TABLE evento (

    id SERIAL PRIMARY KEY,

    titulo VARCHAR(150) NOT NULL,

    descripcion TEXT,

    fecha DATE NOT NULL,

    tipo VARCHAR(50),

    estado VARCHAR(30) DEFAULT 'Activo'

);


-- ============================================================
-- ÍNDICES
-- ============================================================
--
-- Mejoran las búsquedas realizadas mediante las relaciones.
-- ============================================================

CREATE INDEX idx_estudiante_apoderado
ON estudiante(id_apoderado);

CREATE INDEX idx_matricula_estudiante
ON matricula(id_estudiante);

CREATE INDEX idx_matricula_grado
ON matricula(id_grado_seccion);

CREATE INDEX idx_pago_matricula
ON pago(id_matricula);

CREATE INDEX idx_documento_estudiante
ON documento(id_estudiante);

CREATE INDEX idx_evento_fecha
ON evento(fecha);


-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================

SELECT 'Base de datos SGME creada correctamente' AS mensaje;