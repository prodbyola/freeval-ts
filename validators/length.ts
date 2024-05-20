import { LENGTH_CONDITIONS, type LengthConditionType, type ValidatorRule, defaultError } from "../common"

const validateByLength = <T>(opt: {
    field: keyof T,
    value?: string,
    rule: ValidatorRule,
}): [boolean, string] => {
    const { field, value, rule } = opt
    const condition = rule.condition as LengthConditionType
    let error: string | undefined = undefined 

    if(!LENGTH_CONDITIONS.includes(condition)){
        error = 'Invalid length type specified. Accepted input could be any of: '+LENGTH_CONDITIONS
    }

    if(typeof rule.size === 'undefined'){
        error = 'This validation rule requires you to specify a size.'
    }

    const size = rule.size // size required by the rule
    let validated = false

    if (typeof value === 'undefined'){
        error = 'Input value must be defined.'
    }

    if(error !== undefined) {
        return [validated, error]
    }

    if(value && size) {
        const vlen = value.toString().length // length of the input value
        const k = field as string
    
        if(condition === 'len') {
            validated = size === vlen
    
        } else if (condition === 'min'){
            validated = vlen >= size
        } else if (condition === 'max'){
            validated = vlen <= size
        }
    
        error = rule.error ?? defaultError({
            condition,
            field: k,
            size,
            value: vlen
        })
    
        return [validated, error]
    }

    return [false, 'Unknown error']

}

export { validateByLength }