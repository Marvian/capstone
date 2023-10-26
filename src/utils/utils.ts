import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Response } from 'express'


export class Utils {
    public static response(
        res: Response,
        statusCode: StatusCodes = StatusCodes.OK,
        message: string = ReasonPhrases.OK,
        data: any[] = [],
    ) {
        let responseData = {
            code: statusCode,
            message,
            data,
        }

        res.status(statusCode).json(responseData)
    }
    
    
    /**
     * chageValue
     */
    public static chageValue(value: string) {
        if (value == '"S"') {
            return '1'
        } else if (value == '"N"') {
            return '0'
        }
    }

    public static responseError(
        res: Response,
        statusCode: StatusCodes = StatusCodes.BAD_REQUEST,
        message: string = ReasonPhrases.BAD_REQUEST,
        data: any[] = [],
    ) {
        let responseData = {
            code: statusCode,
            message,
            data,
        }

        res.status(statusCode).json(responseData)
        throw new Error()
    }
    
}
