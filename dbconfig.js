require("dotenv").config();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sms",
  password: "omerenma1",
  port: 5432,
});
module.exports = { pool };
