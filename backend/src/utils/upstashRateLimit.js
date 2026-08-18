const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
const logger = require("./logger");
const config = require("./config");

const redis = new Redis({
  url: config.UPSTASH_REDIS_REST_URL,
  token: config.UPSTASH_REDIS_REST_TOKEN,
});

// Keys by IP + authenticated user id (when available) so a single abusive
// user can't dodge the limit by rotating IPs, and a shared IP (NAT/proxy)
// doesn't get one user's limit applied to everyone behind it.
function buildIdentifier(req) {
  const ip = req.ip || "unknown";
  return req.user?.id ? `${ip}:${req.user.id}` : ip;
};

function createLimiter({ prefix, limit, window }) {
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `ratelimit:${prefix}`,
  });

  return async (req, res, next) => {
    const identifier = buildIdentifier(req);

    try {
      const { success, limit: max, remaining, reset } = await ratelimit.limit(identifier);

      res.setHeader("X-RateLimit-Limit", max);
      res.setHeader("X-RateLimit-Remaining", remaining);
      res.setHeader("X-RateLimit-Reset", reset);

      if (!success) {
        logger.info(`Rate limit hit [${prefix}]:`, identifier);
        return res.status(429).json({ message: "Too many requests" });
      }

      next();
    } catch (error) {
      // Fail open: a Redis outage should not take the API down.
      logger.error("Upstash rate limiter error:", error);
      next();
    }
  };
}

module.exports = {
  loginLimiter: createLimiter({ prefix: "login", limit: 5, window: "15 m" }),
  adminLimiter: createLimiter({ prefix: "admin", limit: 30, window: "15 m" }),
};
