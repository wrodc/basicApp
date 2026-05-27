## Why

We need a small developer utility on the app's home page to decode JSON Web Tokens (JWTs) quickly. Currently there is no in-app tool to inspect token payloads, which slows debugging and development when working with auth flows or testing third-party tokens.

## What Changes

- Add a new React component `JwtDecode` that provides two textareas: one to paste a JWT and another that shows the decoded header and payload (pretty-printed). No external network calls; decoding occurs entirely in the browser.
- Place the `JwtDecode` component on the application's main page (src/App.jsx) under the hero section.
- Add minimal UI styling and accessibility features (labels, keyboard focus, clear error messages). No changes to server-side code.

## Capabilities

### New Capabilities
- `jwt-decode-component`: A small interactive utility component that accepts a JWT string and displays decoded JSON for header and payload. It must handle malformed tokens gracefully and not attempt signature verification.

### Modified Capabilities
- None

## Impact

- Code: Add new component file `src/components/JwtDecode.jsx` and update `src/App.jsx` to render it.
- UI: Add small stylesheet or scoped CSS module `src/components/JwtDecode.css` (or inline styles) to match existing app styling.
- Dependencies: Prefer implementing decoding with a tiny, dependency-free parser using base64 decode and JSON.parse. If a library is preferred, add `jwt-decode` to dependencies and document in tasks. No heavy new deps preferred.
- Security: This feature must not perform signature validation and must warn users that decoded tokens are not verified. It must not send tokens to any external service.
- Tests: Unit tests for the parser logic and a simple integration test for the component (optional for initial implementation).
