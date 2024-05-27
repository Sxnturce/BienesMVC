import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const { email, nombre, token } = datos

  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirma tu cuenta en BienesRaices.com",
    text: "Confirma tu cuenta 👻",
    html:/*html*/ `
      <div class="email">
        <h1 class="titulo">Hola ${nombre} bienvenido a BienesRaices</h1>
        <p>Comprueba tu cuenta con el siguiente enlace</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}" class="btn-confirmar">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta puedes ignorar esto</p>
      </div>
    `
  })
}

export {
  emailRegistro
}