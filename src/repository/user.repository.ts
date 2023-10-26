import { AppDataSource } from '../AppDataSource'
import { User } from '../models/user.model'

export const UserRepository = AppDataSource.getDataSource()
    .getRepository(User)
    .extend({
        async findById(id: number) {
            const dataResult = await this.createQueryBuilder('user').where(
                'user.id = :id',
                { id: id },
            )
            //console.log(`dataResult:\n`,dataResult.getSql());
            return dataResult.getOne()
        },
        async findByEmail(email: string) {
            const dataResult = await this.createQueryBuilder('user').where(
                'user.email = :email',
                { email: email },
            )
            // console.log(`dataResult:\n`, dataResult.getSql())
            return dataResult.getOne()
        },
    })
