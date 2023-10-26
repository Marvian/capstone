import 'reflect-metadata'
import { Request, Response } from 'express'
import { ErrorFactory } from '../../utils/errors/factory/errorFactory.factory'
import { AppDataSource } from '../../AppDataSource'

export function middleware(_req: Request, _res: Response, next: Function) {
    const dataSource = AppDataSource.getDataSource()

    if (dataSource.isInitialized) {
        console.log(`Reusing connection ${dataSource}`)
        next()
        return
    }
    dataSource
        .initialize()
        .then(() => {
            console.log('Connection succesfull to database')
            next()
        })
        .catch((error) => {
            let errorMessage = 'Unable to connect to database'
            console.log(`${errorMessage} ${error}`)
            next(ErrorFactory.getConnectionDatabaseError(errorMessage, error))
        })
}
