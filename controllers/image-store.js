const multer = require('multer')
const Image = require('../models/image.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const uploadFile = multer({ storage: storage }).single('image')

const upload = (req, res, next) => {
    Image.findOne({ name: req.body.name }, (err, data) => {
        if (!data) { // image not in database
            const createdImage = new Image({
                image: req.file.path,
                date: new Date('December 17, 1995 03:24:00'),
                origin: '999.999.999.999'
            })

            createdImage.save((err, data) => {
                if (err) {
                    return res.json({ Error: err })
                }
                else {
                    return res.json(data);
                }
            })
        }
        else { // image is in database
            if (err) {
                return res.json(`Something went wrong, please try again. ${err}`)
            }
            else {
                return res.json({ message: "Tea already exists" })
            }
        }
    })
}

const retrieve = (req, res, next) => {

}

const retrieveAll = (req, res, next) => {
    Image.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        else {
            return res.json(data);
        }
    })
}

const removeAll = (req, res, next) => {
    Image.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "Complete delete failed" });
        }
        else {
            return res.json({ message: "Complete delete successful" });
        }
    })
}

module.exports = { uploadFile, upload, retrieve, retrieveAll, removeAll }