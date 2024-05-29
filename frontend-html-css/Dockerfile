# Usa una imagen de Node como base
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala nodemon globalmente
RUN npm install -g nodemon

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación React
EXPOSE 3000

# Comando para ejecutar la aplicación React
CMD ["nodemon", "--config", "nodemon.json"]
