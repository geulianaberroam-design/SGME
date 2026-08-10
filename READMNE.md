# SGME — GUÍA COMPLETA DE INSTALACIÓN Y CONEXIÓN

## Sistema de Gestión de Matrícula Escolar

Esta guía explica cómo instalar, configurar y ejecutar el proyecto **SGME** en otra computadora.

El sistema está desarrollado utilizando:

- React
- Vite
- Axios
- Bootstrap
- Python
- Flask
- PostgreSQL
- Git / GitHub

La arquitectura general del proyecto es:

```text
REACT → AXIOS → FLASK → DAO → POSTGRESQL
```

---

# 1. PROGRAMAS NECESARIOS

Antes de ejecutar el proyecto en otra computadora se deben instalar los siguientes programas:

- Git
- Python
- Node.js
- npm
- PostgreSQL
- pgAdmin 4
- Visual Studio Code (recomendado)

Comprobar las instalaciones desde una terminal:

```bash
python --version
node --version
npm --version
git --version
```

---

# 2. CLONAR EL PROYECTO DESDE GITHUB

Abrir Git Bash, PowerShell o la terminal de Visual Studio Code.

Ejecutar:

```bash
git clone URL_DEL_REPOSITORIO
```

Reemplazar:

```text
URL_DEL_REPOSITORIO
```

por la dirección real del repositorio de GitHub.

Luego entrar a la carpeta:

```bash
cd SGME
```

---

# 3. ESTRUCTURA GENERAL DEL PROYECTO

El proyecto contiene dos partes principales:

```text
SGME
│
├── Matricula_api
│   │
│   ├── app.py
│   ├── requirements.txt
│   │
│   ├── dao
│   ├── modelos
│   └── persistencia
│
├── InterfazSistema
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── src
│
└── database
    └── MatriculaEscolar.sql
```

El proyecto funciona de la siguiente manera:

```text
Frontend React
      ↓
Axios
      ↓
API Flask
      ↓
DAO
      ↓
PostgreSQL
```

---

# 4. DEPENDENCIAS DEL BACKEND

El backend utiliza principalmente:

```text
Python
Flask
flask-cors
psycopg2-binary
```

Estas dependencias deben estar registradas en:

```text
Matricula_api/requirements.txt
```

El archivo debe contener como mínimo:

```txt
Flask
flask-cors
psycopg2-binary
```

Para instalar todas las dependencias entrar a la carpeta del backend:

```bash
cd Matricula_api
```

Ejecutar:

```bash
python -m pip install -r requirements.txt
```

Esto instalará automáticamente las librerías necesarias para ejecutar Flask y conectarse con PostgreSQL.

---

# 5. DEPENDENCIAS DEL FRONTEND

El frontend utiliza:

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

Estas dependencias deben encontrarse registradas en:

```text
InterfazSistema/package.json
```

No es necesario subir la carpeta:

```text
node_modules
```

a GitHub.

Cuando se clone el proyecto en otra computadora, entrar a:

```bash
cd InterfazSistema
```

y ejecutar:

```bash
npm install
```

`npm install` leerá automáticamente:

```text
package.json
package-lock.json
```

y descargará las dependencias necesarias.

Si por algún motivo faltan las dependencias principales, se pueden instalar con:

```bash
npm install axios bootstrap bootstrap-icons react-router-dom react-bootstrap-icons
```

---

# 6. CREAR LA BASE DE DATOS POSTGRESQL

Abrir:

```text
pgAdmin 4
```

Conectarse al servidor PostgreSQL.

Crear la base de datos:

```sql
CREATE DATABASE "MatriculaEscolar";
```

Luego seleccionar la base de datos:

```text
MatriculaEscolar
```

y ejecutar el archivo SQL incluido en el repositorio.

Por ejemplo:

```text
database/MatriculaEscolar.sql
```

Este archivo debe contener la estructura actualizada de la base de datos.

Las tablas utilizadas actualmente por SGME incluyen:

```text
apoderado
estudiante
grado_seccion
matricula
pago
documento
evento
```

Es importante que el archivo SQL del repositorio también contenga la tabla:

```text
evento
```

y las modificaciones recientes de las demás tablas, como el campo:

```text
parentesco
```

de la tabla de apoderados.

---

# 7. CONFIGURAR LA CONEXIÓN CON POSTGRESQL

En el backend buscar el archivo:

```text
Matricula_api/persistencia/conexion.py
```

La conexión debe contener los datos de PostgreSQL de la computadora donde se ejecutará SGME.

Ejemplo:

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

Reemplazar:

```text
TU_CONTRASEÑA
```

por la contraseña de PostgreSQL de esa computadora.

Ejemplo:

```python
password = "root"
```

IMPORTANTE:

La contraseña de PostgreSQL puede ser diferente en cada computadora.

Por eso se debe revisar:

```text
persistencia/conexion.py
```

cuando se abra el proyecto en otro equipo.

---

# 8. EJECUTAR EL BACKEND FLASK

Primero comprobar que PostgreSQL esté funcionando.

