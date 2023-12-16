import express from 'express'
import cors from 'cors'
import routes from './src/app/routes/routes.js'
import connection from './src/app/database/db-connection.js'

// Instanciando um objeto que representa a aplicação web
const app = express()

// Indica para o express ler o body das request com JSON
app.use(express.json())

// Habilitando o CORS
app.use(cors())

// Definindo as rotas
app.use(routes)


// Realizando a conexão com o banco de dados e iniciação do servidor
const PORT = 3000
connection.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Conexão realizada com sucesso!")
        app.listen(PORT, () => {
            console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
        })
    }
})
