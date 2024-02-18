import { LENGTH_KEYS, type LengthKeyType, type ValidatorRule, defaultError } from "../common"

const validateByLength = <T>(opt: {
    field: keyof T,
    value?: string,
    rule: ValidatorRule,
}): [boolean, string] => {
    const { field, value, rule } = opt
    const ruleKey = rule.condition as LengthKeyType

    if(!LENGTH_KEYS.includes(ruleKey)){
        throw new Error('Invalid length type specified. Accepted input could be any of: '+LENGTH_KEYS)
    }

    if(typeof rule.size === 'undefined'){
        throw new Error('This validation rule requires you to specify a size.')
    }

    const size = rule.size // size required by the rule
    let condition = false

    if (typeof value === 'undefined'){
        throw new Error('Input value must be defined.')
    }

    const vlen = value.toString().length // length of the input value
    const k = field as string

    if(ruleKey ===  'len') {
        condition = size === vlen
        const gtl = vlen > size ? 'greater' : 'lesser'

    } else if (ruleKey === 'min'){
        condition = vlen >= size
    } else if (ruleKey === 'max'){
        condition = vlen <= size
    }

    let error = rule.error ?? defaultError({
        ruleKey,
        field: k,
        size,
        value: vlen
    })

    return [condition, error]

}

export { validateByLength }