# 📌 Gestor de Archivos - Documentación


- [📌 Gestor de Archivos - Documentación](#-gestor-de-archivos---documentación)
  - [📖 Descripción General](#-descripción-general)
  - [🚀 Tecnologías Utilizadas](#-tecnologías-utilizadas)
    - [**Frontend**](#frontend)
    - [**Backend**](#backend)
    - [**Base de Datos**](#base-de-datos)
  - [📌 Estructura del Proyecto](#-estructura-del-proyecto)
  - [📥 Instalación y Configuración](#-instalación-y-configuración)
    - [**1️⃣ Clonar el repositorio**](#1️⃣-clonar-el-repositorio)
    - [**2️⃣ Configurar el entorno**](#2️⃣-configurar-el-entorno)
    - [**3️⃣ Instalar dependencias**](#3️⃣-instalar-dependencias)
    - [**4️⃣ Iniciar con Docker**](#4️⃣-iniciar-con-docker)
  - [📌 Funcionalidades Clave](#-funcionalidades-clave)
  - [📌 Endpoints de la API](#-endpoints-de-la-api)
    - [🔹 **Subir un archivo**](#-subir-un-archivo)
    - [🔹 **Listar archivos subidos**](#-listar-archivos-subidos)
    - [🔹 **Listar archivos en papelera**](#-listar-archivos-en-papelera)
    - [🔹 **Eliminar un archivo (mover a la papelera)**](#-eliminar-un-archivo-mover-a-la-papelera)
    - [🔹 **Vaciar papelera**](#-vaciar-papelera)
    - [🔹 **Obtener tamaños de almacenamiento**](#-obtener-tamaños-de-almacenamiento)
    - [🔹 **Suscribirse a notificaciones**](#-suscribirse-a-notificaciones)
    - [🔹 **Enviar notificación manualmente**](#-enviar-notificación-manualmente)
  - [🔥 Notificaciones Automáticas](#-notificaciones-automáticas)
  - [🛠 Autor y Créditos](#-autor-y-créditos)



## 📖 Descripción General
Este proyecto es una aplicación web que permite **subir, gestionar y eliminar archivos**, así como visualizarlos mediante gráficos interactivos. También ofrece un sistema de **papelera de reciclaje** y **notificaciones automáticas por correo electrónico** sobre el estado del almacenamiento.

La aplicación está construida con **Node.js (Backend)** y utiliza **Express** para el manejo de rutas. El almacenamiento de archivos se gestiona en el sistema de archivos local y el frontend proporciona una **interfaz gráfica interactiva** con gráficos en tiempo real.

---

## 🚀 Tecnologías Utilizadas

### **Frontend**
- 🌐 **HTML5, CSS3 y JavaScript**
- 🎨 **TailwindCSS** (para los estilos)
- 📊 **Chart.js** (para gráficos de almacenamiento)
- 📩 **Lucide Icons** (para iconos interactivos)

### **Backend**
- 🌐 **Node.js con Express** (servidor y API REST)
- 📂 **Multer** (para la gestión de archivos subidos)
- 📬 **SendGrid** (para envío de notificaciones por correo electrónico)
- 🛠 **Node-Cron** (para tareas programadas de notificación)

### **Base de Datos**
- 📄 **Sistema de Archivos Local** (para almacenamiento de archivos)

---

## 📌 Estructura del Proyecto

```
📂 gestor-archivos
 |
 ├── 📂 config
 │   ├── config.js
 |
 |
 ├── 📂 controllers
 │   ├── notifyController.js
 │   ├── uploadController.js
 │
 |
 ├── 📂 data
 │   ├── subscribers.js
 |
 |
 ├── 📂 routes
 │   ├── uploadRoutes.js
 │
 |
 ├── 📂 utils
 │   ├── formatFileSize.js
 │   ├── getSize.js
 │
 |
 ├── 📂 public
 |   ├── 📂 scripts
 |   |    ├── main.js
 │   |    ├── charts.js
 │   ├── index.html
 │   
 │
 ├── app.js
 ├── Dockerfile
 ├── docker-compose.yml
 ├── .env
 ├── package.json
 ```

---

## 📥 Instalación y Configuración

### **1️⃣ Clonar el repositorio**
```sh
 git clone https://github.com/anaGG07/gestor-archivos.git
 cd gestor-archivos
```

### **2️⃣ Configurar el entorno**
Antes de iniciar el servidor, es necesario configurar las variables de entorno en un archivo `.env`:
```sh
SENDGRID_API_KEY=tu_clave_de_sendgrid
SENDGRID_VERIFIED_EMAIL=tu_correo_verificado_de_sendgrid
PORT=3000
```

### **3️⃣ Instalar dependencias**
```sh
 npm install
```


### **4️⃣ Iniciar con Docker**
```sh
 docker-compose up --build
```

---

## 📌 Funcionalidades Clave
- 📂 **Subida y gestión de archivos**
- 🗑 **Papelera de reciclaje**
- 📊 **Visualización de almacenamiento con gráficos interactivos**
- 📧 **Notificaciones automáticas por correo**
- 🛠 **Gestión mediante API REST**

---

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

## 🛠 Autor y Créditos
📌 **Desarrollado por:** Ana María García García.