Luego abrir una terminal.

Entrar a la carpeta:

```bash
cd Matricula_api
```

Ejecutar:

```bash
python app.py
```

Si todo funciona correctamente debe aparecer algo parecido a:

```text
Running on http://127.0.0.1:5000
```

La API estará disponible en:

```text
http://127.0.0.1:5000
```

IMPORTANTE:

No cerrar esta terminal mientras se utiliza SGME.

---

# 9. COMPROBAR QUE FLASK FUNCIONA

Abrir en Chrome:

```text
http://127.0.0.1:5000/
```

Debe aparecer:

```json
{
    "mensaje": "API SGME funcionando correctamente"
}
```

También se pueden comprobar los diferentes módulos.

Estudiantes:

```text
http://127.0.0.1:5000/api/estudiantes
```

Apoderados:

```text
http://127.0.0.1:5000/api/apoderados
```

Matrículas:

```text
http://127.0.0.1:5000/api/matriculas
```

Grados y secciones:

```text
http://127.0.0.1:5000/api/grados
```

Pagos:

```text
http://127.0.0.1:5000/api/pagos
```

Documentos:

```text
http://127.0.0.1:5000/api/documentos
```

Eventos:

```text
http://127.0.0.1:5000/api/eventos
```

Si aparecen datos en formato JSON significa que:

```text
Flask → DAO → PostgreSQL
```

está funcionando correctamente.

---

# 10. CONFIGURACIÓN DE AXIOS

React utiliza Axios para comunicarse con Flask.

El archivo:

```text
InterfazSistema/src/services/api.js
```

debe tener una configuración similar a:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api"
});

export default api;
```

Gracias a esto desde React podemos utilizar:

```javascript
api.get("/estudiantes");
```

en lugar de escribir:

```javascript
axios.get("http://127.0.0.1:5000/api/estudiantes");
```

---

# 11. CONFIGURACIÓN CORS

Flask utiliza:

```text
flask-cors
```

para permitir que React pueda comunicarse con el backend.

En:

```text
app.py
```

se encuentra una configuración similar a:

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

Esto permite la comunicación entre:

```text
React
http://localhost:5173

        ↓

Flask
http://127.0.0.1:5000
```

---

# 12. EJECUTAR EL FRONTEND REACT

Abrir una SEGUNDA terminal.

No cerrar la terminal donde está ejecutándose Flask.

Entrar a:

```bash
cd InterfazSistema
```

Si es la primera vez que se abre el proyecto en esa computadora ejecutar:

```bash
npm install
```

Después ejecutar:

```bash
npm run dev
```

Vite mostrará algo parecido a:

```text
Local: http://localhost:5173/
```

Abrir en Chrome:

```text
http://localhost:5173/
```

La interfaz SGME debería aparecer.

---

# 13. ORDEN CORRECTO PARA EJECUTAR EL SISTEMA

Cada vez que se quiera utilizar SGME se debe seguir este orden.

Primero:

```text
1. Iniciar PostgreSQL
```

Después abrir una terminal para Flask:

```bash
cd Matricula_api
python app.py
```

Dejar esa terminal abierta.

Luego abrir otra terminal:

```bash
cd InterfazSistema
npm run dev
```

Finalmente abrir:

```text
http://localhost:5173/
```

El flujo completo será:

```text
POSTGRESQL
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

# 14. MÓDULOS ACTUALES DEL SISTEMA

Actualmente SGME trabaja con los siguientes módulos:

```text
Estudiantes
Apoderados
Matrículas
Grados y Secciones
Pagos
Documentos
Eventos
```

---

# 15. API DE APODERADOS

El módulo de Apoderados cuenta con operaciones CRUD.

```text
GET
/api/apoderados
```

Permite listar apoderados.

```text
POST
/api/apoderados
```

Permite registrar apoderados.

```text
PUT
/api/apoderados/<id>
```

Permite editar un apoderado.

```text
DELETE
/api/apoderados/<id>
```

Permite eliminar un apoderado.

El módulo utiliza campos como:

```text
id
dni
nombres
apellidos
telefono
email
parentesco
```

---

# 16. API DE MATRÍCULAS

El módulo de Matrículas utiliza:

```text
GET
/api/matriculas
```

Para listar las matrículas.

```text
POST
/api/matriculas
```

Para registrar una matrícula.

```text
PUT
/api/matriculas/<id>
```

Para actualizar el estado de una matrícula.

```text
DELETE
/api/matriculas/<id>
```

Para eliminar una matrícula.

Las matrículas están relacionadas con:

```text
Estudiante
GradoSeccion
```

Por eso React también consulta:

```text
/api/estudiantes
/api/grados
```

para cargar los datos de los formularios.

---

# 17. EVENTOS

El sistema también incluye la tabla:

```text
evento
```

y el endpoint:

```text
GET /api/eventos
```

Este endpoint permite obtener los eventos registrados en PostgreSQL.

Los eventos pueden contener información como:

```text
id
titulo
descripcion
fecha
tipo
estado
```

