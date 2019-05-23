export default function omitEmptyValues(objOrArray) {
  const isArray = Array.isArray(objOrArray);

  return isArray ? cleanArray(objOrArray) : cleanObj(objOrArray);
}

function cleanArray(array) {
  return array.filter(value => !getIsEmpty(value));
}

function cleanObj(obj) {
  const result = {};

  for (let key in obj) {
    const value = obj[key];
    const isEmpty = getIsEmpty(value);

    if (!isEmpty) {
      result[key] = value;
    }
  }

  return result;
}

function getIsEmpty(value) {
  return typeof value != 'boolean' && typeof value != 'number' && !value;
}
