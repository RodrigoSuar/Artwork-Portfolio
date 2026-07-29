const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    minLength: 10,
  },
  year: String,

  key: {
    type: String,
    required: true,
  },

  width: Number,
  height: Number,

  featured: {
    type: Boolean,
    default: false,
  },
});

artworkSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Artwork", artworkSchema);