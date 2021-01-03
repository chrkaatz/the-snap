const express = require('express');
const router = express.Router();
const Ajv = require('ajv').default;

const ajv = new Ajv({ allErrors: true, async: true });
require('ajv-formats')(ajv);

const { parseAJVErrors } = require('./util');
const { screenshotSchema } = require('./schema');
const { shot, pdf } = require('./shot.js');

/**
 * @api {get} /api/shot get a screenshot of a page
 * @apiName TakeScreenshot
 * @apiGroup Screenshots
 *
 */
router.get('/shot', async (req, res) => {
  const validate = ajv.compile(screenshotSchema);
  const result = await validate(req.query);
  if (!result) {
    const errors = await parseAJVErrors(validate.errors);
    return res.status(400).json({ errors });
  }
  const { url } = req.query;
  const buffer = await shot({ url });
  if (buffer) {
    const img = Buffer.from(buffer, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });

    res.end(img);
  } else {
    res.status(400).json({ message: 'Bad Request' });
  }
});

module.exports = router;
