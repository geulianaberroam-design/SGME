# SGME — GUÍA COMPLETA Y ACTUALIZADA PARA EJECUTAR EL PROYECTO EN OTRA LAPTOP

## Sistema de Gestión de Matrícula Escolar

Esta guía explica cómo preparar, configurar y ejecutar el proyecto **SGME** en otra computadora.

El sistema utiliza la siguiente arquitectura:

```text
REACT → AXIOS → FLASK → DAO → POSTGRESQL
```

El proyecto está compuesto por:

- Frontend: React + Vite
- Backend: Python + Flask
- Base de datos: PostgreSQL
- Comunicación HTTP: Axios
- Persistencia: DAO + psycopg2

---

# 1. PROGRAMAS NECESARIOS

Antes de ejecutar el proyecto en otra computadora, instalar:

```text
Git
Python
Node.js
npm
PostgreSQL
pgAdmin 4
Visual Studio Code
```

Comprobar las instalaciones desde CMD o PowerShell:

```bat
python --version
node --version
npm --version
git --version
```

Si todos muestran una versión, están instalados correctamente.

---

# 2. UBICAR EL PROYECTO

En esta laptop el proyecto se encuentra en:

```text
C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main
```

La estructura actual es aproximadamente:

```text
SGME-main
│
├── InterfazSistema
│
├── logs
│
├── Matricula_api
│
├── package-lock.json
├── package.json
├── READMNE.md
└── scrpit.md
```

El backend está en:

```text
Matricula_api
```

El frontend está en:

```text
InterfazSistema
```

---

# 3. ESTRUCTURA GENERAL DEL SISTEMA

El flujo de la aplicación es:

```text
React
   ↓
Axios
   ↓
Flask
   ↓
DAO
   ↓
PostgreSQL
```

React se ejecuta normalmente en:

```text
http://localhost:5173
```

Flask se ejecuta en:

```text
http://127.0.0.1:5000
```

PostgreSQL utiliza la base de datos:

```text
MatriculaEscolar
```

---

# 4. ABRIR EL BACKEND

Abrir CMD o la terminal de Visual Studio Code.

Entrar a:

```bat
cd "C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main\Matricula_api"
```

Comprobar que estás en la carpeta correcta:

```bat
dir
```

Debe aparecer:

```text
app.py
dao
modelos
persistencia
```

---

# 5. DEPENDENCIAS DEL BACKEND

El backend utiliza principalmente:

```text
Flask
flask-cors
psycopg2-binary
```

En esta copia del proyecto no se encontró un archivo:

```text
requirements.txt
```

Por eso las dependencias se instalaron manualmente.

Ejecutar:

```bat
python -m pip install flask flask-cors psycopg2-binary
```

Si aparecen mensajes como:

```text
Successfully installed
```

significa que se instalaron correctamente.

---

# 6. CREAR requirements.txt

Para que en otra computadora no sea necesario instalar las dependencias una por una, crear dentro de:

```text
Matricula_api
```

un archivo llamado:

```text
requirements.txt
```

Contenido:

```txt
Flask
flask-cors
psycopg2-binary
```

Después, en cualquier computadora nueva, bastará con ejecutar:

```bat
python -m pip install -r requirements.txt
```

---

# 7. CONFIGURAR POSTGRESQL

Abrir:

```text
pgAdmin 4
```

En esta computadora se está utilizando:

```text
PostgreSQL 18
```

Dentro de pgAdmin debe existir:

```text
Servers
└── PostgreSQL 18
    └── Databases
        └── MatriculaEscolar
```

La base de datos utilizada por SGME es:

```text
MatriculaEscolar
```

---

# 8. COMPROBAR LAS TABLAS

Dentro de pgAdmin abrir:

```text
MatriculaEscolar
└── Schemas
    └── public
        └── Tables
```

Deben existir las siguientes tablas:

```text
apoderado
estudiante
grado_seccion
matricula
pago
documento
evento
```

Si las tablas ya aparecen, la estructura de la base de datos está creada.

---

# 9. COMPROBAR LOS DATOS

En pgAdmin seleccionar:

```text
MatriculaEscolar
```

y abrir:

```text
Query Tool
```

Ejecutar:

```sql
SELECT * FROM apoderado;
SELECT * FROM estudiante;
SELECT * FROM grado_seccion;
SELECT * FROM matricula;
SELECT * FROM pago;
SELECT * FROM documento;
SELECT * FROM evento;
```

IMPORTANTE:

Si se ejecutan todos los SELECT juntos, pgAdmin puede mostrar principalmente el resultado de la última consulta.

