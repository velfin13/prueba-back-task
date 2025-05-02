

# 🧠 Task Manager Backend

API RESTful para la gestión de tareas. Construida con **Node.js**, **Express**, **MySQL**, **Sequelize** y **JWT**. Lista para ejecutarse en desarrollo con `npm run dev`.

---

### 🚀 Tecnologías

- **Node.js** v20+
- **Express** v5
- **MySQL** (5.7)
- **Sequelize**
- **JWT** para autenticación
- **Docker + Docker Compose** (para DB y phpMyAdmin)
- **Swagger** para documentación de la API

---

### ⚙️ Requisitos

- Node.js y npm
- Docker y Docker Compose
- MySQL local **o contenedor usando Docker**
- `.env` correctamente configurado

---

### 📦 Instalación

Clona el proyecto e instala dependencias:

```bash
git clone https://github.com/velfin13/prueba-back-task
cd task-manager-backend
npm install
```

### ⚙️ Configuración del entorno
Copia el archivo .env.example como .env y ajusta las variables:
```
cp .env.example .env

```
Variables clave:
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task_manager
DB_USER=velkin
DB_PASSWORD=password
JWT_SECRET=supersecreto
FRONTEND_URL=http://localhost:5173

```

### ▶️ Iniciar el servidor en desarrollo
Desde la raíz del proyecto:
```
npm run dev

```

### 📚 Documentación Swagger
Una vez levantado el backend, accede a: [Swagger](http://localhost:3000/api/docs)

### 🧪 Ejecutar pruebas
```
npm run test
```

### 🧼 Scripts útiles
```
npm run dev         # Levanta el servidor en modo desarrollo
npm run test        # Ejecuta los tests
docker compose up   # (desde /database) Levanta base de datos
```

--------------------
--------------------
--------------------
--------------------
--------------------


# 🐬 Base de Datos Local para Desarrollo

Este entorno contiene una configuración de MySQL + phpMyAdmin usando Docker Compose, ideal para desarrollo local.

### 📁 Estructura del directorio

```
database/
├── .env               # Variables usadas por el contenedor
├── .gitignore
├── docker-compose.yml
````

### ⚙️ Variables de entorno (.env)

```
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=password
MYSQL_USER=velkin
MYSQL_PASSWORD=password
MYSQL_DATABASE=task_manager

```
### 🚀 Cómo levantar la base de datos
Desde el directorio **database/**, ejecuta:

Esto levantará:

| Servicio   | Puerto                  | Descripción                         |
| ---------- | ----------------------- | ----------------------------------- |
| MySQL      | `3306`                  | Base de datos                       |
| phpMyAdmin | `http://localhost:8080` | Interfaz web para administrar la DB |

--------------------
--------------------
--------------------
--------------------
--------------------
--------------------





# 📦 Crear y Subir Imagen a Docker Hub
### 🔐 1. Iniciar sesión en Docker Hub
Primero, asegúrate de estar logueado con tu cuenta de Docker:
```
docker login
```

* Usuario: velfin13

* Contraseña: (tu contraseña de Docker Hub o token de acceso)

### 🛠 2. Crear la imagen
Ejecuta este comando desde la raíz del proyecto (donde esté el Dockerfile):

```
docker build -t velfin13/task-backend:2.0.0 -f Dockerfile .
```

* velfin13 → Nombre de usuario en Docker Hub

* task-ui → Nombre de la imagen

* 1.0.0 → Versión que estás construyendo

### ⬆️ 3. Subir la imagen al registro

```
docker push velfin13/task-backend:2.0.0
```