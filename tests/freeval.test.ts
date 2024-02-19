import { Validator, ValidatorRules } from ".."
import { log } from "console";

const data = {
    field1: '',
    field2: ''
}

const dataRules: ValidatorRules<typeof data> = {
    field1: [
        {
            condition: 'min',
            error: 'This field must have minimum of 8 characters!',
            size: 8
        },
        { condition: 'required' }
    ],
    field2: [{ condition: 'required' }]
}

const validator = new Validator(data, dataRules)

describe('validateFail', () => {
    it('It should return false', () => {
        log(validator.getFieldRules('field1'))
        expect(validator.validate()).toEqual(false)
    })
})

describe('getFieldRules', () => {
    it('It should return rule errors length for a field', () => {
        const rules = validator.getFieldRules('field1')
        log(rules)
        expect(rules?.length).toEqual(2)
    })
})