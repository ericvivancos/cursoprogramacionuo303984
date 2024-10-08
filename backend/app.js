const express = require("express");
const {testConnection} = require("./database");
const port = process.env.PORT;
const app = express()
const cors = require("cors")

app.use(express.json());
// Middleware de Cors
app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"]
}))

// Rutas
const userRouter = require("./routers/userRouter");
const presentRouter = require("./routers/presentRouter");
const friendRouter = require("./routers/friendRouter");

// Agregamos enrutadores
app.use("/users",userRouter);
app.use("/presents", presentRouter);
app.use("/friends", friendRouter);

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