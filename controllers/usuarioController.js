const formLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Login"
  })
}

const formRegister = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta"
  })
}

const formForgotPass = (req, res) => {
  res.render("auth/forgotPass", {
    pagina: "Recuperar contraseña"
  })
}

export {
  formLogin,
  formRegister,
  formForgotPass
}