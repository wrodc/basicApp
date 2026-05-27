import { useState } from 'react'
import './JwtDecode.css'

// Minimal JWT parser: splits on '.', decodes base64url, and JSON.parse's the parts.
function base64UrlDecode(input) {
  // base64url -> base64
  let str = input.replace(/-/g, '+').replace(/_/g, '/')
  // pad with '='
  while (str.length % 4) str += '='
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
  } catch (e) {
    throw new Error('Invalid base64 encoding')
  }
}

export function parseJwt(token) {
  if (!token) throw new Error('Empty token')
  const parts = token.split('.')
  if (parts.length < 2) throw new Error('Token must have at least header and payload')
  const headerB64 = parts[0]
  const payloadB64 = parts[1]
  try {
    const headerJson = base64UrlDecode(headerB64)
    const payloadJson = base64UrlDecode(payloadB64)
    return {
      header: JSON.parse(headerJson),
      payload: JSON.parse(payloadJson),
    }
  } catch (err) {
    // Normalize error messages for the UI
    throw new Error(err.message || 'Failed to parse token')
  }
}

export default function JwtDecode() {
  const [token, setToken] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [payloadText, setPayloadText] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    const v = e.target.value.trim()
    setToken(v)
    setError('')
    if (!v) {
      setHeaderText('')
      setPayloadText('')
      return
    }
    try {
      const { header, payload } = parseJwt(v)
      setHeaderText(JSON.stringify(header, null, 2))
      setPayloadText(JSON.stringify(payload, null, 2))
    } catch (err) {
      setHeaderText('')
      setPayloadText('')
      setError(err.message)
    }
  }

  return (
    <section className="jwt-decode">
      <h2>JWT Decoder</h2>
      <p className="jwt-warning">Tokens are decoded locally and signature verification is NOT performed.</p>

      <label htmlFor="jwt-input">Paste JWT</label>
      <textarea
        id="jwt-input"
        className="jwt-input"
        value={token}
        onChange={handleChange}
        placeholder="Paste JWT here"
        rows={3}
      />

      <div className="jwt-outputs">
        <div className="jwt-output">
          <label htmlFor="jwt-header">Header</label>
          <textarea id="jwt-header" readOnly value={headerText} rows={8} />
        </div>
        <div className="jwt-output">
          <label htmlFor="jwt-payload">Payload</label>
          <textarea id="jwt-payload" readOnly value={payloadText} rows={8} />
        </div>
      </div>

      <div className="jwt-error" role="status" aria-live="polite">
        {error && <span className="error-text">{error}</span>}
      </div>
    </section>
  )
}
