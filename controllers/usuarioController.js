import { check, validationResult } from 'express-validator'

import Usuario from "../models/Usuario.js"

const formLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Login"
  })
}

const formRegister = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta"
  })
}

const formForgotPass = (req, res) => {
  res.render("auth/forgotPass", {
    pagina: "Recuperar contraseña"
  })
}

const registrar = async (req, res) => {
  //Validacion 
  await check('nombre').notEmpty().withMessage("El nombre es obligatorio").run(req)
  await check('email').isEmail().withMessage("Ingrese un email valido").run(req)
  await check('pass').isLength({ min: 6 }).withMessage("El password debe ser de al menos 6 caracteres").run(req)
  await check('repet_pass').equals('pass').withMessage("Los passwords no son iguales").run(req)

  //Verifica si el resultado esta vacio
  let resultado = validationResult(req)
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
      usuario: {
        name: req.body.nombre,
        email: req.body.email,
      }
    })
  }
  const usuario = await Usuario.create(req.body)
  res.json(usuario)
}

export {
  formLogin,
  formRegister,
  formForgotPass,
  registrar
}