const LENGTH_KEYS = ['len', 'min', 'max'] as const
type LengthKeyType = typeof LENGTH_KEYS[number]

type ValidatorKey = 'required' | 'email' | 'password' | 'number' | LengthKeyType | boolean

export type ValidatorRule = {
    rule: ValidatorKey
    error?: string
    /**
     * This property is required if `rule` === `LengthKeyType`. For example, if rule is `max`
     * or `len`, then we must specify the size we expect the input value tp conform to. If we 
     * do not supply this value when we `rule` === `LengthKeyType`, then an error will be thrown.
     * ```typescript
     *  max=6
     * ```
     */
    size?: number
}

type ValidatorRuleList = Array<ValidatorRule>

export const defaultError = (opt: { ruleKey: ValidatorKey, field: string, size?: number, value?: number }) => {
    const { ruleKey, field, size, value } = opt

    switch (ruleKey) {
        case 'required':
            return `${field} field is required.`

        case 'email':
            return `${field} field must be a valid email.`

        case 'password':
            return `${field} field must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, one special character and must be eight characters or longer.`

        case 'number':
            return `${field} field must contain digits only. Please remove letters or whitespaces..`

        case 'len':
            const s = size ?? 0
            const v = value ?? 0

            const gtl = v > s ? 'greater' : 'lesser'
            return `The length of ${field} input is ${gtl} than the required length of ${s}.`

        case 'min':
            return `The required minimum length for ${field} is ${size}. You entered ${value} characters.`

        case 'max':
            return `The required maximum length for ${field} is ${size}. You entered ${value} characters.`

        default:
            return 'Undefined error.'
    }
}

export { LENGTH_KEYS, ValidatorRuleList, LengthKeyType }