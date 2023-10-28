const express = require('express')
const posts = require('./routes/posts')

// Server config
const app = express()

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Server listening ${PORT}`)
})

app.get('/', (request, response) => response.send('test'))

// Routes
app.use('/posts', posts)