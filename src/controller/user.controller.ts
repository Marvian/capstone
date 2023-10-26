import { Response } from 'express'
import { validationResult } from 'express-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { BoFactory } from '../bussines/bo/factory/bo.factory'
import { BaseError } from '../utils/errors/base.error'
import { Utils } from '../utils/utils'

export class UserController {
    static repository: any

    public static async getUser(req: any, res: Response) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return Utils.response(
                res,
                StatusCodes.FORBIDDEN,
                'Invalid request',
                [{ errors: errors.array() }],
            )
        }
        try {
            const userData: any = await BoFactory.getUserBo().getUserId(
                req.body,
            )
            Utils.response(res, StatusCodes.OK, 'Request Succesfull', userData)
        } catch (error) {
            if (error instanceof BaseError) {
                return Utils.response(res, error.statusCode, error.name)
            }
            return Utils.response(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
            )
        }
    }

    public static async userBoard(req, res) {
        res.status(200).send('User Content.')
    }
}
