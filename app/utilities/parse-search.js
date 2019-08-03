export default search => {
  const params = location.search.slice(1).split('&');

  return params.reduce((result, param) => {
    const [key, value] = param.split('=');

    result[key] = value;

    return result;
  }, {});
};
