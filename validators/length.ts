import { LENGTH_KEYS, LengthKeyType, ValidatorRule } from "../common"

const validateByLength = <T>(opt: {
    field: keyof T,
    value?: string,
    rule: ValidatorRule,
}): [boolean, string] => {
    const { field, value, rule } = opt
    const ruleKey = rule.rule as LengthKeyType

    if(!LENGTH_KEYS.includes(ruleKey)){
        throw new Error('Invalid length type specified. Accepted input could be any of: '+LENGTH_KEYS)
    }

    if(typeof rule.size === 'undefined'){
        throw new Error('This validation rule requires you to specify a size.')
    }

    const size = rule.size // size required by the rule
    let condition = false, error = 'Undefined error'

    if (typeof value === 'undefined'){
        throw new Error('Input value must be defined.')
    }

    const vlen = value.toString().length // length of the input value
    const k = field as string

    if(ruleKey ===  'len') {
        condition = size === vlen
        const gtl = vlen > size ? 'greater' : 'lesser'
        error = `The length of ${k} input is <b>${gtl} than the required length of ${size}</b>.`

    } else if (ruleKey === 'min'){
        condition = vlen >= size
        error = `The required <b>minimum length</b> for ${k} is <b>${size}</b>. You entered ${vlen} characters.`
    } else if (ruleKey === 'max'){
        condition = vlen <= size
        error = `The required <b>maximum length</b> for ${k} is <b>${size}</b>. You entered ${vlen} characters.`
    }

    if(typeof rule.error !== 'undefined') error = rule.error
    
    return [condition, error]

}

export { validateByLength }