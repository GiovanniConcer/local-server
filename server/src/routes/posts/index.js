const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
    response.send("post funfou")
})

module.exports = router