Para comprobar cada tabla, seleccionar una consulta y ejecutarla por separado.

Ejemplo:

```sql
SELECT * FROM estudiante;
```

Si aparecen solo los nombres de las columnas y ninguna fila, significa que:

```text
La tabla existe
pero está vacía
```

Eso no significa que haya un error.

---

# 10. TABLA EVENTO

La tabla evento actualmente utiliza campos como:

```text
id
titulo
descripcion
fecha
tipo
estado
```

Ejemplo de estructura:

```text
id            integer
titulo        varchar
descripcion   text
fecha         date
tipo          varchar
estado        varchar
```

Esta tabla es utilizada por el calendario y los eventos del Dashboard.

---

# 11. CONFIGURAR LA CONEXIÓN DE POSTGRESQL EN PYTHON

Abrir el archivo:

```text
Matricula_api\persistencia\conexion.py
```

Debe contener una conexión similar a:

```python
import psycopg2


def obtener_conexion():

    host = "localhost"
    port = "5432"
    database = "MatriculaEscolar"
    user = "postgres"
    password = "TU_CONTRASEÑA"

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

        print("Error de conexión:", e)

        return None
```

Cambiar:

```text
TU_CONTRASEÑA
```

por la contraseña de PostgreSQL de esa laptop.

Cada computadora puede tener una contraseña diferente.

---

# 12. EJECUTAR EL BACKEND

Desde:

```text
Matricula_api
```

ejecutar:

```bat
python app.py
```

Si todo está correcto aparecerá:

```text
Running on http://127.0.0.1:5000
Press CTRL+C to quit
Restarting with stat
Debugger is active!
```

No cerrar esta terminal.

Mientras esta terminal esté abierta, Flask estará funcionando.

---

# 13. COMPROBAR FLASK

Abrir Chrome y entrar a:

```text
http://127.0.0.1:5000/
```

Debe aparecer:

```json
{
  "mensaje": "API SGME funcionando correctamente"
}
```

Esto confirma que Flask está funcionando.

---

# 14. COMPROBAR LOS ENDPOINTS

Probar:

```text
http://127.0.0.1:5000/api/estudiantes
```

También:

```text
http://127.0.0.1:5000/api/apoderados
http://127.0.0.1:5000/api/matriculas
http://127.0.0.1:5000/api/grados
http://127.0.0.1:5000/api/pagos
http://127.0.0.1:5000/api/documentos
http://127.0.0.1:5000/api/eventos
```

Si aparece:

```json
[]
```

significa:

```text
Flask funciona
PostgreSQL responde
La tabla existe
Pero no tiene registros
```

Por ejemplo:

```json
[]
```

en:

```text
/api/estudiantes
```

significa que la tabla estudiante está vacía.

---

# 15. ENDPOINTS DISPONIBLES ACTUALMENTE

## Estudiantes

```text
GET /api/estudiantes
POST /api/estudiantes
```

## Apoderados

```text
GET /api/apoderados
POST /api/apoderados
PUT /api/apoderados/<id>
DELETE /api/apoderados/<id>
```

## Grados

```text
GET /api/grados
```

## Matrículas

```text
GET /api/matriculas
POST /api/matriculas
PUT /api/matriculas/<id>
DELETE /api/matriculas/<id>
```

## Pagos

```text
GET /api/pagos
```

## Documentos

```text
GET /api/documentos
```

## Eventos

```text
GET /api/eventos
```

---

# 16. CAMPOS DEL MÓDULO APODERADOS

El módulo de Apoderados trabaja con:

```text
id
dni
nombres
apellidos
telefono
email
parentesco
```

React ya puede:

```text
Listar
Registrar
Editar
Eliminar
```

datos de apoderados.

---

# 17. CAMPOS DEL MÓDULO MATRÍCULAS

Matrícula trabaja con:

```text
id
anio
fecha
estado
id_estudiante
id_grado_seccion
```

y se relaciona con:

```text
Estudiante
GradoSeccion
```

El backend ya permite:

```text
Listar matrículas
Registrar matrículas
Cambiar estado
Eliminar matrículas
```

---

# 18. ABRIR EL FRONTEND

No cerrar la terminal donde Flask está ejecutándose.

Abrir otra terminal.

Entrar a:

```bat
cd "C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main\InterfazSistema"
```

---

# 19. INSTALAR DEPENDENCIAS DEL FRONTEND

Ejecutar:

```bat
npm install
```

Este comando leerá:

```text
package.json
package-lock.json
```

y descargará automáticamente las dependencias.

