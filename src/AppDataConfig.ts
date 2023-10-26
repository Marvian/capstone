import { env } from 'process'
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { User } from './models/user.model'
import { Role } from './models/role.model'
import { Status } from './models/status.model'


const dataPruebas: DataSourceOptions = {
    name: 'capstonePrueba',
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    ssl: false,
    database: 'capstonePrueba',
    synchronize: true,
    logging: true,
    entities: [
        User,
        Role,
        Status
    ],
    namingStrategy: new SnakeNamingStrategy(),
}
const dataProduction: DataSourceOptions = {
    name: 'capstone',
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    ssl: env.DATABASE_SSL == 'true' ? true : false,
    database: env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User,
        Role,
        Status,
    ],
    namingStrategy: new SnakeNamingStrategy(),
}
export { dataProduction, dataPruebas }
