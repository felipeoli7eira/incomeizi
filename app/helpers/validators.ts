export function isZeroStringValue(value: string): boolean {
    return value === '0,00'
}

export function isZeroNumberValue(value: number): boolean {
    return isNaN(value) || value <= 0
}
