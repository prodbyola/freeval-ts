import { LENGTH_KEYS, LengthKeyType } from "../common"

const validateByLength = <T>(opt: {
    field: keyof T,
    value?: string,
    ruleKey: string,
}): [boolean, string] => {
    const { field, value, ruleKey } = opt
    const key = ruleKey.split('=')[0]

    if(!LENGTH_KEYS.includes(key as LengthKeyType)){
        throw new Error('Invalid length type specified. Accepted input could be any of: '+LENGTH_KEYS)
    }

    const rlen = parseInt(ruleKey.split('=')[1]) // length required by the rule
    let condition = false, error = 'Undefined error'

    if (typeof value === 'undefined'){
        throw new Error('Input value must be defined.')
    }

    const vlen = value.toString().length // length of the input value
    const k = field as string

    if(key ===  'len') {
        condition = rlen === vlen
        const gtl = vlen > rlen ? 'greater' : 'lesser'
        error = `The length of ${k} input is <b>${gtl} than the required length of ${rlen}</b>.`

    } else if (key === 'min'){
        condition = vlen >= rlen
        error = `The required <b>minimum length</b> for ${k} is <b>${rlen}</b>. You entered ${vlen} characters.`
    } else if (key === 'max'){
        condition = vlen <= rlen
        error = `The required <b>maximum length</b> for ${k} is <b>${rlen}</b>. You entered ${vlen} characters.`
    }
    
    return [condition, error]

}

export { validateByLength }