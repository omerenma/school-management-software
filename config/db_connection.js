const knex = require("knex");
const db_connect = knex({
  client: "pg",
  version: "13",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "omerenma1",
    database: "sms",
  },
});
module.exports = db_connect;
