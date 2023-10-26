import { Schema } from 'express-validator'

export const projectValidator: Schema = {
    project: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'Project required and is a number!',
    },
}
export const campaignValidator: Schema = {
    campaignId: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'Campaign required and is a number!',
    },
}
export const contactValidator: Schema = {
    contactId: {
        in: ['body'],
        isInt: true,
        notEmpty: true,
        errorMessage: 'ContactId required and is a number!',
    },
}
