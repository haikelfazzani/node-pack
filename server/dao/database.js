const mysql = require('mysql');

const remoteDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};


const localDB = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_parc'
}

const connection = mysql.createConnection(remoteDB);

connection.connect( async (err) => {
    if (err) throw err;
    await console.log("connected")
});

module.exports = connection;