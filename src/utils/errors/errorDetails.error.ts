import { StatusCodes } from 'http-status-codes'

export class ErrorDetails {
    private _statusCode: StatusCodes
    private _errorMessage: string

    constructor(statusCode: StatusCodes, errorMessage: string) {
        this._errorMessage = errorMessage
        this._statusCode = statusCode
    }

    public get statusCode(): StatusCodes {
        return this._statusCode
    }

    public get errorMessage(): string {
        return this._errorMessage
    }
}
