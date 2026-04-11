const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const artworksRouter = require("./controller/artworks");
const adminRouter = require("./controller/admin");
const loginRouter = require("./controller/login");


const app = express();

logger.info("connecting to" , config.MONGODB_URI);



async function connectToMongoose() {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
   
}




try{
    connectToMongoose();

} catch (error){
    logger.error(error);
}






app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);


app.use("/api/artwork",artworksRouter);
app.use("/api/admin",adminRouter);
app.use("/api/login",loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;