require('dotenv').config()

const PORT = process.env.PORT || 3001

const MONGODB_URI = process.env.MONGODB_URI === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
const AWS_REGION = process.env.AWS_REGION
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_BUCKET_URL = process.env.S3_BUCKET_URL

module.exports = {
    MONGODB_URI,
    PORT,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
    AWS_REGION,
    S3_BUCKET_NAME,
    S3_BUCKET_URL,
}