const artworksRouter = require("express").Router();
const Artwork = require("../models/artwork");
//const multer = require("multer")

//const upload = multer({storage: multer.memoryStorage()})


//get all images
artworksRouter.get("/", async (request, response, next) => {
  try {
    const artwork = await Artwork.find({});
    response.json(artwork);
  } catch (error) {
    next(error);
  }
});

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
    const total = await Artwork.countDocuments({});
    response.json({ artworks: artwork, total });
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