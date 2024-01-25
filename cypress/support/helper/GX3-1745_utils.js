export function getRealValue(value) {
    const valores = value.split(':');
    const realValue = valores[ 1 ].trim();
    return realValue
}