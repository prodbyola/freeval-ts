# Freeval

Freeval (for free validator) provides a flexible validation mechanism for objects based on predefined rules.

## Installation

To install the Validator package, you can use npm:

```bash
npm install freeval
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
    username: 'JohnDoe',
    email: 'john@example.com',
    password: 'securePassword123'
};

const rules: ValidatorRules<UserData> = {
    username: [
        { rule: 'required', error: 'Username is required' },
        { rule: 'string', error: 'Username must be a string' }
    ],
    email: [
        { rule: 'required', error: 'Email is required' },
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
const isValid = validator.valid;

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

#### `invalid: boolean`
Returns a negated value of `valid`.

#### `setRules(rules: ValidatorRules<T>): void`

Sets the validation rules for the object properties.

#### `getErrors(key: keyof T): string[] | undefined`

Gets the validation errors for a specific object property.

#### `clearErrors(key: keyof T): void`

Clears the validation errors for a specific object property.

#### `clearAllErrors(): void`

Clears all validation errors.

## Contributing

Contributions to the Validator package are welcome! Feel free to submit bug reports, feature requests, or pull requests through the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
