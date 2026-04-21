const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const middleware = require("./utils/middleware");

const artworksRouter = require("./controller/artworks");
const adminRouter = require("./controller/admin");
const loginRouter = require("./controller/login");
const healthRouter = require("./controller/health");

const rateLimit = require("./utils/rateLimiter");

const cors = require("cors");

const app = express();

//logger.info("connecting to" , config.MONGODB_URI);



async function connectToMongoose() {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
   
}




try{
    connectToMongoose();

} catch (error){
    logger.error(error);
}







app.use(express.json());

//app.use(express.json({ limit: "10mb" }));

app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);


app.use(cors({
  origin: ["http://localhost:5173","http://127.0.0.1:5173"],
}));

app.use("/api/artwork",rateLimit.apiLimiter);
app.use("/api/artwork",artworksRouter);

app.use("/api/admin",rateLimit.adminLimiter);
app.use("/api/admin",adminRouter);

app.use("/api/login",rateLimit.authLimiter);
app.use("/api/login",loginRouter);

app.use("/api/health",rateLimit.apiLimiter);
app.use("/api/health",healthRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;