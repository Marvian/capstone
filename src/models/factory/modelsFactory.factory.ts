
import { Role } from '../role.model'
import { Status } from '../status.model'
import { User } from '../user.model'

export class ModelFactory {
    /**
     * @function getUserModel
     */
    public static getUserModel(
        name: string = null,
        surname: string = null,
        email: string = null,
        password: string = null,
        role: Role = null,
    ): User {
        const user = new User()
        user.name = name
        user.surname = surname
        user.email = email
        user.password = password
        user.role = role
        
        return user
    }

    
    /**
     * @function getRoleModel
     */
    public static getRoleModel(name: string, user: User): Role {
        const role = new Role()
        role.name = name
        role.user = user
        return role
    }

}
