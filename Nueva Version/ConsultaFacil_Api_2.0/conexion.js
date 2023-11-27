const mysql = require("mysql2");
module.exports = mysql.createConnection({
    host: process.env.DB_SERVER_IP,
    port: process.env.DB_SERVER_PORT,
  user: "root",
  password: "",
  database: "consultorio",
});

