const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const posts = require('./routes/posts')

// Database
mongoose.connect(`${process.env.MONGODB_URL}/blog`)

// Server config
const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Server listening ${PORT}`)
})

app.get('/', (request, response) => response.send('test'))

// Routes
app.use('/posts', posts)