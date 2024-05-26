const express = require("express");
const {testConnection} = require("./database");
const port = process.env.PORT;
const app = express()

app.use(express.json());


// Repositorios
const userService = require("./services/UserService");

// Rutas
require("./routers/userRouter")(app,userService);

const startServer = async () => {
    try {
      await testConnection(); // Llamamos a la función de prueba de conexión
      app.listen(port, () => {
        console.log(`La aplicación está escuchando en el puerto ${port}`);
      });
    } catch (error) {
      console.error('Error al iniciar el servidor:', error);
      process.exit(1); // Salimos del proceso si hay un error
    }
  };

  startServer();