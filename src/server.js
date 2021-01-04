const express = require('express');
const logger = require('pino')();
const path = require('path');
const httpsRedirect = require('express-https-redirect');
const helmet = require('helmet');
const cors = require('cors');

const rateLimit = require('./middleware/rate-limit');
const api = require('./api');

const USE_HTTPS = process.env.USE_HTTPS === 'true';

const app = express();
const port = process.env.PORT || 3000;

if (USE_HTTPS) {
  app.use('/', httpsRedirect());
}
app.use(cors());
app.use('/docs', express.static(path.join(__dirname, '..', 'doc')));
app.use(helmet());
app.get('/.well-known/health', (req, res) =>
  res.status(200).json({ status: 'healthy' }),
);
app.use(rateLimit());

app.use('/api', api);

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`Running at http://localhost:${port}`);
});
