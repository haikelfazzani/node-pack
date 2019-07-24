let cors = require("cors");

const whitelist = [
  "http://localhost:3001",
  "http://localhost:3002",
  "https://node-pack.herokuapp.com"
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

cors("*")

module.exports = cors;