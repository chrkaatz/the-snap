async function parseAJVErrors(validationErrors) {
  let errors = [];
  validationErrors.forEach((error) => {
    errors.push({
      param: error.params['missingProperty'],
      key: error.keyword,
      message: error.message,
      property: (function () {
        return error.keyword === 'minimum' ? error.dataPath : undefined;
      })(),
    });
  });

  return errors;
}

module.exports = {
  parseAJVErrors,
};
