
/**
 * Given a raw string and an object of values,
 * replace the matched key with the provided value 
 * @param  {string} rawString
 * @param  {object} values
 * @returns {string}
 */
function interpolateStringKey (rawString: string, values: object): string {
    let url = rawString;

    const keys = Object.keys(values);

    for (const key of keys) {
        url = url.replace(`{${key}}`, (values as any)[key]);
    }

    return url;
}

export {
    interpolateStringKey
}
