import { check, validationResult } from 'express-validator'
import { generarID } from '../helpers/tokesns.js'
import { emailRegistro } from '../helpers/emails.js'

import Usuario from "../models/Usuario.js"

const formLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Login"
  })
}

const formRegister = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken()
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
  await check('repet_pass').custom((value, { req }) => value === req.body.pass).withMessage('Las contraseñas no son iguales').run(req);

  //Verifica si el resultado esta vacio
  let resultado = validationResult(req)

  /*   res.json(resultado.array()) */
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      usuario: {
        name: req.body.nombre,
        email: req.body.email
      }
    })
  }

  //Desestructuramos 
  const { nombre, email, pass } = req.body

  //Verificar que no este duplicado
  const existUser = await Usuario.findOne({ where: { email } })

  if (existUser) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{
        msg: "El email ya esta registrado",
        registered: true
      }],
      usuario: {
        name: req.body.nombre,
        email: req.body.email
      }
    })
  }

  const usuario = await Usuario.create({
    nombre,
    email,
    pass,
    token: generarID()
  })


  //Enviar datos al email
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  })
  //Mostrar mensaje
  res.render("templates/message", {
    pagina: "Esperando confirmacion de correo",
    mensaje: "Hemos enviado un mensaje de confirmación, preciona en el enlace"
  })

}

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } })
  if (!usuario) {
    return res.render("auth/confirmAcc", {
      pagina: "Error al confirmar la cuenta",
      msg: "Lo sentimos no se pudo auntenticar la confirmación",
      exist: false
    })
  }

  //Si el usuario esta confirmado
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmAcc", {
    pagina: "Cuenta confirmada exitosamente",
    msg: "La cuenta fue auntenticada exitosamente",
    exist: true
  })
}
export {
  formLogin,
  formRegister,
  formForgotPass,
  registrar,
  confirmar
}