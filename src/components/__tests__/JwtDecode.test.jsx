import { describe, it, expect } from 'vitest'
import { parseJwt } from '../JwtDecode'

describe('parseJwt', () => {
  it('parses a valid token', () => {
    const header = { alg: 'HS256' }
    const payload = { sub: '123', name: 'test' }
    const enc = (obj) =>
      btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    const token = `${enc(header)}.${enc(payload)}.signature`
    const result = parseJwt(token)
    expect(result.header).toEqual(header)
    expect(result.payload).toEqual(payload)
  })

  it('throws on empty token', () => {
    expect(() => parseJwt('')).toThrow()
  })

  it('throws on malformed token with no dots', () => {
    expect(() => parseJwt('not-a-token')).toThrow()
  })

  it('throws on invalid base64', () => {
    const token = '@@@.@@@.sig'
    expect(() => parseJwt(token)).toThrow()
  })
})
