import { Request, Response } from 'express'
import { AppDataSource } from '../../AppDataSource'
import { ModelFactory } from '../../models/factory/modelsFactory.factory'
import { User } from '../../models/user.model'
import { UserRepository } from '../../repository/user.repository'
import { ErrorFactory } from '../../utils/errors/factory/errorFactory.factory'
import { BaseBo } from './abstractBase.bo'


export class UserBo extends BaseBo<User> {
    getRepository: any
    lenght: any
    array: any
    dataSource: any = AppDataSource.getDataSource()

    constructor() {
        super()
        this.repository = UserRepository
    }
    
    public async createUser(req: Request, res: Response) {
        let user = null
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        try {
            await queryRunner.startTransaction()
            user = await this.signUp(req.body)
            if (!user) {
                throw ErrorFactory.getUsertNotFoundError('Error creating user')
            }
        } catch (error) {
            queryRunner.rollbackTransaction()
            throw error
        }
        return user
    }

    
    /**
     * @author 
     * @date 
     * @function getUserId
     */
    public async getUserId(id: number) {
        try {
            const user = this.repository.findById(id)
            return user
        } catch (error) {
            //console.log('here the error', error)
            throw error
        }
    }

    /**
     * @author 
     * @date 
     * @function getUserId
     */
    public async signUp(params: any) {
        console.log('params: ', params)
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()


        await this.dataSource.query(
            "SELECT setval('user_id_seq', (SELECT MAX(id) FROM public.user))",
        )
    
        try {
            console.log('after try')
            const user: any = ModelFactory.getUserModel(
                params.name,
                params.surname,
                params.email,
                params.password,
                null,
            )
            await queryRunner.startTransaction()
            await this.manager.save(user)
            await queryRunner.commitTransaction()
            return {
                message: 'User registered successfully!',
                user: user.name + ' ' + user.surname,
                survey: user.email,
            }
        } catch (error) {
            queryRunner.rollbackTransaction()
            throw error
        }
    }

    }
