const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const artworksRouter = require("./controller/artworks");
const adminRouter = require("./controller/admin");
const loginRouter = require("./controller/login");
const healthRouter = require("./controller/health");
const rateLimit = require("./utils/rateLimiter");
const upstashRateLimit = require("./utils/upstashRateLimit");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Needed so req.ip reflects the real client IP (not the reverse proxy's)
// when running behind a proxy/load balancer, e.g. in the Docker setup.
app.set("trust proxy", 1);



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







app.use(helmet());
app.use(express.json());

//app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);


app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["http://localhost:3000", "http://frontend"]  // Docker network
    : ["http://localhost:5173","http://127.0.0.1:5173"],
    credentials: true,
}));

app.use("/api/artwork",rateLimit.apiLimiter);
app.use("/api/artwork",artworksRouter);

app.use("/api/admin",adminRouter);

app.use("/api/login",upstashRateLimit.loginLimiter);
app.use("/api/login",loginRouter);

app.use("/api/health",rateLimit.apiLimiter);
app.use("/api/health",healthRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;