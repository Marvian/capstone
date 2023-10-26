import { StatusCodes } from 'http-status-codes'

export class BaseError extends Error {
    private _name: string
    private _statusCode: StatusCodes
    private _previusException: Error

    /**
     *
     * @param name string
     * @param statusCode StatusCodes
     * @param description string
     * @param previusException Error
     */
    constructor(
        name: string,
        statusCode: StatusCodes,
        description: string,
        previusException: Error,
    ) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this._name = name
        this._statusCode = statusCode
        this._previusException = previusException
        Error.captureStackTrace(this)
    }

    /**
     *
     */
    public get name(): string {
        return this._name
    }

    /**
     *
     */
    public get statusCode(): StatusCodes {
        return this._statusCode
    }

    /**
     *
     */
    public get previusException(): Error {
        return this._previusException
    }
}
