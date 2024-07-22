# Proyecto NestJS con Docker y MongoDB

Este proyecto es una aplicación de ejemplo creada con NestJS y MongoDB, utilizando Docker para facilitar la configuración y el despliegue.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

## Clonar el Repositorio

Primero, clona el repositorio desde GitHub:

```bash
git clone https://github.com/Weebtor/tree-nestjs-mongodb
cd tree-nestjs-mongodb
```

## Configuración del Proyecto

### Crear el Archivo .env

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

```bash
MONGODB_URI=mongodb://mongo:27017/nestjsdb
```

Este archivo define la URI de conexión para MongoDB.

### Construir y Ejecutar los Contenedores

Utiliza Docker Compose para construir y ejecutar los contenedores. Este comando construirá la imagen de Docker para la aplicación NestJS y levantará tanto la aplicación como el contenedor de MongoDB:

```bash
docker-compose up --build
```

### Verificar el Estado de los Contenedores

Para verificar que los contenedores están corriendo, usa:

```bash
docker ps
```

Y para ver los logs de los contenedores:

```bash
docker-compose logs
```

El acceso a la aplicación estará disponible en http://localhost:3000.

Estructura del Proyecto

- Dockerfile: Define la configuración para construir la imagen de la aplicación NestJS.
- .dockerignore: Especifica los archivos y directorios que deben ser ignorados al construir la imagen.
- docker-compose.yml: Define los servicios, incluyendo la aplicación y MongoDB.
- .env: Contiene variables de entorno para la configuración de la aplicación.
