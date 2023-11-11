const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// Models
const Posts = require('../../database/models/Posts')

function filterPostCard(post) {
    return {
        id: post._id,
        title: post.title,
    }
}

function filterPostPage(post) {
    return {
        id: post._id,
        title: post.title,
        body: post.body
    }
}

function createResponse(msg, data) {
    return {
        timestamp: Date.now(),
        message: msg,
        data
    }
}
router.get('/', async (request, response) => {
    const posts = await Posts.find()
    response.send(posts.map(filterPostCard))
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const isValid = mongoose.isValidObjectId(id)
        if (!isValid) throw Error(`Id ${id} not valid :(`)
        const post = await Posts.findOne({ _id: id })
        if (!post) throw Error(`Post with id ${id} not found :(`)
        response.send({
            timestamp: Date.now(),
            message: "Gotcha",
            data: filterPostPage(post)
        })
    } catch (error) {
        response.status(404).send(createResponse(error.message, []))
    }
})

router.post('/', async (request, response) => {
    try {
        const { title, body } = request.body
        if (!title) throw Error('missing title')
        if (!body) throw Error('missing body')
        const newPost = await Posts.create(request.body)
        response.send(createResponse('Post created', newPost))
    } catch (error) {
        response.status(400).send(createResponse(error.message, []))
    }
})

router.patch('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const updatedPost = await Posts.updateOne({ _id: id }, { ...request.body })
        if (!updatedPost.matchedCount) throw Error("Invalid request")
        response.send(createResponse(`Post updated (id: ${id})`, []))

    } catch (error) {
        response.status(400).send(createResponse(error.message, []))
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const deleteResponse = await Posts.deleteOne({ _id: id })
        const validation = deleteResponse.deletedCount === 0 && deleteResponse.acknowledged
        if (validation) throw Error(`Post with id ${id} not found :(`)
        response.send({
            timestamp: Date.now(),
            message: 'Post deleted',
            data: []
        })
    } catch (error) {
        response.status(404).send(createResponse(error.message, []))
    }
})

module.exports = router