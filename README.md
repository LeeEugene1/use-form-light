# use-form-light

React를 위한 가벼운 폼 상태 관리 및 유효성 검사 라이브러리

## 설치

```bash
npm install use-form-light
# or
yarn add use-form-light
```

## 사용 방법

### 기본 사용법
https://codesandbox.io/p/sandbox/use-form-light-submit-validation-m22s8f

## API

### useForm

```typescript
const { register, handleSubmit, errors, values, reset, validate, watch } =
  useForm<T>(options);
```

#### 옵션

- `defaultValues`: 폼의 초기값
- `validationRules`: 유효성 검사 규칙

#### 반환값

- `register`: 입력 필드 등록 함수
- `handleSubmit`: 폼 제출 핸들러
- `errors`: 에러 메시지 객체
- `values`: 현재 폼 값
- `reset`: 폼 초기화 함수
- `validate`: 수동 유효성 검사 함수
- `watch`: 현재 특정 값

## 특징

- 타입 안전성 (TypeScript)
- 실시간 유효성 검사
- 커스텀 유효성 검사 규칙
- 기본/헤드리스 스타일 지원
- 가벼운 번들 사이즈

## 라이센스

MIT
