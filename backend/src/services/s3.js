const { S3Client } = require("@aws-sdk/client-s3");
const config = require("../utils/config.js");


//for development
// const s3 = new S3Client({
//     region: config.AWS_REGION,
//     credentials: {
//         accessKeyId: config.AWS_ACCESS_KEY,
//         secretAccessKey: config.AWS_SECRET_KEY,
//     },
// });


//for production
const s3 = new S3Client({
    region: config.AWS_REGION,
    
});


module.exports = s3;