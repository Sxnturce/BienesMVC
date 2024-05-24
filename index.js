//Importamos express
import express from "express";
import router from "./routes/usuarioRoutes.js";

const server = express();

//Puerto
const port = 3000

//Determinamos el puerto que usaremos
server.listen(port, () => {
  console.log(`Escuchando en el puerto: ${port}`);
})


server.use("/", router)
