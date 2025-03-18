import { LENGTH_CONDITIONS, type LengthConditionType, RegexExpect, type ValidatorRule, defaultError } from "../common";
import { validateByLength } from "./length";

const validateRule = <T>(rule: ValidatorRule, field: keyof T, value: unknown): [boolean, string] => {
    let condition = rule.condition
    let validated = false

    let error = rule.error ?? defaultError({
        condition: condition,
        field: field as string
    })
    const v = value as string

    if (condition === 'required') {
        validated = Boolean(v || v?.length) // value must not be empty

    } else if (condition === 'email') {
        validated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) // value must be an email patterb
    
    } else if (condition === 'password') {
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        validated = strongRegex.test(v)
    
    } else if (condition === 'number') {
        validated = new RegExp(/^\d+$/).test(v)

    } else if (LENGTH_CONDITIONS.includes(condition as LengthConditionType)) {
        return validateByLength({
            field: field,
            value: value as string,
            rule,
        })
    } else if (condition === 'eq') {
        if(typeof rule.expect === 'undefined'){
            error = 'This validation rule requires you to specify a size.'
        }

        validated = value === rule.expect
        console.log('eq', 'v: ' + value, 'e: ' + (rule.expect as string), typeof rule.expect, validated)
    } else if (condition === 'regex') {
        const expect = rule.expect as RegexExpect
        validated = expect.regex.test(expect.test)
    }

    return [validated, error]
}

export { validateRule }