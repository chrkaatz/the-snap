const rateLimit = require('express-rate-limit');
const limiter = () =>
  rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT || 20, // limit each IP to 100 requests per windowMs
  });

module.exports = limiter;
