import { validateRule } from "./validators"

export type ValidatorKey = 'required' | 'email' | 'password' | 'number' | boolean | string

export type ValidatorRule = {
    rule: ValidatorKey,
    error?: string
}
export type ValidatorRuleList = Array<ValidatorRule>

const LENGTH_KEYS = ['len', 'min', 'max'] as const
type LengthKeyType = typeof LENGTH_KEYS[number]

export type ValidatorRules<T> = { [Property in keyof T]?: ValidatorRuleList }

export class Validator <T> {
    private _errors: Map<keyof T, string[]> = new Map
    
    get errors(){
        return this._errors as ReadonlyMap<keyof T, string[]>
    }

    constructor ( private data: T, private rules?: ValidatorRules<T>){}
    setRules(rules: ValidatorRules<T>){
        this.rules = rules
    }

    validate(){
        this.clearAllErrors()
        
        const data = this.data
        const rules = this.rules

        if(rules){
            Object.keys(rules).forEach(key => {
                const k = key as keyof T
                const ruleList = rules[k]

                if(ruleList && ruleList.length) {
                    const value = data[k]

                    ruleList.forEach(rule => {
                        const [isValid, error] = validateRule(rule, k, value as string)
                        
                        if(!isValid) {
                            this.setError(k, error)
                            
                        }
                    })

                }
            })
        } else {
            throw new Error('Validation rules not specified.')
        }

        return !this._errors.size
    }

    private setError(field: keyof T, error: string){
        const e = this.errors.get(field)
        if(e) e.push(error)
        else this._errors.set(field, [error])
    }

    getErrors(key: keyof T){
        return this.errors.get(key)
    }

    clearErrors(key: keyof T) {
        this._errors.set(key, [])
    }

    clearAllErrors(){
        this._errors = new Map()
    }
}
