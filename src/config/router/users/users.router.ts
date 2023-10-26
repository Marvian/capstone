import { Router } from 'express'
import { UserController } from '../../../controller/user.controller'
import { isAdmin, verifyToken } from '../../middlewares/authJwt.middleware'

export const router = Router()

/* This code sets up a POST route at the endpoint '/get-user' using the Express router. The route is
validating the request body against the schema defined in the `loginUserSchema` using the
`checkSchema` middleware from the `express-validator` library. If the validation passes, the
`getUser` method from the `UserController` is called to handle the request. */
router.post('/get-user', UserController.getUser)
router.get('/user', [verifyToken, isAdmin], UserController.userBoard)
