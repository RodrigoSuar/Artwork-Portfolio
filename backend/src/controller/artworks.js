const artworksRouter = require("express").Router();
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const Artwork = require("../models/artwork");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../services/s3");
const config  = require("../utils/config");
const validate = require("../utils/validate");
const { listArtworkQuery } = require("../schemas/artwork");
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

artworksRouter.get("/", validate(listArtworkQuery, "query"), async (request,response , next) => {
  try {
    const { page, limit, featured } = request.validated.query;
    const skip = (page - 1) * limit;

    const filter = {};
    if (featured !== undefined) {
      filter.featured = featured;
    }

    const artwork = await Artwork.find(filter)
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

    const total = await Artwork.countDocuments(filter);
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