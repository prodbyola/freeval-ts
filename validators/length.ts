import { LENGTH_KEYS, type LengthKeyType, type ValidatorRule, defaultError } from "../common"

const validateByLength = <T>(opt: {
    field: keyof T,
    value?: string,
    rule: ValidatorRule,
}): [boolean, string] => {
    const { field, value, rule } = opt
    const condition = rule.condition as LengthKeyType

    if(!LENGTH_KEYS.includes(condition)){
        throw new Error('Invalid length type specified. Accepted input could be any of: '+LENGTH_KEYS)
    }

    if(typeof rule.size === 'undefined'){
        throw new Error('This validation rule requires you to specify a size.')
    }

    const size = rule.size // size required by the rule
    let validated = false

    if (typeof value === 'undefined'){
        throw new Error('Input value must be defined.')
    }

    const vlen = value.toString().length // length of the input value
    const k = field as string

    if(condition === 'exact_len') {
        validated = size === vlen
        const gtl = vlen > size ? 'greater' : 'lesser'

    } else if (condition === 'min_len'){
        validated = vlen >= size
    } else if (condition === 'max_len'){
        validated = vlen <= size
    }

    let error = rule.error ?? defaultError({
        condition,
        field: k,
        size,
        value: vlen
    })

    return [validated, error]

}

export { validateByLength }