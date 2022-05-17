const express = require('express')
const cors = require('cors')
const fsextra = require('fs-extra')
const helmet = require('helmet')
const compression = require('compression')

const routes = require('./routes.js')
fsextra.emptyDirSync('./uploads')

const app = express()

app.use(helmet())
app.use(compression())

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use('/', routes)
app.use('/stored', express.static('./uploads'))

app.route('/').get((req, res) => {
    res.sendFile(process.cwd() + '/index.html')
})

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('LISTENING ON PORT', listener.address().port)
})
