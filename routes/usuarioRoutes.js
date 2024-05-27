import express from 'express';
import { formLogin, formRegister, formForgotPass, registrar, confirmar } from '../controllers/usuarioController.js'

const router = express.Router();

//Rutas con el metodo get
router.get("/login", formLogin)
router.get("/registro", formRegister)
router.post("/registro", registrar)
router.get("/confirmar/:token", confirmar)
router.get("/password", formForgotPass)

export default router