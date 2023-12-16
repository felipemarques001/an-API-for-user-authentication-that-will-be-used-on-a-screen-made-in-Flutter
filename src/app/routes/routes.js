import Router from 'express'
import UserController from '../controllers/UserController.js'

const routes = Router()

routes.post('/api/v1/users', UserController.create)
routes.post('/api/v1/users/login', UserController.login)

export default routes