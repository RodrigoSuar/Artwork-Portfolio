const bcrypt = require("bcrypt");

const adminRouter = require("express").Router();

const Admin = require("../models/admin");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Artwork = require("../models/artwork");
//const multer = require("multer")
const config = require("../utils/config");
const s3 = require("../services/s3");
//const upload = multer({storage: multer.memoryStorage()})
const jwt = require("jsonwebtoken");

adminRouter.post("/register", async (req, res) => {
  
    const { username, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({
        username,
        passwordHash,
    });

    const savedAdmin = await admin.save();

    res.status(201).json(savedAdmin);
});



//add image metadata to DB
adminRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    if (!body.image || !body.title) {
      return response.status(400).json({
        error: "missing required fields",
      });
    }

    const artwork = new Artwork({
      title: body.title,
      image: body.image,
      description: body.description,
      key: body.key,
    });

    const savedArtwork = await artwork.save();
    response.status(201).json(savedArtwork);
  } catch (error) {
    next(error);
  }
});

//delete image from S3 and delete metadata from DB
adminRouter.delete("/:id", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

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
adminRouter.put("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const { title } = request.body;
    const id = request.params.id;

    const art = await Artwork.findById(id);

    if (!art) {
      return response.status(404).end();
    }

    art.title = title;

    const updatedArtwork = await art.save();

    return response.json(updatedArtwork);
  } catch (error) {
    next(error);
  }
});

//route for adding image to S3
// artworksRouter.post("/upload",upload.single("image"),async(req,res) => {
//   try {
//     const file = req.file
//     if(!file) return res.status(400).json({error: "No file uploaded"})
//     const fileName = `image/${Date.now()}-${file.originalname}`
//     const command = new PutObjectCommand({
//       Bucket: config.S3_BUCKET_NAME,
//       Key:fileName,
//       Body: file.buffer,
//       ContentType: file.mimetype
//     })
//     await s3.send(command)
//     const imageURL =
//     res.json({imageURL})
//     } catch (error){
//       console.error(error)
//       res.status(500).json({error: "upload failed"})
//     }
// })

// get signedURl so frontend can upload file to S3

adminRouter.get("/upload-url/image", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const fileType = req.query.type;

    

    // Extract extension from type
    const extension = fileType.split("/")[1]; // "png", "jpeg"

    const fileName = `image/${Date.now()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3, command, {
      expiresIn: 60,
    });

    const fileUrl = `${config.S3_BUCKET_URL}/${fileName}`;

    res.json({
      uploadURL,
      fileUrl,
      key: fileName,
    });
  } catch (error) {
    next(error);
  }
});



module.exports = adminRouter;