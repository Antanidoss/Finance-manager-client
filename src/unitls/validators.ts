export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) return `Максимальное количесво символов в поле должно быть ${maxLength}`;
    return undefined;
}

export const minLengthCreator = (minLength: number) => (value: string) => {
    if(value.length < minLength) return `Минималбное количесво символов в поле должно быть ${minLength}`
    return undefined
}

export const required = (value: string) => {
    if (value) return undefined;
    return "Поле, обязательное для заполнения";
}

export const range = (minRange: number, maxRange: number) => (value: number) => {
    if (value >= minRange && value <= maxRange){
        return undefined;
    }
    return `Поле, у которого диапазон значения от ${minRange} до ${maxRange}`;
}