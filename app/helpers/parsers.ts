export function parseMonetaryString(value: string): number {
    return parseFloat(value.replaceAll('.', '').replace(',', '.'))
}

export function formatToMonetaryString(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}


export function maskMonetaryString(value: number): string {
    return formatToMonetaryString(value).replace(/\d/g, '*')
  }
