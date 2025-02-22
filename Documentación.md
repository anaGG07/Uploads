# Gestor de Archivos

Este proyecto es una aplicación web para la gestión de archivos. Permite subir, listar y mover archivos a una papelera de reciclaje. Además, muestra un gráfico para visualizar el uso del almacenamiento.

## Tecnologías Utilizadas

- **Node.js**: Backend del proyecto.
- **Express.js**: Framework para gestionar las rutas y el servidor.
- **MongoDB**: Base de datos para almacenamiento.
- **Docker & Docker Compose**: Para contenerización de la aplicación.
- **Tailwind CSS**: Estilizado de la interfaz.
- **Chart.js**: Gráficos para visualizar el estado de los archivos.
- **Lucide Icons**: Iconos para mejorar la experiencia visual.

## Configuración y Ejecución

### Requisitos Previos

- [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

### Ejecución de la Aplicación

1. Clona el repositorio:
   ```bash
   git clone <repositorio_url>
   cd <nombre_del_proyecto>
   ```

2. Inicia los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Accede a la aplicación en tu navegador:
   ```
   http://localhost:3000
   ```

## Endpoints Disponibles

### 1. **Subida de Archivos**
- **POST** `/uploads`
  - Sube un archivo al servidor.
  - Requiere un archivo en el cuerpo de la solicitud bajo el campo `file`.

### 2. **Listar Archivos Subidos**
- **GET** `/uploads`
  - Devuelve una lista de todos los archivos subidos.

### 3. **Listar Archivos en Papelera**
- **GET** `/uploads/recycled`
  - Devuelve una lista de los archivos que han sido movidos a la papelera de reciclaje.

### 4. **Eliminar (Mover a Papelera)**
- **DELETE** `/uploads/:fileName`
  - Mueve un archivo específico a la papelera de reciclaje.
  - Reemplaza `:fileName` con el nombre del archivo a eliminar.

### 5. **Vaciar Papelera**
- **DELETE** `/uploads/recycled/empty`
  - Elimina de forma permanente todos los archivos en la papelera de reciclaje.

### 6. **Obtener Tamaños de Carpetas**
- **GET** `/uploads/sizes`
  - Devuelve el tamaño total de los archivos en la carpeta de subidos y en la papelera.

## Estructura de Carpetas

```
├── public/
│   ├── scripts/
│       ├── main.js
│       └── charts.js
├── routes/
│   └── uploadRoutes.js
├── controllers/
│   └── uploadController.js
├── uploads/
├── recycled/
├── index.html
├── Dockerfile
└── docker-compose.yml
```

## Notas Adicionales

- Al eliminar un archivo, éste no se borra inmediatamente, sino que se mueve a la carpeta **recycled**.
- Puedes vaciar la papelera en cualquier momento desde la interfaz o mediante el endpoint correspondiente.


