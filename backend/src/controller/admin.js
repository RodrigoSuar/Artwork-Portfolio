const adminRouter = require("express").Router();
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Artwork = require("../models/artwork");
//const multer = require("multer")
const config = require("../utils/config");
const s3 = require("../services/s3");
//const upload = multer({storage: multer.memoryStorage()})
const authMiddleware = require("../utils/authMiddleware");
const { adminLimiter } = require("../utils/upstashRateLimit");
const validate = require("../utils/validate");
const { objectIdParam } = require("../schemas/common");
const {
  createArtworkBody,
  updateArtworkBody,
  uploadUrlQuery,
} = require("../schemas/artwork");

adminRouter.use(authMiddleware);
// Runs after authMiddleware so requests are keyed by IP + admin user id.
adminRouter.use(adminLimiter);

// adminRouter.post("/register", async (req, res) => {
  
//     const { username, password } = req.body;

//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const admin = new Admin({
//         username,
//         passwordHash,
//     });

//     const savedAdmin = await admin.save();

//     res.status(201).json(savedAdmin);
// });



//add image metadata to DB
adminRouter.post("/", validate(createArtworkBody, "body"), async (request, response,next) => {
  try {
    const body = request.body;

    const artwork = new Artwork({
      title: body.title,
      description: body.description,
      key: body.key,
      width: body.width,
      height: body.height,
      featured: body.featured,
    });

    const savedArtwork = await artwork.save();
    response.status(201).json(savedArtwork);
    
  } catch (error){
    next(error);
  }


});

//delete image from S3 and delete metadata from DB
adminRouter.delete("/:id", validate(objectIdParam, "params"), async (req, res, next) => {
  try {
    const { id } = req.params;

    const artwork = await Artwork.findById(id);

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    const key = artwork.key;

    // delete from S3
    if (key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: config.S3_BUCKET_NAME,
          Key: key,
        }),
      );
    }

    // delete from DB
    await Artwork.findByIdAndDelete(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

//update image
//currenlty only updated image title
adminRouter.put(
  "/:id",
  validate(objectIdParam, "params"),
  validate(updateArtworkBody, "body"),
  async (request, response, next) => {
  try {
    const { title, width, height, featured } = request.body;
    const id = request.params.id;

    const art = await Artwork.findById(id);

    if (!art) {
      return response.status(404).end();
    }

    if (title !== undefined) art.title = title;
    if (width !== undefined) art.width = width;
    if (height !== undefined) art.height = height;
    if (featured !== undefined) art.featured = featured;

    const updatedArtwork = await art.save();

    return response.json(updatedArtwork);
  } catch (error) {
    next(error);
  }
  },
);



// get signedURl so frontend can upload file to S3
adminRouter.get("/upload-url/image", validate(uploadUrlQuery, "query"), async (req, res, next) => {
  try {
    const fileType = req.validated.query.type;

    // Extract extension from type
    const extension = fileType.split("/")[1]; // "png", "jpeg"

    // Sanitize extension to prevent path traversal
    const sanitizedExtension = extension.replace(/[^a-zA-Z0-9]/g, "");

    const fileName = `image/${Date.now()}.${sanitizedExtension}`;

    const command = new PutObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3, command, {
      expiresIn: 30,
    });

    

    res.json({
      uploadURL,
      key: fileName,
    });
  } catch (error) {
    next(error);
  }
});


adminRouter.get("/test", async (request,response,next) => {
  try {
    response.status(200).json({ message: "test complete" });
  } catch (error) {
    next(error);
  }

});





module.exports = adminRouter;