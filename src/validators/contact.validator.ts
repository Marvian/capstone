import { Schema } from 'express-validator'
import { Constants } from '../utils/contants'
import { Utils } from '../utils/utils'

export const createContactSchema: Schema = {
    email: {
        in: ['body'],
        isString: true,
        optional: true,
        custom: {
            options: (value) => {
                if (value && !Constants.REGEXP_EMAILS.test(value)) {
                    throw Error('email must be valid')
                }
                return true
            },
        },
    },
    phoneNumber: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        custom: {
            options: (value) => {
                if (value && !Constants.PHONE_FORMAT.test(value)) {
                    throw Error(
                        'The contact number must be valid, it must have 10 numbers.',
                    )
                }
                return true
            },
        },
    },
}
