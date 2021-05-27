import api from "./api-config.js"

export const getPosts = async () => {
    try {
        const res = await api.get("/posts")
        return res.data
    } catch (err) {
        throw err
    }
}