Las principales dependencias utilizadas son:

```text
React
React DOM
Vite
Axios
Bootstrap
Bootstrap Icons
React Router DOM
React Bootstrap Icons
```

Si alguna dependencia falta, ejecutar:

```bat
npm install axios bootstrap bootstrap-icons react-router-dom react-bootstrap-icons
```

---

# 20. EJECUTAR REACT

Desde:

```text
InterfazSistema
```

ejecutar:

```bat
npm run dev
```

Debe aparecer:

```text
Local: http://localhost:5173/
```

Abrir en Chrome:

```text
http://localhost:5173/
```

---

# 21. CONFIGURACIÓN DE AXIOS

Abrir:

```text
InterfazSistema\src\services\api.js
```

Debe tener:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api"
});

export default api;
```

Esto permite hacer llamadas como:

```javascript
api.get("/estudiantes");
```

en lugar de escribir la URL completa.

---

# 22. CONFIGURACIÓN CORS

En:

```text
app.py
```

Flask permite conexiones desde React mediante:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "http://localhost:5174"
        ]
    }
})
```

Esto permite:

```text
React
localhost:5173

↓

Flask
127.0.0.1:5000
```

---

# 23. ORDEN CORRECTO PARA EJECUTAR SGME

Cada vez que se quiera trabajar con el proyecto, seguir este orden.

Primero:

```text
1. Iniciar PostgreSQL
```

Después abrir una terminal:

```bat
cd "C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main\Matricula_api"
```

Ejecutar:

```bat
python app.py
```

Dejar esa terminal abierta.

Luego abrir otra terminal:

```bat
cd "C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main\InterfazSistema"
```

Ejecutar:

```bat
npm run dev
```

Finalmente abrir:

```text
http://localhost:5173/
```

---

# 24. FLUJO COMPLETO DEL SISTEMA

```text
POSTGRESQL
MatriculaEscolar
      ↑
      │
     DAO
      ↑
      │
    FLASK
127.0.0.1:5000
      ↑
      │
    AXIOS
      ↑
      │
    REACT
localhost:5173
```

---

# 25. DEPENDENCIAS DEL BACKEND

```text
Python
Flask
flask-cors
psycopg2-binary
```

Instalación:

```bat
python -m pip install flask flask-cors psycopg2-binary
```

O utilizando requirements.txt:

```bat
python -m pip install -r requirements.txt
```

---

# 26. DEPENDENCIAS DEL FRONTEND

```text
Node.js
npm
React
React DOM
Vite
Axios
Bootstrap
Bootstrap Icons
React Router DOM
React Bootstrap Icons
```

Instalación:

```bat
npm install
```

Si faltan paquetes:

```bat
npm install axios bootstrap bootstrap-icons react-router-dom react-bootstrap-icons
```

---

# 27. PROGRAMAS DE DESARROLLO

```text
Visual Studio Code
Git
GitHub
pgAdmin 4
PostgreSQL 18
```

---

# 28. ARCHIVOS IMPORTANTES DEL PROYECTO

El repositorio debe incluir:

```text
Matricula_api\app.py
Matricula_api\requirements.txt

Matricula_api\dao\
Matricula_api\modelos\
Matricula_api\persistencia\

InterfazSistema\package.json
InterfazSistema\package-lock.json
InterfazSistema\src\
```

También se recomienda agregar:

```text
database\MatriculaEscolar.sql
```

---

# 29. ARCHIVO SQL RECOMENDADO

Se recomienda crear una carpeta:

```text
database
```

y dentro:

```text
MatriculaEscolar.sql
```

Ese archivo debe contener la estructura de:

```text
apoderado
estudiante
grado_seccion
matricula
pago
documento
evento
```

De esta manera, en otra laptop se puede recrear la base de datos fácilmente.

---

# 30. IMPORTANTE SOBRE LOS DATOS

GitHub normalmente guarda el código, pero no guarda directamente la información interna de PostgreSQL.

Por eso:

```json
[]
```

en un endpoint significa que la tabla está vacía.

Para tener los mismos datos de otra laptop existen dos opciones:

```text
1. Registrar los datos nuevamente desde React

o

2. Importar un backup o script SQL con INSERT
```

---

# 31. IMPORTANTE SOBRE node_modules

No subir:

```text
node_modules
```

a GitHub.

Cuando se clone el proyecto en otra laptop, ejecutar:

```bat
npm install
```

y las dependencias se descargarán automáticamente.

---

# 32. IMPORTANTE SOBRE PYTHON

Tampoco se copian las librerías instaladas de Python.

