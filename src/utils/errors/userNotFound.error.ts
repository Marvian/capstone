import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { BaseError } from './base.error'

export class UsertNotFoundError extends BaseError {
    constructor(name: string, previusException: Error = null) {
        super(
            name,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST,
            previusException,
        )
    }
}
