const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url,{family:4})

const artworkSchema = new mongoose.Schema({
    title: String,
    image: String

})

const Artwork = mongoose.model('Artwork',artWorkSchema)

const artwork = new Artwork({
    title: "Sunset Painting",
    image: "https://picsum.photos/400?2"
})

artwork.save().then(result => {
    console.log('artwork saved')
    mongoose.connection.close()
})