Se vuelven a instalar con:

```bat
python -m pip install -r requirements.txt
```

Por eso es importante crear:

```text
requirements.txt
```

---

# 33. ARCHIVOS QUE NO SE DEBEN SUBIR

Agregar en `.gitignore`:

```gitignore
node_modules/
__pycache__/
*.pyc
.env
```

No subir archivos que contengan contraseñas.

---

# 34. COMPROBACIÓN FINAL

## PostgreSQL

Debe existir:

```text
MatriculaEscolar
```

y las tablas:

```text
apoderado
estudiante
grado_seccion
matricula
pago
documento
evento
```

## Flask

Debe funcionar:

```text
http://127.0.0.1:5000/
```

## API

Debe responder:

```text
http://127.0.0.1:5000/api/estudiantes
```

aunque responda:

```json
[]
```

## React

Debe funcionar:

```text
http://localhost:5173/
```

---

# 35. RESUMEN RÁPIDO

```text
PRIMERA VEZ EN OTRA LAPTOP

1. Instalar:
   Python
   Node.js
   PostgreSQL
   pgAdmin
   Git

2. Abrir PostgreSQL.

3. Crear o comprobar:
   MatriculaEscolar

4. Comprobar tablas.

5. Backend:

   cd "C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main\Matricula_api"

6. Instalar:

   python -m pip install flask flask-cors psycopg2-binary

7. Ejecutar:

   python app.py

8. Probar:

   http://127.0.0.1:5000/

9. Abrir otra terminal.

10. Frontend:

    cd "C:\Users\LENOVO\Downloads\SGME-main (3)\SGME-main\InterfazSistema"

11. Instalar:

    npm install

12. Ejecutar:

    npm run dev

13. Abrir:

    http://localhost:5173/
```

---

# 36. EJECUCIÓN DIARIA

Una vez instalado todo, para volver a trabajar solo se necesita:

```text
TERMINAL 1

cd Matricula_api
python app.py
```

Después:

```text
TERMINAL 2

cd InterfazSistema
npm run dev
```

Y abrir:

```text
http://localhost:5173/
```

---

# 37. NOTA FINAL

Si Flask devuelve:

```json
[]
```

no significa que el backend esté fallando.

Significa:

```text
La API funciona
La conexión con PostgreSQL funciona
La tabla existe
La tabla no tiene registros
```

Si aparece:

```text
ModuleNotFoundError: No module named 'flask'
```

ejecutar:

```bat
python -m pip install flask flask-cors psycopg2-binary
```

Si Flask no puede conectarse a PostgreSQL, revisar:

```text
Matricula_api\persistencia\conexion.py
```

y comprobar:

```text
host
port
database
user
password
```

La base utilizada debe ser:

```text
MatriculaEscolar
```

y el servidor Flask debe quedar levantado en:

```text
http://127.0.0.1:5000
```

# DEPENDENCIAS DEL PROYECTO SGME

El proyecto necesita dependencias tanto para el **backend** como para el **frontend**.

---

## 1. DEPENDENCIAS DEL BACKEND

El backend está desarrollado con Python y Flask.

Las principales dependencias utilizadas son:

```text
Flask
flask-cors
psycopg2-binary
```

### ¿Para qué sirve cada una?

```text
Flask
```

Permite crear el servidor web y los endpoints de la API.

```text
flask-cors
```

Permite que el frontend React pueda realizar peticiones al backend Flask desde otro puerto.

Por ejemplo:

```text
React: http://localhost:5173
Flask: http://127.0.0.1:5000
```

```text
psycopg2-binary
```

Permite conectar Python con PostgreSQL.

---

## 2. INSTALAR DEPENDENCIAS DEL BACKEND

Entrar a la carpeta:

```bat
cd Matricula_api
```

Instalar:

```bat
python -m pip install flask flask-cors psycopg2-binary
```

Después ejecutar:

```bat
python app.py
```

---

## 3. ARCHIVO requirements.txt

Dentro de:

```text
Matricula_api
```

debe existir:

```text
requirements.txt
```

Contenido:

```txt
Flask
flask-cors
psycopg2-binary
```

De esta manera, cuando el proyecto se abra en otra computadora, solamente se necesita ejecutar:

```bat
python -m pip install -r requirements.txt
```

No será necesario instalar cada dependencia manualmente.

---

# 4. DEPENDENCIAS DEL FRONTEND

El frontend está desarrollado con React y Vite.

Las principales dependencias utilizadas son:

```text
React
React DOM
Vite
Axios
Bootstrap
Bootstrap Icons
React Router DOM
React Bootstrap Icons
```

