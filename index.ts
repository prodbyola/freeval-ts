import { ValidatorRuleList } from "./common"
import { validateRule } from "./validators"

export type ValidatorRules<T> = { [Property in keyof T]?: ValidatorRuleList }

export class Validator<T> {
    private _errors: Map<keyof T, string[]> = new Map

    /**
     * Validates the object against the specified rules. Returns `true` if the object passes validation; otherwise, returns `false`.
     */
    get valid() {
        const v = this.validate()
        return v
    }

    /**
     * Returns a negated value of `valid`.
     */
    get inValid() {
        return !this.valid
    }

    get errors() {
        return this._errors as ReadonlyMap<keyof T, string[]>
    }

    /**
     * The `Validator<T>` class provides methods for data validation.
     * @param data - The object to be validated.
     * @param rules - Optional. The validation rules for the object properties. You can manually set this later by calling `setRules` method.
     */
    constructor(private data: T, private rules?: ValidatorRules<T>) { }

    /**
     * Sets the validation rules for the object properties.
     * @param rules - The validation rules
     */
    setRules(rules: ValidatorRules<T>) {
        this.rules = rules
    }

    /**
     * Gets the validation errors for a specific object property or field on `data`.
     * @param key - A field or property of `data`.
     * @returns 
     */
    getErrors(key: keyof T) {
        return this.errors.get(key)
    }

    /**
     * Clears the validation errors for a specific object property or field on `data`.
     * @param key - A field or property of `data`.
     */
    clearErrors(key: keyof T) {
        this._errors.set(key, [])
    }

    /**
     * Clears all validation errors.
     */
    clearAllErrors() {
        this._errors = new Map()
    }

    private validate() {
        this.clearAllErrors()

        const data = this.data
        const rules = this.rules

        if (rules) {
            Object.keys(rules).forEach(k => {
                const key = k as keyof T
                const ruleList = rules[key]

                if (ruleList && ruleList.length) {
                    const value = data[key]

                    ruleList.forEach(rule => {
                        const [isValid, error] = validateRule(rule, key, value as string)

                        if (!isValid) {
                            this.setFieldError(key, error)

                        }
                    })

                }
            })
        } else {
            throw new Error('Validation rules not specified.')
        }

        return !this._errors.size
    }

    private setFieldError(field: keyof T, error: string) {
        const e = this.errors.get(field)
        if (e) e.push(error)
        else this._errors.set(field, [error])
    }
}
