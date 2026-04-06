const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const artworksRouter = require('./controller/artworks')
const s3 = require('./services/s3')

const { ListBucketsCommand } = require('@aws-sdk/client-s3')


const app = express()

logger.info('connecting to' , config.MONGODB_URI)



async function connectToMongoose() {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB") 
   
}

async function connectToS3() {
    try {
        await s3.send(new ListBucketsCommand)
        logger.info("Connected to S3")
    } catch(error){
        logger.error("Connection to S3 failed")
        logger.error(error)
    }
}



try{
    connectToMongoose()

} catch (error){
    logger.error(error)
}






app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/artwork',artworksRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app