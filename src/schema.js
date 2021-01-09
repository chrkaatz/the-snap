const { devices } = require('./util');

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

const pdfSchema = {
  title: 'PDF page print',
  description: 'Take pdf of a page',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      pattern: '^(https?|http?)://',
      minLength: 1,
      maxLength: 255,
    },
    w: {
      type: 'integer',
      minimum: 1,
      maximum: 12288,
    },
    h: {
      type: 'integer',
      minimum: 1,
      maximum: 12288,
    },
    d: {
      type: 'string',
      enum: Object.keys(devices),
    },
  },
  required: ['url'],
};

module.exports = { screenshotSchema, pdfSchema };
