import { AppDataSource } from '../AppDataSource'
import { Role } from '../models/role.model'

export const RoleRepository = AppDataSource.getDataSource()
    .getRepository(Role)
    .extend({
        async findById(id: number) {
            const dataResult = await this.createQueryBuilder('role').where(
                'role.id = :id',
                { id: id },
            )
            //console.log(`dataResult:\n`,dataResult.getSql());
            return dataResult.getOne()
        },
    })
