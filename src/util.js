const devices = {
  iphone12: { w: 1170, height: 2532 },
  iphoneSE: { w: 640, height: 1136 },
  s10: { w: 1440, height: 3040 },
  pixel5: { w: 1080, height: 2340 },
};

async function parseAJVErrors(validationErrors) {
  let errors = [];
  validationErrors.forEach((error) => {
    console.log(error);
    const err = {
      param: error.params['missingProperty'],
      key: error.keyword,
      message: error.message,
      property: (function () {
        return error.keyword === 'minimum' ? error.dataPath : undefined;
      })(),
    };
    if (error.params['allowedValues']) {
      err.allowedValues = error.params['allowedValues'];
    }
    errors.push(err);
  });

  return errors;
}

const deviceViewport = (device) => {
  return devices[device] || false;
};

module.exports = {
  parseAJVErrors,
  deviceViewport,
  devices,
};
