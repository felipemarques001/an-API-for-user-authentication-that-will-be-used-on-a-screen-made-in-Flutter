import connection from '../database/db-connection.js'

class UserRepository {

    create(username, password) {
        const sql = "INSERT INTO tb_users (username, password) VALUES (?, ?)"
        const values = [username, password]
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, result) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    // Se houver usuário retorna o resultado, se não houver é retornado uma lista vazia
    findByUsername(username) {
        const sql = "SELECT * FROM tb_users where username = ?"
        return new Promise((resolve, reject) => {
            connection.query(sql, username, (error, result) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

export default new UserRepository()