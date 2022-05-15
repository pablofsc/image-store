const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    id: String,
    image: String,
    date: Date,
    origin: String
})

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image