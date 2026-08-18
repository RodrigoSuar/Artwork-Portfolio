const logger = require("./logger");

require("dotenv").config({
    path: process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development",
});

const PORT = process.env.PORT || 3001;

const MONGODB_URI =
    process.env.MONGODB_URI === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI;

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_REGION = process.env.AWS_REGION;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_BUCKET_URL = process.env.S3_BUCKET_URL;

const SECRET = process.env.SECRET;

if(!SECRET){
    logger.error("FATAL ERROR: SECRET environment variable is not defined");
    process.exit(1);
}

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (process.env.NODE_ENV !== "test" && (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN)) {
    logger.error("FATAL ERROR: UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN environment variables are not defined");
    process.exit(1);
}

module.exports = {
    MONGODB_URI,
    PORT,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
    AWS_REGION,
    S3_BUCKET_NAME,
    S3_BUCKET_URL,
    SECRET,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
};