const assert = require('node:assert')
const {test, after,beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Artwork = require('../models/artwork')
const api = supertest(app)

const initialArtworks = [
    {
        title: "Cat",
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/250px-Cat_August_2010-4.jpg'
    },
    {
        title: "Dog",
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Dog_morphological_variation.png'
    }
]


beforeEach(async () => {
    await Artwork.deleteMany({})
    let artworkObject = new Artwork(initialArtworks[0])
    await artworkObject.save()
    artworkObject = new Artwork(initialArtworks[1])
    await artworkObject.save()

})

test('artworks are returned as JSON', async () => {
    await api
        .get('/api/artwork')
        .expect(200)
        .expect('Content-Type' , /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/artwork')

    assert.strictEqual(response.body.length,initialArtworks.length)
})

test('a specific note is within the returned notes' , async () => {
    const response = await api.get('/api/artwork')

    const titles = response.body.map(e => e.title)

    assert.strictEqual(titles.includes('Dog'),true)
})

after(async () => {
    await mongoose.connection.close()
})