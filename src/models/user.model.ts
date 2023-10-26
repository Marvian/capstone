import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Role } from './role.model'
import { Status } from './status.model'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar', { nullable: true })
    surname: string

    @Column('varchar', { unique: true }) //cann't be null
    email: string

    @Column('varchar')
    password: string
    
    @Column('varchar', { nullable: true })
    state: string

    @ManyToOne(() => Status, { nullable: false, eager: true })
    status: Status

    @UpdateDateColumn()
    updatedAt: Date

    @CreateDateColumn()
    createAt: Date

    @ManyToOne(() => Role, (role) => role.user, {
        eager: true,
        nullable: false,
    })
    role: Role

}
