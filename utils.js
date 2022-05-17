const multer = require('multer')
const path = require('path')
const fsextra = require('fs-extra')

storedImages = []

const deleteFile = (fileName) => {
    console.log(`Deleting ${fileName}`)

    storedImages.shift()
    fsextra.removeSync('./uploads/' + fileName)

    console.log('Now currently storing: ' + storedImages)
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

const generateHtmlList = (array) => {
    if (array.length > 0) {
        let response = '<ul>'
        for (let i = 0; i <= array.length - 1; i++) {
            let date = new Date(parseInt(path.parse(array[i]).name, 16))
            let now = new Date()
            let expires = new Date(Math.abs(date.getTime() + 300000))

            let remainingTime = Math.abs(expires - now)

            response += `<li>${array[i].slice(0, 7)}****${path.extname(array[i])} has ${Math.floor(remainingTime / 1000 / 60)} minutes and ${Math.floor(remainingTime / 1000) - Math.floor(remainingTime / 1000 / 60) * 60} seconds remaining.</li>`
        }
        response += '</ul>'

        return response
    }
    else {
        return 'nothing!'
    }
}

module.exports = { deleteFile, storage, receiveFile, generateHtmlList }