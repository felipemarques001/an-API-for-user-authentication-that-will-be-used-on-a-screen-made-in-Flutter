import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: '',
    password: '',
    database: ''
})

export default connection