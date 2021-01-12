const express = require('express');
const router = express.Router();
const Ajv = require('ajv').default;

const ajv = new Ajv({ allErrors: true, async: true });
require('ajv-formats')(ajv);

const { parseAJVErrors, deviceViewport } = require('./util');
const { screenshotSchema, pdfSchema } = require('./schema');
const { shot, pdf } = require('./capture.js');

/**
 * @api {get} /shot get a screenshot of a page
 * @apiName TakeScreenshot
 * @apiGroup Screenshots
 * @apiVersion 1.0.0
 *
 * @apiParam {String} url a url to be looked up
 * @apiParam {String} [selector] take a screenshot of a given selector - encoded URI component
 *
 * @apiSuccess {File} image the generated screenshot
 * @apiError {Object} Errors returned errors
 */
router.get('/shot', async (req, res) => {
  const validate = ajv.compile(screenshotSchema);
  const result = await validate(req.query);
  if (!result) {
    const errors = await parseAJVErrors(validate.errors);
    return res.status(400).json({ errors });
  }
  const { url, selector } = req.query;
  let decodedSelector = selector ? decodeURIComponent(selector) : false;
  if (selector) {
  }
  const buffer = await shot({ url, selector: decodedSelector });
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

/**
 * @api {get} /pdf obtain a pdf of a page
 * @apiName TakeScreenshot
 * @apiGroup PDF
 * @apiVersion 1.0.0
 *
 * @apiParam {String} url a url to be looked up
 * @apiParam {Number} [w] width of the viewport
 * @apiParam {Number} [h] height of the viewport
 * @apiParam {String} [d] device to use for the viewport - overwrites other v/h parameters
 *
 * @apiSuccess {File} pdf the generated pdf
 * @apiError {Object} Errors returned errors
 */
router.get('/pdf', async (req, res) => {
  const validate = ajv.compile(pdfSchema);
  const result = await validate(req.query);
  if (!result) {
    const errors = await parseAJVErrors(validate.errors);
    return res.status(400).json({ errors });
  }
  const { url, d = false } = req.query;
  let { w = false, h = false } = req.query;
  if (d) {
    const resolution = deviceViewport(d);
    if (resolution) {
      w = resolution.w;
      h = resolution.h;
    }
  }
  const generatedPDF = await pdf({ url, w, h });
  if (generatedPDF) {
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': generatedPDF.length,
    });

    res.end(generatedPDF);
  } else {
    res.status(400).json({ message: 'Bad Request' });
  }
});

module.exports = router;
