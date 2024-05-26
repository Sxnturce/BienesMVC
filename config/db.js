import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' })

const database = process.env.DB_NOMBRE;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS ?? "";
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;


const db = new Sequelize(database, user, pass, {
  host: host,
  port: port,
  dialect: "mysql",
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

export default db;