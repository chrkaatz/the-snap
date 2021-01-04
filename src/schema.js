const screenshotSchema = {
  title: 'Page screenshot',
  description: 'Take screenshot of a page',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      pattern: '^(https?|http?)://',
      minLength: 1,
      maxLength: 255,
    },
    selector: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
  },
  required: ['url'],
};

module.exports = { screenshotSchema };
