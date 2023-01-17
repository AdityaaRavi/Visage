//var mysql = require('mysql');
import mysql from 'mysql2';

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    // password: '',
});

connection.connect((err) => {
    if (err) throw err;
    connection.query("use visage_app;", (err) => {if (err) throw err;});
    // connection.query("INSERT INTO user_login (userId, name, email, password) values (6, 'Adityaa Ravi', 'adiravi@ucdavis.edu', 'password');", 
    //     (err, result) => {if (err) throw err;}
    // );
    connection.query("SELECT * FROM user_login;", 
        (err, result) => {if (err) throw err; console.log(result)}
    );

    connection.end();
});



