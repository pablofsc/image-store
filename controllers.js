const utils = require('./utils.js')

const respond = (req, res) => {
    res.json({
        url: '/stored/' + storedImages[storedImages.length - 1]
    })
}

const index = (req, res) => {
    let styles = `
    <style> 
        * {
            font-family: Tahoma, sans-serif
        }
    </style>
    `

    let list = `Currently storing nothing.`

    if (storedImages.length > 0) {
        list = `
        Currently storing ${storedImages.length} image${storedImages.length > 1 ? `s` : ``}:
        ${utils.generateHtmlList(storedImages)}
        `
    }

    res.send(styles + `<h1>Seems to be working.</h1>` + list)
}

module.exports = { respond, index }