var mysql = require('mysql');

var db = mysql.createPool({
    host:'172.16.10.86',
    user:'root',
    password:'q1w2e3r4t%',
    database:'ionchain-robot'
});

module.exports = db;
