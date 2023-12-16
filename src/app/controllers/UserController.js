import UserRepository from '../repositories/UserRepository.js'
import UserService from '../services/UserService.js'

class UserController {

    async create(req, res) {
        const { username, password } = req.body

        // Verifica se há usuário com o username fornecido
        const existsUser = await UserService.findUserByUsername(username)
        if(existsUser.length > 0) {
            return res.status(400).json({ 'response': 'Credencial inválida!'})
        }

        // Realiza a criptografia da senha
        const passwordHash = await UserService.createPasswordHash(password)

        // Adiciona o novo usuário
        UserRepository.create(username, passwordHash)
            .then(() => {
                res.status(201).json({ 'response': 'Usuário criado com sucesso!' });
            })
            .catch(() => {
                res.status(500).json({ 'response': 'Erro interno ao criar usuário!' });
            });
    }

    async login(req, res){
        const { username, password } = req.body

        // Verifica se há usuário cadastrado com o username informado
        const userFounded = await UserService.findUserByUsername(username)
        if(userFounded.length === 0) {
            return res.status(404).json({ 'response': 'Usuário não encontrado!'})
        }

        // Convertendo os dados do usuário encontrado para um objeto
        const user = JSON.parse(JSON.stringify(userFounded))

        // Realiza a comparação de passwords
        const passwordIsValid = await UserService.comparePassword(password, user[0]['password'])
        if(!passwordIsValid) {
            return res.status(400).json({ 'response' : 'Credenciais inválidas!' })
        }

        // Se tudo correu bem, o usuário está logado
        return res.status(200).json({ 'response'  : 'Usuário logado com sucesso!' })
    }
}

export default new UserController()