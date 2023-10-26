import { UserBo } from '../user.bo'

export class BoFactory {
    /**
     *
     * @returns UserBo
     */
    public static getUserBo(): UserBo {
        return new UserBo()
    }
    /**
     *
     * @returns UserBo
     */
    
}
