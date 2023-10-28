const express = require('express')
const cors = require('cors')
const posts = require('./routes/posts')

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