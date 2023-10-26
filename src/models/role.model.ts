import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.model'

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @OneToMany(() => User, (user) => user.role)
    user: User
}
