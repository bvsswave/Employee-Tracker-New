const mysql = require('mysql2');
// require('dotenv').config();
const connection = mysql.createConnection({
  host: 'localhost',

  user: 'root',
  password: 'password1234',
  database: 'employee'
});
module.exports = connection;
