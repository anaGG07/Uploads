# Usar una imagen base de Node.js
FROM node:23-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
# RUN npm install

# Modo producción
RUN npm ci --omit=dev

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]