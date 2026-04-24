const artworksRouter = require("express").Router();
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const Artwork = require("../models/artwork");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../services/s3");
const config  = require("../utils/config");
//const multer = require("multer")

//const upload = multer({storage: multer.memoryStorage()})


//get all images
//this is a testing route remove for production
// artworksRouter.get("/", async (request, response, next) => {
//   try {
//     const artwork = await Artwork.find({}).lean();
//     console.log(config.S3_BUCKET_NAME);

//   const art = await Promise.all(
//     artwork.map(async (item) => {
//       const command = new GetObjectCommand({
//         Bucket: config.S3_BUCKET_NAME,
//         Key: item.key,
//       });

//       const getURL = await getSignedUrl(s3, command, {
//         expiresIn: 15,
//       });

//       return {
//         ...item,
//         image: getURL,
//       };
//     }),
//   );

    



//     response.json(art);
//   } catch (error) {
//     next(error);
//   }
// });

artworksRouter.get("/:page/:limit", async (request,response , next) => {
  try {
    const page = parseInt(request.params.page, 10) || 1;
    const l = parseInt(request.params.limit);
    const limit = l < 20 
      ? l
      : 20;
    const skip = (page-1) *limit;
    const artwork = await Artwork.find({})
    .skip(skip)
    .limit(limit);

    const art = await Promise.all(
    artwork.map(async (item) => {
      const command = new GetObjectCommand({
        Bucket: config.S3_BUCKET_NAME,
        Key: item.key,
      });

      const getURL = await getSignedUrl(s3, command, {
        expiresIn: 15,
      });

      return {
        ...item.toJSON(),
        image: getURL,
      };
    }),
  );

    const total = await Artwork.countDocuments({});
    response.json({ artworks: art, total });
  } catch (error){
    next(error);
  }
});



//retrieve spcific image
// artworksRouter.get("/:id", async (request, response, next) => {
//   try {
//     const id = request.params.id;
//     const artwork = await Artwork.findById(id);
//     response.json(artwork);
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = artworksRouter;