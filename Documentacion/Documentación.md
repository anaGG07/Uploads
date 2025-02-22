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


## 📌 Endpoints de la API

### 🔹 **Subir un archivo**
**Endpoint:**
```http
POST http://localhost:3000/uploads
```
**Descripción:** Sube un archivo al servidor.

**Comprobación en Thunder/Postman**

- Ir a la pestaña Body.

- Seleccionar Form-Data.
  
- En Key, escribir file (sin comillas ni espacios adicionales).
  
- En Type, seleccionar File.
  
- En Value, seleccionar un archivo desde el sistema local.
  
- Presionar Send.


**Respuesta:**
```json
{
  "message": "Archivo subido con éxito",
  "file": {
    "name": "documento.pdf",
    "size": "1.2 MB",
    "mimetype": "application/pdf"
  }
}
```

---


### 🔹 **Listar archivos subidos**
**Endpoint:**
```http
GET http://localhost:3000/uploads
```
**Descripción:** Devuelve la lista de archivos subidos.

**Respuesta:**
```json
[
  {
    "name": "Doc1.pdf",
    "size": "2.48 MB",
    "date": "2/16/2025, 4:07:27 PM"
  }
]
```

---

### 🔹 **Listar archivos en papelera**
**Endpoint:**
```http
GET http://localhost:3000/uploads/recycled
```
**Descripción:** Devuelve la lista de archivos en la papelera de reciclaje.

**Respuesta:**
```json
[
  {
    "name": "Doc1.pdf",
    "size": "2.48 MB",
    "date": "2/16/2025, 4:07:27 PM"
  }
]
```

---


### 🔹 **Eliminar un archivo (mover a la papelera)**
**Endpoint:**
```http
DELETE http://localhost:3000/uploads/{nombreArchivo}
```
**Descripción:** Mueve un archivo a la papelera de reciclaje.

**Respuesta:**
```json
{
  "message": "Archivo nombreArchivo movido a la papelera con éxito"
}
```

---


### 🔹 **Vaciar papelera**
**Endpoint:**
```http
DELETE http://localhost:3000/uploads/recycled/empty
```
**Descripción:** Elimina permanentemente todos los archivos de la papelera.

**Respuesta:**
```json
{
  "message": "Papelera vaciada con éxito"
}
```

---


### 🔹 **Obtener tamaños de almacenamiento**
**Endpoint:**
```http
GET http://localhost:3000/uploads/sizes
```
**Descripción:** Devuelve el tamaño total de los archivos subidos y de la papelera.

**Respuesta:**
```json
{
  "uploads": 1545,
  "recycled": 1677
}
```

---


### 🔹 **Suscribirse a notificaciones**
**Endpoint:**
```http
POST http://localhost:3000/suscribir
```
**Descripción:** Permite a un usuario suscribirse a notificaciones por correo.


**Cuerpo de la petición:**
```json
{
  "email": "tu_email@gmail.com"
}
```

**Respuesta:**
```json
{
  "message": "Email suscrito con éxito"
}
```

---


### 🔹 **Enviar notificación manualmente**
**Endpoint:**
```http
POST http://localhost:3000/notificaciones
```
**Descripción:** Envía un correo con el estado actual del almacenamiento.


**Cuerpo de la petición:**
```json
{
  "email": "tu_email@gmail.com"
}
```

**Respuesta:**
```json
{
  "message": "Notificación enviada correctamente"
}
```
---

## 🔥 Notificaciones Automáticas
Cada 5 minutos, el sistema enviará un correo a los usuarios suscritos con un informe del estado de almacenamiento.

**Ejemplo de contenido del correo:**
```

📂 Almacenamiento

Archivos Subidos (Total: 555.63 KB)
Doc1.pdf - 554 KB - Subido: 2/16/2025, 3:41:50 PM
Doc2.txt - 1.64 KB - Subido: 2/16/2025, 3:35:50 PM

🗑 Archivos en Papelera (Total: 2.51 MB)
Doc3.pdf - 37.84 KB - Movido: 2/16/2025, 3:41:14 PM
Doc4.pdf - 2.48 MB - Movido: 2/16/2025, 3:41:29 PM
```

---


## Notas Adicionales

- Al eliminar un archivo, éste no se borra inmediatamente, sino que se mueve a la carpeta **recycled**.
- Puedes vaciar la papelera en cualquier momento desde la interfaz o mediante el endpoint correspondiente.


## 🛠 Autor y Créditos
📌 **Desarrollado por:** Ana María García García.

