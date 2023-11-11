const BASE_URL = "http://localhost:3000"

async function getPosts() {
    const response = await fetch(`${BASE_URL}/posts`)
    return await response.json()
}

function createPostCard(post) {
    const article = document.createElement("article")
    const h2 = document.createElement("h2")
    // const p = document.createElement("p")
    const bt = document.createElement("button")
    const link = document.createElement("a")
    h2.innerText = post.title
    link.setAttribute("href", 'http://127.0.0.1:5500/client/post.html?' + post.id)
    // p.innerText = post.body
    bt.innerText = "✕"
    article.appendChild(bt)
    article.append(link)
    link.append(h2)
    // article.appendChild(p)
    h2.classList.add("post__title")
    article.classList.add("post")
    bt.classList.add("post__delete")
    bt.addEventListener("click", () => deletePost(post.id))
    return article
}

async function deletePost(id) {
    const response = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" })
    const json = await response.json()
    alert(json.message)
    window.location.reload()
}

async function createPostList() {
    const container = document.querySelector('[data-container="posts"]')
    const postList = await getPosts()
    const posts = postList.map(createPostCard)
    posts.forEach(post => container.appendChild(post))
}

async function createPost(post) {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    console.log(await response.json())
}

document.addEventListener("DOMContentLoaded", createPostList)

const form = document.querySelector('[data-form="posts"]')

form.addEventListener("submit", () => {
    const formData = new FormData(form)
    const post = {
        title: formData.get("title"),
        body: formData.get("body")
    }
    form.reset()
    createPost(post)
})
