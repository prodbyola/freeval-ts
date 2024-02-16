export * from './common'
import { ValidatorRuleList, defaultError } from "./common"
import { validateRule } from "./validators"

export type ValidatorRules<T> = { [Property in keyof T]?: ValidatorRuleList }

export class Validator<T> {
    private _errors: Map<keyof T, string[]> = new Map

    /**
     * Validates the object against the specified rules. Returns `true` if the object passes validation; otherwise, returns `false`.
     * 
     * Make sure you call either `validate` or `validateField` function before accessing this propery correctly:
     * 
     * ```typescript
     * const validator = new Validator(data, rules)
     * const isValid = validator.validate()
     * validator.valid
     * ```
     */
    get valid() {
        return !this._errors.size
    }

    /**
     * Returns a negated value of `valid`.
     * 
     * Make sure you call either `validate` or `validateField` function before accessing this propery correctly:
     * 
     * ```typescript
     * const validator = new Validator(data, rules)
     * const isValid = validator.validate()
     * validator.invalid
     * ```
     */
    get invalid() {
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
     * @param field - A field or property of `data`.
     */
    clearFieldErrors(field: keyof T) {
        this._errors.delete(field)
    }

    /**
     * Clears all validation errors.
     */
    clearAllErrors() {
        this._errors = new Map()
    }

    /**
     * Define rules for a certain field or property of `data`.
     * @param field - The field of `data`.
     * @param ruleList - An array of validation rule for rule for the field.
     */
    setFieldRule(field: keyof T, ruleList: ValidatorRuleList) {
        if (typeof this.rules === 'undefined') {
            this.rules = {}
        }

        this.rules[field] = ruleList
    }

    /**
     * Remove rules added for a field or property.
     * @param field - The field of `data`.
     */
    removeFieldRule(field: keyof T) {
        if (this.rules) {
            delete this.rules[field]
        }
    }

    /**
     * Validates a single field.
     * @param field - The field of `data`.
     * @returns boolean
     */
    validateField(field: keyof T) {
        this.clearFieldErrors(field)

        if (!this.rules) {
            return
        }

        const ruleList = this.rules[field]
        if (ruleList && ruleList.length) {
            const value = this.data[field]

            ruleList.forEach(rule => {
                const [isValid, error] = validateRule(rule, field, value as string)

                if (!isValid) {
                    this.setFieldError(field, error)
                }
            })
        }

        return this.valid
    }

    /**
     * Validates all properties or fields in `data`.
     * @returns boolean
     */
    validate() {
        const rules = this.rules

        if (rules) {
            Object.keys(rules).forEach(k => {
                const key = k as keyof T
                this.validateField(key)
            })
        } else {
            throw new Error('Validation rules not specified.')
        }

        return this.valid
    }

    /**
     * Retrieves validation rules defined for a data `field`. Returns `undefined` if no rule is declared for `field`.
     * @param field 
     * @returns `ValidatorRule[]` | `undefined`
     */
    getFieldRules(field: keyof T) {
        if (this.rules) {
            const rules = this.rules[field]
            if (rules && rules?.length) {
                return rules.map((rule) => {
                    const ruleKey = rule.rule
                    if (!rule.error) rule.error = defaultError({
                        ruleKey,
                        field: field as string,
                        size: 3,
                        value: ruleKey === 'max' ? 2 : 4
                    })

                    return rule
                })
            }
        }
    }

    private setFieldError(field: keyof T, error: string) {
        const e = this.errors.get(field)
        if (e) e.push(error)
        else this._errors.set(field, [error])
    }
}
