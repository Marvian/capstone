import { Request, Response } from 'express'

export function middleware(_req: Request, _res: Response, next: Function) {
    // new Date();
    next()
}
