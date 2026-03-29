const artworksRouter = require('express').Router()

const Artwork = require('../models/artwork')


//get all images
artworksRouter.get('/',(reqeust,response,next) => {
  Artwork.find({}).then(artwork => {
    response.json(artwork)
  })
    .catch(error => next(error))
})


//retrieve spcific image
artworksRouter.get('/:id',(request,response,next) => {
  const id = request.params.id
  Artwork.findById(id).then(note => {
    response.json(note)
  })
    .catch(error => next(error))
})

//add image
artworksRouter.post('/',(request,response,next) => {
  const body = request.body
 
  if(!body.image){
    return response.status(400).json({
      error:'missing image url'
    })
  }
  

  const artwork = new Artwork ({
    title: body.title,
    image: body.image
  })

  artwork.save().then(savedArtwork => {
    response.status(201).json(savedArtwork)
  })

    .catch(error => next(error))
})



//delete image
artworksRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Artwork.findByIdAndDelete(id)
    response.status(204).end()
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



module.exports = artworksRouter