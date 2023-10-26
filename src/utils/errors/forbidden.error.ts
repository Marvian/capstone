import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { BaseError } from './base.error'

export class ForbiddenError extends BaseError {
    constructor(name: string, previusException: Error = null) {
        super(
            name,
            StatusCodes.FORBIDDEN,
            ReasonPhrases.FORBIDDEN,
            previusException,
        )
    }
}
