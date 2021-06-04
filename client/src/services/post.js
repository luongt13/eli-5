import api from "./api-config.js"

export const getPosts = async () => {
    try {
        const res = await api.get("/posts")
        return res.data
    } catch (err) {
        throw err
    }
}

export const createPost = async (body) => {
    try {
        const res = await api.post("/posts", body)
        return res.data
    } catch (err) {
        throw err
    }
}

export const addLike = async (id, body) => {
    try {
        const res = await api.put(`/posts/likes/${id}`, body)
        return res.data
    } catch (err) {
        throw err
    }
}

export const addDislike = async (id, body) => {
    try {
        const res = await api.put(`/posts/dislikes/${id}`, body)
        console.log(id)
        console.log(body)
        return res.data
    } catch (err) {
        throw err
    }
}