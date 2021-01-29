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
app.use(cors()); // enable cors

// serve the documentation
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/docs', express.static(path.join(__dirname, '..', 'doc')));
// Secure our Express server with helmet
app.use(helmet());
// Add a health check, that it could be monitored
app.get('/.well-known/health', (req, res) =>
  res.status(200).json({ status: 'healthy' }),
);
// Enable rate-limiting
app.use(rateLimit());

// hook up our API
app.use('/api', api);

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`Running at http://localhost:${port}`);
});
