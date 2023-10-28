const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating PostSchema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

const Posts = mongoose.model('Posts', postSchema)
module.exports = Posts