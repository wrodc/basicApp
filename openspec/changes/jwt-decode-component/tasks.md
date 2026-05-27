## 1. Scaffolding

- [x] 1.1 Create `src/components/JwtDecode.jsx` and `src/components/JwtDecode.css`
- [x] 1.2 Export and import the component in `src/App.jsx` and place it under the hero section

## 2. Decoder Implementation

- [x] 2.1 Implement a small utility function `parseJwt(token)` that returns `{ header, payload }` or throws a descriptive error for malformed input
- [ ] 2.2 Add unit tests for `parseJwt` (if test runner exists) or add a small self-test block in the component

## 3. Component UI

- [x] 3.1 Build the UI with two labeled textareas: input (editable) and outputs (read-only for header and payload)
- [x] 3.2 Add error display area with `aria-live="polite"` for screen readers
- [x] 3.3 Add a small warning text that tokens are processed locally and not verified

## 4. Styling and Accessibility

- [x] 4.1 Style the component to match app patterns (use CSS variables and focus styles)
- [ ] 4.2 Verify keyboard navigation and screen reader announcements

## 5. Validation & Documentation

- [ ] 5.1 Manual validation: paste valid, invalid, and empty tokens and verify behavior matches specs
- [ ] 5.2 Update README or component docs with usage note and alternative dependency option (`jwt-decode`)
