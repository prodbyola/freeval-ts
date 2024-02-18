import { Validator, ValidatorRules } from ".."

const data = {
    field1: '',
    field2: ''
  }

  const dataRules: ValidatorRules<typeof data> = {
    field1: [
      { 
        condition: 'min_len', 
        error: 'This field must have minimum of 8 characters!', 
        size: 8 
      }, 
      { condition: 'required' }
    ],
    field2: [{ condition: 'required' }]
  }

  const validator = new Validator(data, dataRules)

  describe('validate', () => {
    it('It should return false', () => {
        expect(validator.validate()).toEqual(false)
    })
  })