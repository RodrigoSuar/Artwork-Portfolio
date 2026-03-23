require('dotenv').config()
const express = require('express')
const Artwork = require('./models/artwork')
const artwork = require('./models/artwork')
const app = express()
app.use(express.static('dist'))
app.use(express.json())



const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)



//retrevie all images
app.get('/api/artwork',(reqeust,response) => {
    Artwork.find({}).then(artwork => {
      response.json(artwork)
    })
})


//retrieve spcific image
app.get('/api/artwork/:id',(request,response) => {
    const id = request.params.id
    Artwork.findById(id).then(note => {
      response.json(note)
    })
})

//add image
app.post('/api/artwork',(request,response) => {
    const body = request.body
    console.log(body)
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
      response.json(savedArtwork)
    })
})

//delete image
app.delete('/api/artwork/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    await artwork.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

//update image 
//currenlty only updated image title
app.put('/api/artwork/:id', async (request,response,next) =>{
  const {title} = request.body
  const id = request.params.id

  try {
    const art = await artwork.findById(id)

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



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT ||  3001 

app.listen(PORT, () =>{
    console.log(`Running on port: ${PORT}`)

})