---

## 5. ¿PARA QUÉ SIRVE CADA DEPENDENCIA?

### React

```text
react
```

Permite crear los componentes y páginas de la interfaz.

---

### React DOM

```text
react-dom
```

Permite renderizar la aplicación React en el navegador.

---

### Vite

```text
vite
```

Se utiliza para ejecutar y construir el proyecto React.

El comando utilizado es:

```bat
npm run dev
```

---

### Axios

```text
axios
```

Permite que React se comunique con Flask.

Ejemplo:

```javascript
api.get("/estudiantes");
```

La comunicación es:

```text
React
  ↓
Axios
  ↓
Flask
```

---

### Bootstrap

```text
bootstrap
```

Se utiliza para los estilos de la interfaz, formularios, botones, tablas y otros componentes visuales.

---

### Bootstrap Icons

```text
bootstrap-icons
```

Proporciona los iconos utilizados en la interfaz.

Por ejemplo:

```html
<i className="bi bi-list"></i>
<i className="bi bi-bell"></i>
<i className="bi bi-calendar3"></i>
```

---

### React Router DOM

```text
react-router-dom
```

Permite navegar entre las diferentes páginas del sistema.

Por ejemplo:

```text
/
/estudiantes
/apoderados
/matriculas
/grados
/pagos
/documentos
```

---

### React Bootstrap Icons

```text
react-bootstrap-icons
```

Permite utilizar iconos de Bootstrap directamente como componentes de React.

---

# 6. INSTALAR DEPENDENCIAS DEL FRONTEND

Entrar a:

```bat
cd InterfazSistema
```

Ejecutar:

```bat
npm install
```

Este es el comando recomendado.

`npm install` lee automáticamente:

```text
package.json
package-lock.json
```

y descarga las dependencias necesarias.

---

## 7. INSTALACIÓN MANUAL DEL FRONTEND

Si falta alguna dependencia, se pueden instalar manualmente:

```bat
npm install axios bootstrap bootstrap-icons react-router-dom react-bootstrap-icons
```

React, React DOM y Vite normalmente ya están declarados en el proyecto creado con Vite.

---

# 8. ARCHIVOS IMPORTANTES PARA LAS DEPENDENCIAS

## Backend

```text
Matricula_api/
└── requirements.txt
```

Este archivo guarda las dependencias de Python.

Contenido:

```txt
Flask
flask-cors
psycopg2-binary
```

---

## Frontend

```text
InterfazSistema/
├── package.json
└── package-lock.json
```

Estos archivos guardan las dependencias utilizadas por React.

Por eso deben subirse a GitHub.

---

# 9. NO SUBIR node_modules

No es necesario subir:

```text
node_modules/
```

a GitHub.

La carpeta puede reconstruirse en cualquier computadora ejecutando:

```bat
npm install
```

---

# 10. RESUMEN DE DEPENDENCIAS

## Backend

```text
Python
├── Flask
├── flask-cors
└── psycopg2-binary
```

Instalación:

```bat
python -m pip install flask flask-cors psycopg2-binary
```

O:

```bat
python -m pip install -r requirements.txt
```

---

## Frontend

```text
Node.js / npm
├── React
├── React DOM
├── Vite
├── Axios
├── Bootstrap
├── Bootstrap Icons
├── React Router DOM
└── React Bootstrap Icons
```

Instalación:

```bat
npm install
```

Si faltan paquetes:

```bat
npm install axios bootstrap bootstrap-icons react-router-dom react-bootstrap-icons
```

---

# 11. PROGRAMAS NECESARIOS EN OTRA COMPUTADORA

Además de las dependencias, la computadora debe tener instalados:

```text
Python
Node.js
npm
PostgreSQL
pgAdmin 4
Git
```

Visual Studio Code es recomendado para editar y ejecutar el proyecto.

---

# 12. INSTALACIÓN RÁPIDA EN OTRA COMPUTADORA

## Backend

```bat
cd Matricula_api

python -m pip install -r requirements.txt

python app.py
```

Debe levantar:

```text
http://127.0.0.1:5000
```

## Frontend

Abrir otra terminal:

```bat
cd InterfazSistema

npm install

npm run dev
```

Debe levantar:

```text
http://localhost:5173
```

El sistema finalmente queda conectado así:

```text
React
localhost:5173
      ↓
Axios
      ↓
Flask
127.0.0.1:5000
      ↓
DAO
      ↓
psycopg2
      ↓
PostgreSQL
MatriculaEscolar
```
