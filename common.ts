const LENGTH_KEYS = ['len', 'min', 'max'] as const
export type LengthKeyType = typeof LENGTH_KEYS[number]

type ValidatorKey = 'required' | 'email' | 'password' | 'number' | LengthKeyType | boolean

type ValidatorRule = {
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
            return `${field} field is <b>required</b>.`

        case 'email':
            return `${field} field must be a <b>valid email</b>.`

        case 'password':
            return `${field} field must contain at least <b>1 lowercase</b> alphabetical character, <b>1 uppercase</b> alphabetical character, <b>1 numeric</b> character, one <b>special character</b> and must be <b>eight characters</b> or longer.`

        case 'number':
            return `${field} field must contain <b>digits only</b>. Please <b>remove letters or whitespaces.</b>.`

        case 'len':
            const s = size ?? 0
            const v = value ?? 0

            const gtl = v > s ? 'greater' : 'lesser'
            return `The length of ${field} input is <b>${gtl} than the required length of ${s}</b>.`

        case 'min':
            return `The required <b>minimum length</b> for ${field} is <b>${size}</b>. You entered ${value} characters.`

        case 'max':
            return `The required <b>maximum length</b> for ${field} is <b>${size}</b>. You entered ${value} characters.`

        default:
            return 'Undefined error.'
    }
}

export { LENGTH_KEYS, ValidatorRuleList, ValidatorRule }