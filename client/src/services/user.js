import api from "./api-config.js"

export const signUp = async(credentials) => {
    try {
        const res = await api.post("/sign-up", credentials)
        localStorage.setItem("token", res.data.token)
    } catch (err) {
        throw err
    }
}

export const signIn = async (credentials) => {
    try {
        const res = await api.post("sign-in", credentials)
        localStorage.setItem("token", res.data.token)
        return res.data
    } catch (err) {
        throw err
    }
}

export const verifyUser = async () => {
    const token = await localStorage.getItem("token")
    if (token) {
        const res = await api.get("/verify")
        return res.data
    } else {
        return false
    }
}

export const getUser = async (id) => {
    try {
        const res = await api.get(`/users/${id}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export const updateUser = async (id, body) => {
    try {
        const res = await api.put(`/update/${id}`, body)
        return res.data
    } catch (err) {
        throw err
    }
}