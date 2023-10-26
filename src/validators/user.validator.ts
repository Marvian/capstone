import { Schema } from 'express-validator'
import { Constants } from '../utils/contants'
import { Utils } from '../utils/utils'

export const loginUserSchema: Schema = {
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
    password: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'email and password are required',
    },
}
export const createUserSchema: Schema = {
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
    contactNumber: {
        in: ['body'],
        isString: true,
        optional: true,
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
    password: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'password are required',
    },
    name: {
        in: ['body'],
        isString: true,
        notEmpty: true,
        errorMessage: 'firstname are required',
    },
}
export const getPartakerSchema: Schema = {
    user_id: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'user_id is Numeric and is required',
    },
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
}
