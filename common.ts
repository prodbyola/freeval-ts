const LENGTH_KEYS = ['len', 'min', 'max'] as const
type LengthKeyType = typeof LENGTH_KEYS[number]

type ValidatorKey = 'required' | 'email' | 'password' | 'number' | boolean | string

type ValidatorRule = {
    rule: ValidatorKey,
    error?: string
}

type ValidatorRuleList = Array<ValidatorRule>

export { LENGTH_KEYS, LengthKeyType, ValidatorRuleList, ValidatorRule }