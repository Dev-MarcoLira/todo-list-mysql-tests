const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || '',
    database:  process.env.DATABASE || 'todos'
})

connection.connect()

module.exports = connection