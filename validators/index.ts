import { LENGTH_CONDITIONS, type LengthConditionType, type ValidatorRule, defaultError } from "../common";
import { validateByLength } from "./length";

const validateRule = <T>(rule: ValidatorRule, field: keyof T, value: string): [boolean, string] => {
    let condition = rule.condition
    let validated = false

    const v = value

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
            value,
            rule,
        })
    }

    let error = rule.error ?? defaultError({
        condition: condition,
        field: field as string
    })

    return [validated, error]
}

export { validateRule }