## Context

The codebase is a small React + Vite application. The proposal adds a small developer utility component that decodes JWTs client-side and displays header and payload JSON. The app currently has no extra dependencies beyond React and Vite.

Constraints:
- Keep the change localized to the client (no server changes).
- Avoid adding heavyweight dependencies. Prefer a tiny, dependency-free parser.
- Follow existing app styling conventions and accessibility patterns.

## Goals / Non-Goals

**Goals:**
- Implement a usable JwtDecode React component that decodes JWTs into header and payload and presents them in read-only, pretty-printed JSON textareas.
- Gracefully handle invalid tokens and show user-friendly errors.
- Place the component on src/App.jsx below the hero section.

**Non-Goals:**
- Signature verification of tokens (this is explicitly out of scope).
- Persisting tokens or sending tokens over the network.

## Decisions

1. Decoder implementation: use an internal parser that splits the token by '.' and base64-decodes the header and payload. Rationale: avoids adding an external dependency for minimal logic. Alternative: add `jwt-decode` npm package if maintainers prefer a vetted library.

2. Component placement: create `src/components/JwtDecode.jsx` and import it in `src/App.jsx`. Rationale: keeps the component modular and reusable.

3. Styling: use a small CSS file `src/components/JwtDecode.css` with class names scoped to the component; this matches the project's CSS file organization. Alternatively use inline styles if simpler.

4. Accessibility: each textarea will have a visible label and `aria-live` polite region for error messages. Use `aria-label` and ensure keyboard focus order is natural.

5. Tests: Add unit tests for the parsing utility (if test framework is added). For initial implementation, include a small self-test function and document test suggestions in tasks.

## Risks / Trade-offs

- [Malformed input] → The parser must catch JSON parse errors and base64 padding issues. Mitigation: show clear error messages and do not crash the component.
- [Security risk] → Users might paste private tokens. Mitigation: show a visible warning that tokens are not verified and are processed locally only; do not transmit tokens.
- [Dependency choice] → Rolling our own parser may miss edge cases. Mitigation: document the behavior and offer `jwt-decode` as an alternative in the tasks document.

## Open Questions

- Do maintainers prefer adding `jwt-decode` as a dependency instead of a local parser? If so, tasks will include dependency installation.
