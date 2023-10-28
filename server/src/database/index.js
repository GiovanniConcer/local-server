const mongoose = require('mongoose')
const Posts = require('./models/Posts')

// Mongoose connections
mongoose.connect('mongodb://127.0.0.1:27017/blog')

module.exports = {Posts}