import { ValidatorRule } from "../common";
import { validateByLength } from "./length";

const validateRule = <T>(rule: ValidatorRule, key: keyof T, value: string): [boolean, string] => {
    let ruleKey = rule.rule
    let validated = false
    let error = 'Error undefined'

    if (rule.error) error = rule.error

    const v = value

    if (ruleKey === 'required') {
        validated = Boolean(v || v?.length) // value must not be empty
        if (!rule.error) error = `The ${(key as string)} field is <b>required</b>.`

    } else if (ruleKey === 'email') {
        validated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) // value must be an email patterb
        if (!rule.error) error = 'The email field must be a <b>valid email</b>.'
    } else if (ruleKey === 'password') {
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        validated = strongRegex.test(v)

        if (!rule.error) error = 'Password must contain at least <b>1 lowercase</b> alphabetical character, <b>1 uppercase</b> alphabetical character, <b>1 numeric</b> character, one <b>special character</b> and must be <b>eight characters</b> or longer.'

    } else if (ruleKey === 'number') {
        validated = new RegExp(/^\d+$/).test(v)

        if (!rule.error) error = `${(key as string)} field must contain <b>digits only</b>. Please <b>remove letters or whitespaces.</b>.`
    } else if ((ruleKey as string).includes('=')) {
        return validateByLength({
            field: key,
            value,
            ruleKey: ruleKey as string,
        })
    }

    return [validated, error]
}

export { validateRule }