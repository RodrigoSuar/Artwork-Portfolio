const assert = require("node:assert");
const { test, before, beforeEach, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;
let app;
let api;
let Artwork;

const initialArtworks = [
    {
        title: "Cat",
        key: "artworks/cat.jpg",
    },
    {
        title: "Dog",
        key: "artworks/dog.jpg",
    },
];

before(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.TEST_MONGODB_URI = mongod.getUri();

    app = require("../app");
    Artwork = require("../models/artwork");
    api = supertest(app);

    await mongoose.connection.asPromise();
});

beforeEach(async () => {
    await Artwork.deleteMany({});
    await Artwork.insertMany(initialArtworks);
});

test("artworks are returned as JSON", async () => {
    await api
        .get("/api/artwork")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all artworks are returned", async () => {
    const response = await api.get("/api/artwork");

    assert.strictEqual(response.body.artworks.length, initialArtworks.length);
    assert.strictEqual(response.body.total, initialArtworks.length);
});

test("a specific artwork is within the returned artworks", async () => {
    const response = await api.get("/api/artwork");

    const titles = response.body.artworks.map((a) => a.title);

    assert.strictEqual(titles.includes("Dog"), true);
});

after(async () => {
    await mongoose.connection.close();
    await mongod.stop();
});
