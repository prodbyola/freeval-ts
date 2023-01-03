type ValidatorRule = Array<{
    rule: 'required' | 'email' | 'password' | boolean,
    error?: string
}>

export type ValidatorRules<T> = { [Property in keyof T]?: ValidatorRule }

export class Validator <T> {
    private _errors: Map<keyof T, string[]> = new Map
    get errors(){
        return this._errors as ReadonlyMap<keyof T, string[]>
    }

    constructor ( private data: T, private rules? : ValidatorRules<T>){}

    validate(){
        const data = this.data
        let error = '', validated = true
        const rules = this.rules

        if(rules){
            Object.keys(rules).forEach(key => {
                const k = key as keyof T
                const ruleList = rules[k]

                if(ruleList && ruleList.length) {
                    const value = data[k]

                    ruleList.forEach(rule => {
                        let condition = rule.rule
                        if(rule.error) error = rule.error

                        if(condition === 'required') {
                            const v = value as string
                            
                            condition = Boolean(v || v?.length) // value must not be empty
                            if(!rule.error) error = `The ${(k as string)} field is <b>required</b>.` 

                        } else if (condition === 'email') {
                            const v = value as string
                            condition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) // value must be an email patterb
                            if(!rule.error) error = 'The email field must be a <b>valid email</b>.'
                        } else if (condition === 'password'){
                            const v = value as string
                            const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
                            condition = strongRegex.test(v)

                            if(!rule.error) error = 'Password must contain at least <b>1 lowercase</b> alphabetical character, <b>1 uppercase</b> alphabetical character, <b>1 numeric</b> character, one <b>special character</b> and must be <b>eight characters</b> or longer.'
                        }

                        if(!condition) {
                            this.setError(k, error)
                            validated = false
                        }
                    })

                }
            })
        }

        return validated
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

}