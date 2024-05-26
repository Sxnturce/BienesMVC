//Importamos express
import express from "express";
import router from "./routes/usuarioRoutes.js";

const server = express();


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
