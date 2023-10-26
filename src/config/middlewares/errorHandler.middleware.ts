import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ErrorDetails } from '../../utils/errors/errorDetails.error'
import { Utils } from '../../utils/utils'

export function middleware(
    err: any,
    _req: Request,
    res: Response,
    _next: Function,
) {
    if (err instanceof ErrorDetails) {
        Utils.response(res, err.statusCode, err.errorMessage)
    } else {
        console.error(err)
        Utils.response(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
        )
    }
}
