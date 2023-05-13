import { strict as assert } from 'node:assert'

type EnvKey = keyof typeof process.env

export const getenv = (key: EnvKey, fallback?: string): string => {
    const value = process.env[key]
    if (typeof fallback !== 'undefined') {
        return value ?? fallback
    }
    assert(typeof value === 'string', `${key} env var not set`)
    return value
}
