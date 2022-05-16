const multer = require('multer')
const path = require('path')
const fsextra = require('fs-extra')

storedImages = []

const deleteFile = (fileName) => {
    console.log(`Deleting ${fileName}`)

    storedImages.shift()
    fsextra.removeSync('./uploads/' + fileName)

    console.log(storedImages)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now().toString(16) + path.extname(file.originalname)

        console.log(`Storing ${fileName}`)
        storedImages.push(fileName)

        cb(null, fileName);

        setTimeout(() => deleteFile(fileName), 300000)
    }
})

const receiveFile = multer({ storage: storage }).single('image')

const respond = (req, res) => {
    res.json({
        url: storedImages[storedImages.length - 1]
    })
}

module.exports = { storedImages, receiveFile, respond }