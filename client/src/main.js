const BASE_URL = "http://localhost:3000"

async function getPosts() {
    const response = await fetch(`${BASE_URL}/posts`)
    return await response.json()
}

function createPost(post) {
    const article = document.createElement("article")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    h2.innerText = post.title
    p.innerText = post.body
    article.appendChild(h2)
    article.appendChild(p)
    h2.classList.add("post__title")
    article.classList.add("post")
    return article
}

async function createPostList() {
    const container = document.querySelector('[data-container="posts"]')
    const postList = await getPosts()
    const posts = postList.map(createPost)
    posts.forEach(post => container.appendChild(post))
}

document.addEventListener("DOMContentLoaded", createPostList)
