const mysql = require('mysql');

const remoteDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};


const connection = mysql.createConnection(remoteDB);

connection.connect((err) => {
  console.log("connected");
});

module.exports = connection;