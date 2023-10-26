import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { createUserSchema } from '../../validators/user.validator'
import {
    checkDuplicateEmail,
    checkRolesExisted,
} from '../middlewares/veryfySignUp.middleware'
import { UserController } from '../../controller/user.controller'

export const router = Router()

router.get('/check', (_req, res) => {
    res.send('Express se ha inicializado correctamente!')
})


