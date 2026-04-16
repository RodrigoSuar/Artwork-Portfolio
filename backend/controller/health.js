const { default: mongoose } = require("mongoose");

const healthRouter = require("express").Router();

const s3 = require("../services/s3");
const { ListBucketsCommand } = require("@aws-sdk/client-s3");

healthRouter.get("/",(req,res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp:Date.now().toString(),
    });
});


healthRouter.get("/db",async (req,res) => {
    try{

        await mongoose.connection.db.admin().ping();

        res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        db: "connected",
    });
    } catch (error){
        res.status(500).json({
            status: "error",
            db: "disconnected",
        });
    }
    
});


healthRouter.get("/ready", async(req,res) => {
    const checks = {
        mongodb: "unknown",
        s3: "unknown",
    };

    let isHealthy = true;

    try{
        if(mongoose.connection.readyState === 1){
            checks.mongodb = "ok";
        }else{
            checks.mongodb = "down";
            isHealthy = false;
        }
    } catch (error){
        checks.mongodb = "down";
        isHealthy = false;
    }


    //s3 check

    try{
        await s3.send(new ListBucketsCommand({}));
        checks.s3 = "ok";
    } catch(error){
        checks.s3 = "down";
        isHealthy = false;
    }

    const status = isHealthy ? 200 : 503;

    res.status(status).json({
        status: isHealthy ? "ok" : "unhealthy",
        checks,
        uptime : process.uptime(),
        timestamp : new Date().toString(),
    });
});

module.exports = healthRouter;