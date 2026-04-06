const artworksRouter = require('express').Router()

const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner')
const Artwork = require('../models/artwork')
const multer = require('multer')
const config = require('../utils/config')
const s3 = require('../services/s3')
const upload = multer({storage: multer.memoryStorage()})


//get all images
// 
artworksRouter.get('/', async (request,response,next) => {
  try {
    const artwork = await Artwork.find({})
    response.json(artwork)
  } catch (error) {
    next(error)
  }
})


//retrieve spcific image
artworksRouter.get('/:id', async (request,response,next) => {
  try {
    const id = request.params.id
    const artwork = await Artwork.findById(id)
    response.json(artwork)
  } catch (error) {
    next(error)
  }
})

//add image
artworksRouter.post('/', async (request,response,next) => {
  try {
    const body = request.body
   
    if(!body.image || !body.title){
      return response.status(400).json({
        error:'missing required fields'
      })
    }
    

    const artwork = new Artwork ({
      title: body.title,
      image: body.image,
      description: body.description,
      key: body.key
    })

    const savedArtwork = await artwork.save()
    response.status(201).json(savedArtwork)
  } catch (error) {
    next(error)
  }
})



//delete image
artworksRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const artwork = await Artwork.findById(id)

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' })
    }

    const key = artwork.key

    // delete from S3
    if (key) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: config.S3_BUCKET_NAME,
          Key: key,
        })
      )
    }

    // delete from DB
    await Artwork.findByIdAndDelete(id)

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})



//update image 
//currenlty only updated image title
artworksRouter.put('/:id', async (request,response,next) =>{
  const {title} = request.body
  const id = request.params.id

  try {
    const art = await Artwork.findById(id)

    if(!art){
      return response.status(404).end()
      
    }

    art.title = title

    const updatedArtwork = await art.save()

    return response.json(updatedArtwork)
    

  } catch (error){
    next(error)
  }

})



//route for adding image to S3
artworksRouter.post("/upload",upload.single("image"),async(req,res) => {
  try {
    const file = req.file

    if(!file) return res.status(400).json({error: "No file uploaded"})
 
    const fileName = `image/${Date.now()}-${file.originalname}`


    const command = new PutObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key:fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    })

    await s3.send(command)

    const imageURL = `https://artwork-portfolio-379334940569-us-east-1-an.s3.amazonaws.com/${fileName}`

    res.json({imageURL})

    } catch (error){
      console.error(error)
      res.status(500).json({error: "upload failed"})
    }
})



artworksRouter.get("/upload-url/image", async (req,res) => {
  const fileType = req.query.type;

  console.log("File type from query:", fileType);

  // Extract extension from type
  const extension = fileType.split("/")[1]; // "png", "jpeg"

  const fileName = `image/${Date.now()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType
  })

  const uploadURL = await getSignedUrl(s3,command, {
    expiresIn: 60
  })

  const fileUrl = `${config.S3_BUCKET_URL}/${fileName}`

  res.json({
    uploadURL,
    fileUrl,
    key: fileName
  })

})

// artworksRouter.delete("/s3/image", async (req,res) => {
//   const {key} = req.body

//   await s3.send( new DeleteObjectCommand({
//     Bucket: config.S3_BUCKET_NAME,
//     Key: key
//   }))

//   res.send({success:true})
// })






module.exports = artworksRouter