Estos datos pueden utilizarse en el calendario del Dashboard.

---

# 18. ARCHIVOS IMPORTANTES QUE DEBEN ESTAR EN GITHUB

Antes de utilizar el proyecto en otra computadora verificar que estén subidos:

```text
Matricula_api/app.py
Matricula_api/requirements.txt

Matricula_api/dao/
Matricula_api/modelos/
Matricula_api/persistencia/

InterfazSistema/package.json
InterfazSistema/package-lock.json
InterfazSistema/src/

database/MatriculaEscolar.sql
```

---

# 19. ARCHIVOS QUE NO DEBEN SUBIRSE A GITHUB

No es necesario subir:

```text
node_modules/
__pycache__/
```

Si posteriormente se utiliza:

```text
.env
```

para guardar credenciales, tampoco debe subirse a GitHub.

El archivo:

```text
.gitignore
```

puede contener:

```gitignore
node_modules/
__pycache__/
*.pyc
.env
```

---

# 20. IMPORTANTE SOBRE NODE_MODULES

La carpeta:

```text
node_modules
```

puede ocupar bastante espacio.

NO se debe copiar manualmente ni subir a GitHub.

En la computadora nueva solamente ejecutar:

```bash
npm install
```

y npm volverá a descargar todas las dependencias utilizando:

```text
package.json
package-lock.json
```

---

# 21. IMPORTANTE SOBRE LAS DEPENDENCIAS DE PYTHON

Tampoco es necesario copiar las librerías instaladas de Python.

En la computadora nueva ejecutar:

```bash
python -m pip install -r requirements.txt
```

Esto instalará:

```text
Flask
flask-cors
psycopg2-binary
```

y las demás dependencias que estén registradas en:

```text
requirements.txt
```

---

# 22. IMPORTANTE SOBRE POSTGRESQL

La base de datos PostgreSQL NO se descarga automáticamente al clonar GitHub.

Por eso el repositorio debe incluir un archivo:

```text
MatriculaEscolar.sql
```

Este archivo debe contener la estructura actualizada de la base de datos.

Después de crear:

```text
MatriculaEscolar
```

en la computadora nueva, se ejecuta el script SQL.

De esta forma se recrean las tablas necesarias.

---

# 23. COMPROBACIÓN FINAL

Para comprobar que todo funciona:

### PostgreSQL

Debe estar iniciado.

### Flask

Abrir:

```text
http://127.0.0.1:5000/
```

Debe responder correctamente.

### API

Probar:

```text
http://127.0.0.1:5000/api/estudiantes
```

Debe devolver JSON.

### React

Abrir:

```text
http://localhost:5173/
```

Debe aparecer SGME.

### Conexión completa

Registrar o consultar información desde React.

Si los datos aparecen en PostgreSQL, entonces funciona correctamente:

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

---

# 24. RESUMEN RÁPIDO PARA OTRA COMPUTADORA

```text
1. Instalar:

   Git
   Python
   Node.js
   PostgreSQL
   pgAdmin 4


2. Clonar:

   git clone URL_DEL_REPOSITORIO


3. Crear en PostgreSQL:

   MatriculaEscolar


4. Ejecutar:

   database/MatriculaEscolar.sql


5. Configurar:

   Matricula_api/persistencia/conexion.py

   host = localhost
   port = 5432
   database = MatriculaEscolar
   user = postgres
   password = CONTRASEÑA_DE_POSTGRESQL


6. Instalar Backend:

   cd Matricula_api

   python -m pip install -r requirements.txt


7. Ejecutar Backend:

   python app.py


8. Comprobar:

   http://127.0.0.1:5000/


9. Abrir otra terminal.


10. Instalar Frontend:

    cd InterfazSistema

    npm install


11. Ejecutar Frontend:

    npm run dev


12. Abrir:

    http://localhost:5173/
```

---

# 25. DEPENDENCIAS UTILIZADAS

## Backend

```text
Python
Flask
flask-cors
psycopg2-binary
```

## Frontend

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

## Base de datos

```text
PostgreSQL
pgAdmin 4
```

## Desarrollo y control de versiones

```text
Visual Studio Code
Git
GitHub
```

---

# IMPORTANTE

- PostgreSQL debe estar iniciado antes de ejecutar Flask.
- Flask y React deben ejecutarse en terminales diferentes.
- No cerrar la terminal de Flask mientras se utiliza SGME.
- Cada computadora puede tener una contraseña diferente de PostgreSQL.
- Revisar `persistencia/conexion.py` al cambiar de computadora.
- Ejecutar `npm install` después de clonar el proyecto.
- Ejecutar `pip install -r requirements.txt` después de clonar el proyecto.
- No subir `node_modules` a GitHub.
- No subir contraseñas o archivos `.env` a GitHub.
- Mantener actualizado el archivo SQL cada vez que se modifique la estructura de PostgreSQL.
- Mantener actualizado `requirements.txt` cuando se agregue una nueva dependencia de Python.
- Mantener `package.json` y `package-lock.json` en GitHub.
