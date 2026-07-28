const rateLimit = require("express-rate-limit");
const logger = require("./logger");

const apiLimiter = rateLimit({
  windowMs:  60 * 1000,
  max: 25,
  handler: (req, res) => {
    logger.info("Rate limit hit:", req.ip);
    res.status(429).json({
    message: "Too many requests",
  });
  },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

module.exports = { apiLimiter,adminLimiter,authLimiter }; 