export default function accumulatePuppeteerMessages(message) {
  const consoleArgs = message._args.reduce(
    (acc, arg) => acc.concat(accumulate({}, arg._remoteObject)),
    []
  );

  console.info.apply(console.info, consoleArgs);
}

function accumulate(acc, obj) {
  if (['string', 'number'].includes(obj.type)) {
    acc = obj.value;
  } else if (obj.type == 'object') {
    if (obj.value) {
      acc[obj.name] = obj.value;
    } else if (obj.preview) {
      acc = obj.preview.properties.reduce((acc, property) => {
        acc[property.name] = accumulate(acc, property);

        return acc;
      }, {});
    } else {
      console.info('unhandled obj', obj);
    }
  }

  return acc;
}
