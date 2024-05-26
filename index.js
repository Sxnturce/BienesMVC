//Importamos express
import express from "express";
import router from "./routes/usuarioRoutes.js";
import db from "./config/db.js"

const server = express();

//Habilitar lectura de datos en express
server.use(express.urlencoded({ extended: true }))

//Conexion a db
try {
  await db.authenticate();
  db.sync()
  console.log("Conexion exitosa");
} catch (e) {
  console.log(e);
}

//Definimos la vista que usaremos y la ruta
server.set("view engine", "pug")
server.set("views", "./views")

//Carpeta publica
server.use(express.static("public"))

const port = 3000

//Determinamos el puerto que usaremos
server.listen(port, () => {
  console.log(`Escuchando en el puerto: ${port}`);
})

server.use("/auth", router)
