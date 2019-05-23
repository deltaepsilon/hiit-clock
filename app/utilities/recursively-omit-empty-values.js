import omitEmptyValues from './omit-empty-values';

export default function recursivelyOmitEmptyValues(obj) {
  const cleanedObj = omitEmptyValues(obj);

  for (const key in obj) {
    const child = obj[key];
    const childIsObject = typeof child == 'object';

    if (childIsObject) {
      cleanedObj[key] = recursivelyOmitEmptyValues(child);
    }
  }

  return cleanedObj;
}
