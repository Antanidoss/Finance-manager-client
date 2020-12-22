export const maxLengthCreator = (maxLength) => (value) => {
    debugger
    if (value.length > maxLength) return `Максимальное количесво символов в поле должно быть ${maxLength}`;
    return undefined;
}

export const minLengthCreator = (minLength) => (value) => {
    if(value.length < minLength) return `Минималбное количесво символов в поле должно быть ${minLength}`
    return undefined
}

export const required = (value) => {
    debugger
    if (value) return undefined;
    return "Поле, обязательное для заполнения";
}
