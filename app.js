const cors = require('cors')
const express = require('express')
const connect = require('./schemas')
const router = require('./routes')

require('dotenv').config();

connect()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})