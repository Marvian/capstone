import { NextFunction, Request, Response } from 'express'
import { User } from '../../models/user.model'
import { Constants } from '../../utils/contants'
import { AppDataSource } from '../../AppDataSource'

export async function checkDuplicateEmail(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const dataSource: any = AppDataSource.getDataSource()
    const roleRepository = dataSource.getRepository(User)
    await roleRepository
        .findOneBy({
            email: req.body.email,
        })
        .then((user) => {
            if (user) {
                res.status(400).send({
                    message: 'Failed! Email is already in use!',
                })
                return
            }
            next()
        })
}
export async function checkRolesExisted(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!Constants.ROLES.includes(req.body.role)) {
        res.status(400).send({
            message: 'Failed! Role does not exist = ' + req.body.role,
        })
        return
    }
    next()
}
