import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from 'bcrypt';

const Usuario = db.define("usuarios", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: DataTypes.STRING,
  confirmado: DataTypes.BOOLEAN
}, {
  hooks: {
    beforeCreate: async function (usuario) {
      const salt = await bcrypt.genSalt(10)
      usuario.pass = await bcrypt.hash(usuario.pass, salt)
    }
  }
})

export default Usuario;