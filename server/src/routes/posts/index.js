const express = require('express')
const router = express.Router()

// Models
const {Posts} = require('../../database')

async function getAllPosts() {
    const posts = await Posts.find()
    return posts.map((post)=>{
        return {
            id: post._id,
            title: post.title,
            body: post.body
        }
    })
}

router.get('/', async (request, response) => {
    const posts = await getAllPosts()
    response.send(posts)
})

router.post('/', (request, response) => {
    try {
        const {title, body} = request.body
        if (!title) throw Error('missing title')
        if (!body) throw Error('missing body')
        const newPost = new Posts(body)
        newPost.save()
        response.send({
            timestamp: Date.now(),
            message: 'Post created',
            data: newPost
        })
    } catch(error) {
        response.status(400).send({
            timestamp: Date.now(),
            message: error.message
        })
    }
})

module.exports = router