import UserRepository from '../repositories/UserRepository.js'
import bcrypt from 'bcrypt'

class UserService {

    async findUserByUsername(username) {
        // Se um usuário for encontrado, então ele é retornado,
        // caso contrário um array vazio é retornado
        const responseRepository = await UserRepository.findByUsername(username)
        if(responseRepository.length > 0) {
            return responseRepository
        } else {
            return []
        }
    }

    async createPasswordHash(password) {
        return await bcrypt.hash(password, 10)
    }

    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword)
    }
}

export default new UserService()