import { COMPARE_CONDITIONS, CompareConditionType, ValidatorRule } from ".."

const compare = <T>(opt: {
    field: keyof T,
    value: number,
    rule: ValidatorRule,
}) => {
    const { field, value, rule } = opt
    const condition = rule.condition as CompareConditionType

    if(!COMPARE_CONDITIONS.includes(condition)){
        throw new Error('Invalid condition type specified. Accepted condition could be any of: '+COMPARE_CONDITIONS)
    }

    if(typeof rule.expect === 'undefined'){
        throw new Error('This validation rule requires you to specify a size.')
    }
}