# use-form-light

A lightweight form state management and validation library for React

## Installation

```bash
npm install use-form-light
# or
yarn add use-form-light
```

## Usage

### Basic Usage

```typescript
// Import only what you need
import { useForm } from 'use-form-light';
// or specific components
import { Form, Input, Textarea, Button } from 'use-form-light';
```

codesandbox example
https://codesandbox.io/p/sandbox/use-form-light-submit-validation-m22s8f

## API

### useForm

```typescript
const { register, handleSubmit, errors, values, reset, validate, watch } =
  useForm<T>(options);
```

#### Options

- `defaultValues`: Initial form values
- `validationRules`: Validation rules

#### Return Values

- `register`: Input field registration function
- `handleSubmit`: Form submission handler
- `errors`: Error message object
- `values`: Current form values
- `reset`: Form reset function
- `validate`: Manual validation function
- `watch`: Current specific value

## Features

- Type Safety (TypeScript)
- Real-time validation
- Custom validation rules
- Default/Headless style support
- Optimized performance with minimal re-renders
- Tree-shaking support for minimal bundle size

## Why use-form-light?

- **Extremely Lightweight**: it's significantly smaller than alternatives like react-hook-form
- **Simple API**: Easy to learn and use with a minimal API surface
- **TypeScript First**: Full type safety out of the box
- **Zero Dependencies**: No external dependencies, reducing bundle size
- **Flexible**: Supports both controlled and uncontrolled components

## License

MIT
