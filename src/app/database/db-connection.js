import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    port: '',
    user: '',
    password: '',
    database: 'db_teste_estagio'
})

export default connection