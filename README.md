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
    - [**4️⃣ Abrir el navegador**](#4️⃣-abrir-el-navegador)
  - [📌 Funcionalidades Clave](#-funcionalidades-clave)
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
 git clone https://github.com/anaGG07/Uploads.git
 cd Uploads
```

### **2️⃣ Configurar el entorno**
No es necesario configurar las variables de entorno ya que se ha administrado los secretos con gitHub, estableciendo un entorno de pruebas donde se confirma que no existe realmente información sensible.

### **3️⃣ Instalar dependencias**
```sh
 npm install
```


### **4️⃣ Iniciar con Docker**
```sh
 docker-compose up --build
```

### **4️⃣ Abrir el navegador**
```sh
 http://localhost:3000/
```

---

## 📌 Funcionalidades Clave
- 📂 **Subida y gestión de archivos**
- 🗑 **Papelera de reciclaje**
- 📊 **Visualización de almacenamiento con gráficos interactivos**
- 📧 **Notificaciones automáticas por correo**
- 🛠 **Gestión mediante API REST**

---


## 🛠 Autor y Créditos
📌 **Desarrollado por:** Ana María García García.