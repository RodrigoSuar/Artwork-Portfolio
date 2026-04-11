const artworksRouter = require("express").Router();
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Artwork = require("../models/artwork");
//const multer = require("multer")
const config = require("../utils/config");
const s3 = require("../services/s3");
//const upload = multer({storage: multer.memoryStorage()})
const jwt = require("jsonwebtoken");

//get all images
artworksRouter.get("/", async (request, response, next) => {
  try {
    const artwork = await Artwork.find({});
    response.json(artwork);
  } catch (error) {
    next(error);
  }
});

//retrieve spcific image
artworksRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const artwork = await Artwork.findById(id);
    response.json(artwork);
  } catch (error) {
    next(error);
  }
});


module.exports = artworksRouter;