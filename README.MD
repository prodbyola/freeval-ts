# Freeval

Freeval (for free validator) provides a flexible validation mechanism for objects based on predefined rules. It's a typescript implementation of [freeval](https://github.com/prodbyola/freeval), a struct validation package in Rust.

## Installation

To install the freeval, you can use npm:

```bash
npm install freeval
```

or yarn
```bash
yarn add freeval
```

## Usage

Here's how you can use the `freeval` in your TypeScript projects:

```typescript
import { Validator, ValidatorRules } from 'freeval';

// Not necessary but you can define an interface for your data
interface UserData {
    username: string;
    email: string;
    password: string;
}

// Define your data object and validation rules
const data: UserData = {
    username: 'prodbyola',
    email: 'prodbyola@example.com',
    password: 'securePassword123'
};

const rules: ValidatorRules<UserData /* or typeof `data` */> = {
    username: [
        { rule: 'required', error: 'Username is required' },
        // minimum of 8 characters
        { 
            rule: 'min', 
            error: 'Username must be 8 characters minimum', 
            size: 8 
        }, 
    ],
    email: [
        // Setting an error message is OPTIONAL.
        { rule: 'required' },
        { rule: 'email', error: 'Invalid email format' }
    ],
    password: [
        { rule: 'required', error: 'Password is required' },
        { rule: 'password', error: 'Weak password' }
    ]
};

// Create a new Validator instance
const validator = new Validator(data, rules);

// Validate the data
const isValid = validator.validate();

if (!isValid) {
    console.log('Validation failed. Errors:');
    console.log(validator.errors);
} else {
    console.log('Validation successful.');
}
```

## API

### `Validator<T>`

The `Validator<T>` class provides methods for data validation.

#### `constructor(data: T, rules?: ValidatorRules<T>)`

- `data`: The object to be validated.
- `rules`: Optional. The validation rules for the object properties.

#### `valid: boolean`

Validates the object against the specified rules. Returns `true` if the object passes validation; otherwise, returns `false`.

Make sure you call either `validate` or `validateField` function before accessing this propery correctly:
     
```typescript
    const validator = new Validator(data, rules)
    const isValid = validator.validate()
    validator.valid
```

#### `invalid: boolean`
Returns a negated value of `valid`.

Make sure you call either `validate` or `validateField` function before accessing this propery correctly:
     
```typescript
    const validator = new Validator(data, rules)
    const isValid = validator.validate()
    validator.invalid
```

#### `validate(): boolean`
Validates all properties or fields in `data` based on speified rules.

#### `setRules(rules: ValidatorRules<T>): void`

Sets the validation rules for the object properties.

#### `getErrors(key: keyof T): string[] | undefined`

Gets the validation errors for a specific object property.

#### `clearFieldErrors(key: keyof T): void`

Clears the validation errors for a specific object property.

#### `clearAllErrors(): void`

Clears all validation errors.

#### `getFieldRules(key: keyof T): ValidatorRule[] | undefined`

Retrieves validation rules defined for a data `field`. Returns `undefined` if no rule is declared for `field`.

## Contributing

Contributions to the freeval package are welcome! Feel free to submit bug reports, feature requests, or pull requests through the GitHub repository.

## License

This project is licensed under the GPL License - see the [LICENSE](LICENSE) file for details.
