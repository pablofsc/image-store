const express = require('express')
const cors = require('cors')
const fsextra = require('fs-extra')

const routes = require('./routes.js')
fsextra.emptyDirSync('./uploads')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use('/', routes)
app.use('/stored', express.static('./uploads'))

const listener = app.listen(3001, () => {
    console.log('LISTENING ON PORT', listener.address().port)
})
