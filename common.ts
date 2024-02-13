const LENGTH_KEYS = ['len', 'min', 'max'] as const
type LengthKeyType = typeof LENGTH_KEYS[number]

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

export { LENGTH_KEYS, LengthKeyType, ValidatorRuleList, ValidatorRule }