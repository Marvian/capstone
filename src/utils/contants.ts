export const Constants = {
    REGEXP_EMAILS: /^[A-Z0-9._%+-]+@[A-Z0-9._.-]+\.[A-Z]{2,5}$/i,
    REGEXP_SOCIAL_SECURITY: /\d{3}-\d{2}-\d{4}/,
    REGEXP_NOT_A_DIGIT: /(\D+)/g,
    REGEXP_NOT_BRACKETS: /[\[\]]/g,
    PHONE_FORMAT: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g,
    ONLY_NUMBERS: /^\d{10}$/g,
    ROLES: [1, 2, 3, 4],
    ACTIVE: 1,
    INACTIVE: 2,
}
