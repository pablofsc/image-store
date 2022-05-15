const express = require('express')
const mongoose = require('mongoose')
const fsextra = require('fs-extra')

const routes = require('./routes/image-store')
const Image = require('./models/image.js')

const app = express()

app.use(express.json())
app.use('/', routes)
app.use('/stored', express.static('./uploads'))


mongoose.connect(
    'mongodb://localhost:27017',
    (err) => {
        if (err) {
            return console.log("Error: ", err)
        }
        else {
            console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
        }
    }
)

const listener = app.listen(3001, () => {
    console.log('LISTENING ON PORT', listener.address().port)
})

setInterval(() => {
    console.log("Begin scheduled delete")

    Image.deleteMany({})
    fsextra.emptyDirSync('./uploads')

    console.log("Scheduled delete finished")
}, 300000)