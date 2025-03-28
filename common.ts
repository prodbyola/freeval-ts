const LENGTH_CONDITIONS = ['len', 'min', 'max'] as const
type LengthConditionType = typeof LENGTH_CONDITIONS[number]

const COMPARE_CONDITIONS = ['eq', 'gt', 'lt', 'gte', 'lte'] as const
type CompareConditionType = typeof COMPARE_CONDITIONS[number]

type RuleCondition = 'required' | 'email' | 'password' | 'number' | 'regex' | 'match' | LengthConditionType | CompareConditionType | boolean
export type RegexExpect = {
    regex: RegExp,
    test: string
}


export type ValidatorRule = {
    /**
     * rule condition that must be met.
     */
    condition: RuleCondition

    /**
     * Error to be shown if validation fails.
     */
    error?: string

    /**
     * The value we expect the field `value` to match. Should be set where applicable For example, if rule is `max`
     * or `len`, then we must specify the size we expect the input value of the respective field to conform to. If we 
     * do not supply this value when required, then an error will be thrown.
     * ```typescript
     *  max=6
     * ```
     */
    expect?: number | string | RegexExpect
}

type ValidatorRuleList = Array<ValidatorRule>

/**
 * Generates default error message for a validation rule.
 * @param opt 
 * @returns 
 */
const defaultError = (opt: {
    condition: RuleCondition,
    field: string,
    size?: number,
    value?: number
}) => {
    const { condition, field, size, value } = opt

    switch (condition) {
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

/**
 * Prepares a rule for insertion.
 * @param field - `data` field or property
 * @param rule 
 * @returns 
 */
const prepareRule = <T>(field: keyof T, rule: ValidatorRule) => {
    const condition = rule.condition

    if (!rule.error) rule.error = defaultError({
        condition: condition,
        field: field as string,
        size: 3,
        value: condition === 'max' ? 2 : 4
    })

    return rule
}

export {
    LENGTH_CONDITIONS,
    COMPARE_CONDITIONS,
    type CompareConditionType,
    type LengthConditionType, 
    type ValidatorRuleList,
    prepareRule, 
    defaultError
}