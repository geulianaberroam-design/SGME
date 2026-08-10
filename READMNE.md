# SGME — Guía rápida de instalación

Sistema de Gestión de Matrícula Escolar desarrollado con:

- React + Vite — Frontend
- Python + Flask — Backend
- PostgreSQL — Base de datos

La comunicación del sistema es:

REACT → AXIOS → FLASK → DAO → POSTGRESQL

---

## 1. Programas necesarios

Antes de ejecutar el proyecto en otra computadora, instalar:

- Git
- Python
- Node.js + npm
- PostgreSQL

Opcional pero recomendado:

- Visual Studio Code
- pgAdmin 4

---

## 2. Clonar el proyecto

Abrir Git Bash o la terminal de VS Code:

```bash
git clone URL_DEL_REPOSITORIO
```

Luego entrar al proyecto:

```bash
cd SGME
```

---

# BACKEND

## 3. Dependencias de Python

El backend utiliza principalmente:

- Flask
- Flask-Cors
- psycopg2-binary

Estas dependencias deben estar guardadas en:

```text
Matricula_api/requirements.txt
```

Contenido:

```txt
Flask
Flask-Cors
psycopg2-binary
```

Para instalarlas en otra computadora:

```bash
cd Matricula_api
python -m pip install -r requirements.txt
```

Si el comando `python` no funciona, utilizar la ruta del Python instalado en esa computadora.

---

## 4. Crear la base de datos PostgreSQL

Abrir pgAdmin y crear la base de datos:

```sql
CREATE DATABASE "MatriculaEscolar";
```

Después ejecutar el script SQL del proyecto para crear las tablas.

El sistema utiliza tablas como:

- apoderado
- estudiante
- grado_seccion
- matricula
- pago
- documento
- evento

IMPORTANTE:

La base de datos de PostgreSQL no se descarga automáticamente al clonar GitHub.

Por eso se debe incluir en el repositorio un archivo SQL con la estructura de la base de datos.

Ejemplo:

```text
database/
└── MatriculaEscolar.sql
```

En la computadora nueva se debe ejecutar ese script en PostgreSQL.

---

## 5. Configurar la conexión PostgreSQL

Revisar:

```text
Matricula_api/persistencia/conexion.py
```

La conexión debe coincidir con PostgreSQL de la computadora nueva.

Ejemplo:

```python
host = "localhost"
port = "5432"
database = "MatriculaEscolar"
user = "postgres"
password = "TU_CONTRASEÑA"
```

Cambiar:

```text
TU_CONTRASEÑA
```

por la contraseña de PostgreSQL de esa computadora.

---

## 6. Ejecutar el Backend

Entrar a:

```bash
cd Matricula_api
```

Ejecutar:

```bash
python app.py
```

Si todo funciona correctamente aparecerá algo parecido a:

```text
Running on http://127.0.0.1:5000
```

No cerrar esta terminal mientras se utiliza SGME.

---

## 7. Comprobar la API

Abrir:

```text
http://127.0.0.1:5000/
```

Debe aparecer:

```json
{
    "mensaje": "API SGME funcionando correctamente"
}
```

También se pueden comprobar los endpoints:

```text
http://127.0.0.1:5000/api/estudiantes

http://127.0.0.1:5000/api/apoderados

http://127.0.0.1:5000/api/matriculas

http://127.0.0.1:5000/api/pagos

http://127.0.0.1:5000/api/documentos

http://127.0.0.1:5000/api/eventos
```

---

# FRONTEND

## 8. Instalar dependencias de React

Abrir otra terminal.

Entrar a:

```bash
cd InterfazSistema
```

Ejecutar:

```bash
npm install
```

`npm install` instalará las dependencias declaradas en:

```text
package.json
```

El proyecto utiliza, entre otras:

- React
- React DOM
- Vite
- Axios
- Bootstrap
- Bootstrap Icons

Si por alguna razón Axios o Bootstrap no están declarados en `package.json`, instalar:

```bash
npm install axios bootstrap bootstrap-icons
```

---

## 9. Ejecutar React

Desde:

```text
InterfazSistema
```

ejecutar:

```bash
npm run dev
```

Debe aparecer una dirección similar a:

```text
http://localhost:5173/
```

Abrirla en el navegador.

---

# 10. Orden correcto para ejecutar SGME

Primero PostgreSQL debe estar funcionando.

Después abrir una terminal para Flask:

```bash
cd Matricula_api
python app.py
```

Dejarla abierta.

Abrir una segunda terminal para React:

```bash
cd InterfazSistema
npm install
npm run dev
```

Finalmente abrir:

```text
http://localhost:5173/
```

La conexión será:

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
PostgreSQL
MatriculaEscolar
```

---

# 11. Estructura principal

```text
SGME/
│
├── Matricula_api/
│   │
│   ├── app.py
│   ├── requirements.txt
│   │
│   ├── dao/
│   ├── modelos/
│   └── persistencia/
│
├── InterfazSistema/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│
└── database/
    └── MatriculaEscolar.sql
```

---

# 12. Resumen rápido

```text
1. Instalar:
   Git
   Python
   PostgreSQL
   Node.js

2. Clonar:
   git clone URL_DEL_REPOSITORIO

3. Crear PostgreSQL:
   MatriculaEscolar

4. Ejecutar el script SQL.

5. Configurar:
   persistencia/conexion.py

6. Instalar Backend:
   cd Matricula_api
   python -m pip install -r requirements.txt

7. Ejecutar Backend:
   python app.py

8. Abrir otra terminal.

9. Instalar Frontend:
   cd InterfazSistema
   npm install

10. Ejecutar Frontend:
    npm run dev

11. Abrir:
    http://localhost:5173/
```

---

# Importante

- PostgreSQL debe estar iniciado antes de ejecutar Flask.
- Flask debe permanecer ejecutándose mientras React utiliza la API.
- React y Flask deben ejecutarse en terminales separadas.
- No subir contraseñas personales de PostgreSQL a un repositorio público.
- `node_modules` no debe subirse a GitHub.
- En otra computadora se recupera con `npm install`.
- Las dependencias Python se recuperan con `requirements.txt`.
- La base de datos debe recrearse mediante un script `.sql`.
- La contraseña de PostgreSQL puede ser diferente en cada computadora.