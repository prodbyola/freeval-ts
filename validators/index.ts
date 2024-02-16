import { LENGTH_KEYS, type LengthKeyType, type ValidatorRule, defaultError } from "../common";
import { validateByLength } from "./length";

const validateRule = <T>(rule: ValidatorRule, field: keyof T, value: string): [boolean, string] => {
    let ruleKey = rule.rule
    let validated = false

    const v = value

    if (ruleKey === 'required') {
        validated = Boolean(v || v?.length) // value must not be empty

    } else if (ruleKey === 'email') {
        validated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) // value must be an email patterb
    
    } else if (ruleKey === 'password') {
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        validated = strongRegex.test(v)
    
    } else if (ruleKey === 'number') {
        validated = new RegExp(/^\d+$/).test(v)

    } else if (LENGTH_KEYS.includes(ruleKey as LengthKeyType)) {
        return validateByLength({
            field: field,
            value,
            rule,
        })
    }

    let error = rule.error ?? defaultError({
        ruleKey,
        field: field as string
    })

    return [validated, error]
}

export { validateRule }