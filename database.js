const mysql = require('mysql');

//mysql database connection configration
var connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   database: 'test',
   user: 'root',
   password: '',
})

connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('MySql database is connected successfully.')
    }
});

module.exports = connection;