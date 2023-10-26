import { EntityManager } from 'typeorm'
import { AppDataSource } from '../../AppDataSource'

export abstract class BaseBo<_T> {
    protected repository
    protected manager: EntityManager

    constructor() {
        this.manager = AppDataSource.getDataSource().manager
    }

    /**
     *
     * @param objects
     */
    protected async saveEntities(...objects: any[]) {
        for await (let element of objects) {
            await this.manager.save(element)
        }
    }
}
