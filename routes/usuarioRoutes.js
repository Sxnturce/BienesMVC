import express from 'express';

const router = express.Router();

//Rutas con el metodo get
router.get("/", (req, res) => {
  res.json({ msg: "Respuesta get" })
})

router.post("/", (req, res) => {
  res.json({ msg: "Respuesta post" })
})

export default router