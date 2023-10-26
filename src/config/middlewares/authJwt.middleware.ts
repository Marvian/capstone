import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorFactory } from '../../utils/errors/factory/errorFactory.factory'
import { secret } from '../auth.config'
import { User } from '../../models/user.model'
import { AppDataSource } from '../../AppDataSource'
import { ROLE } from '../../utils/enum.role'
import { Constants } from '../../utils/contants'

/**
 * This function verifies a token in a request header and sets the user ID in the request body if the
 * token is valid.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information about the request such as the request method, headers, URL, and
 * body.
 * @param {Response} res - `res` stands for response and it is an object that represents the HTTP
 * response that an Express app sends when it receives an HTTP request. It contains methods for sending
 * a response back to the client, such as `send()`, `json()`, `status()`, etc.
 * @param {NextFunction} next - `next` is a function that is called to pass control to the next
 * middleware function in the stack. It is typically used to chain multiple middleware functions
 * together to handle a request. When `next()` is called, the next middleware function in the stack is
 * executed. If there are no more middleware functions
 * @returns The function `verifyToken` is not returning anything explicitly. It is either calling the
 * `next()` function to pass control to the next middleware function or sending a response with a
 * status code and a message.
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['x-access-token']
    console.log('token: ', token)
    if (!token) {
        let errorMessage = 'pepito No token provided!'
        ErrorFactory.getConnectionDatabaseError(errorMessage)
        return res.status(403).send({
            message: 'No token provided!',
        })
    }

    jwt.verify(token, secret, (err, decoded) => {
        console.log('decoded: ', decoded)
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!',
            })
        }
        req.body.userId = decoded.id
        next()
    })
}

/**
 * This function checks if the user making a request has an admin role.
 * @param {Request} req - Request object containing information about the incoming HTTP request.
 * @param {Response} res - `res` stands for response and it is an object that represents the HTTP
 * response that an Express app sends when it receives an HTTP request. It contains methods for sending
 * the response back to the client, such as `send()`, `json()`, `status()`, etc.
 * @param {NextFunction} next - `next` is a function that is called to pass control to the next
 * middleware function in the chain. It is typically used to move on to the next function after the
 * current middleware function has completed its task.
 * @returns If the user's role is an admin, then the `next()` function is called, which means that the
 * control is passed to the next middleware function. If the user's role is not an admin, then nothing
 * is returned and the function ends.
 */
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const dataSource = AppDataSource.getDataSource()
    try {
        const userRep = dataSource.getRepository(User)
        const user: User = await userRep.findOneBy({
            id: req.body.userId,
        })
        // console.log('\nuser: ', user);
        if (user.role.id === ROLE.ADMIN) {
            next()
            return
        } else {
            res.status(403).send({ message: 'Require Admin Role!' })
            return
        }
    } catch (error) {
        return error
    }
}
export async function isProjectCoordinator(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const dataSource = AppDataSource.getDataSource()
    try {
        const userRep = dataSource.getRepository(User)
        const user: User = await userRep.findOneBy({
            id: req.body.userId,
        })
        // console.log('\nuser: ', user);
        if (user.role.id === ROLE.PROJECT_COORDINATOR) {
            next()
            return
        } else {
            res.status(403).send({
                message: 'Require Project Coordinator Role!',
            })
            return
        }
    } catch (error) {
        return error
    }
}

export function middleware(neededRoles: number[]) {
    return async (req: Request, _res: Response, next: Function) => {
        const errorToken = () =>
            next(
                ErrorFactory.getForbiddenError(
                    'User has not permission to access this resource',
                ),
            )
        const dataSource = AppDataSource.getDataSource()
        const userRep = dataSource.getRepository(User)

        const user: User = await userRep.findOneBy({
            id: req.body.userId,
        })

        const userRolesIncluded = neededRoles.includes(user.role.id)
        let isAllowedRole: boolean = false

        if (userRolesIncluded) {
            isAllowedRole = neededRoles.some((neededRole) => {
                return Constants.ROLES.includes(neededRole)
            })
        }

        if (!isAllowedRole || !userRolesIncluded) {
            console.log('Reason unauthorized', isAllowedRole, userRolesIncluded)
            errorToken()
        }
        // @ts-ignore
        req.userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.role.name,
        }

        next()
    }
}
