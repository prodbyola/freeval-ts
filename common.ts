const LENGTH_KEYS = ['len', 'min', 'max'] as const
type LengthKeyType = typeof LENGTH_KEYS[number]

export { LENGTH_KEYS, LengthKeyType }