import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { BaseError } from './base.error'

export class ConnectionDatabaseError extends BaseError {
    constructor(name: string, previusException: Error = null) {
        super(
            name,
            StatusCodes.SERVICE_UNAVAILABLE,
            ReasonPhrases.SERVICE_UNAVAILABLE,
            previusException,
        )
    }
}
