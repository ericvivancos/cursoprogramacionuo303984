# Proyecto de Gestión de Regalos

Este es un proyecto desarrollado como parte del curso TalentUo de la Universidad de Oviedo. El proyecto consiste en una aplicación web de gestión de regalos, que permite a los usuarios crear listas de regalos, compartirlas con amigos y buscar ideas de regalos para diferentes ocasiones.

## Descripción del Proyecto

El objetivo principal del proyecto es proporcionar a los usuarios una forma sencilla y efectiva de gestionar sus ideas de regalos. Las principales características incluyen:

- **Gestión de Regalos**: Los usuarios pueden crear y gestionar listas de regalos, especificando detalles como el nombre del regalo, descripción, precio, y un enlace para comprarlo.
- **Compartir con Amigos**: Los usuarios pueden agregar amigos y compartir sus listas de regalos con ellos. De esta manera, los amigos pueden ver qué regalos están interesados en recibir.
- **Búsqueda de Ideas de Regalos**: La aplicación ofrece una función de búsqueda para ayudar a los usuarios a encontrar ideas de regalos para diferentes ocasiones.
- **Autenticación de Usuarios**: La aplicación implementa un sistema de autenticación para que los usuarios puedan registrarse e iniciar sesión de forma segura.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: React.js, Ant Design (AntD)
- **Autenticación**: JWT (JSON Web Tokens)
- **Persistencia de Datos**: MySQL

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **Backend**: Implementado en Node.js y Express.js. Gestiona la lógica del servidor, autenticación, y acceso a la base de datos MySQL.
- **Frontend**: Implementado en React.js con la biblioteca de componentes Ant Design (AntD). Proporciona la interfaz de usuario para interactuar con la aplicación.

## Instrucciones para Iniciar el Proyecto

### A. Iniciar el Proyecto Manualmente

#### 1. Backend

1. **Instalar dependencias**:
    ```bash
    cd backend
    npm install
    ```
   
2. **Migrar la base de datos**:
    - Importa el script SQL proporcionado (`database.sql`) en tu base de datos MySQL.
   
3. **Iniciar el servidor**:
    ```bash
    npm start
    ```

   El servidor se iniciará en el puerto 5000.

#### 2. Frontend

1. **Instalar dependencias**:
    ```bash
    cd frontend
    npm install
    ```
   
2. **Iniciar la aplicación React**:
    ```bash
    npm start
    ```

   La aplicación React se iniciará en el puerto 3000.

### B. Iniciar el Proyecto con Docker Compose

#### 1. Iniciar el proyecto con Docker Compose

Si prefieres iniciar el proyecto usando Docker, sigue estos pasos:

1. **Configura el archivo `.env`**: Asegúrate de que los archivos `.env` en las carpetas `backend` y `frontend` estén correctamente configurados.

2. **Inicia los contenedores Docker**:
    ```bash
    docker-compose up --build
    ```

   Este comando construirá y levantará los siguientes contenedores:

   - **backend**: Inicia el servidor backend en el puerto 5000.
   - **frontend**: Inicia la aplicación React en el puerto 3000.
   - **db**: Levanta un contenedor MySQL en el puerto 3306 para manejar la base de datos.

3. **Acceso a la aplicación**:
   - Visita `http://localhost:3000` en tu navegador para acceder a la aplicación frontend.
   - El backend estará disponible en `http://localhost:5000`.

### Detalles de los Puertos

- **Backend**: El servidor backend escucha en el puerto 5000.
- **Frontend**: La aplicación React está disponible en el puerto 3000.
- **Base de Datos**: MySQL está disponible en el puerto 3306.

## Acerca del Autor

Este proyecto ha sido desarrollado por **Eric Vivancos Yagües** como parte del curso TalentUo de la Universidad de Oviedo.
