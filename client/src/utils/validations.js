const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z0-9-]+$/;
const NUMERIC_REGEX = /^[0-9]+$/;


export const isAlphaNumeric = (value)=>{
    return ALPHA_NUMERIC_DASH_REGEX.test(value);
}

export const isNumeric = (value)=>{
    return NUMERIC_REGEX.test(value);
}