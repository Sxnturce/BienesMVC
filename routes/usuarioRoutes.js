import express from 'express';
import { formLogin, formRegister, formForgotPass } from '../controllers/usuarioController.js'

const router = express.Router();

//Rutas con el metodo get
router.get("/login", formLogin)
router.get("/registro", formRegister)
router.get("/password", formForgotPass)

export default router