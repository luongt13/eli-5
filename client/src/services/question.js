import api from "./api-config"

export const getQuestions = async () => {
    try {
        const res = await api.get("/questions")
        return res.data
    } catch (err) {
        throw err
    }
}

export const getQuestion = async (id) => {
    try {
        const res = await api.get(`/questions/${id}`)
        return res.data
    } catch (err) {
        throw err
    } 
}

export const createQuestion = async (body) => {
    try {
        const res = await api.post("/questions", body)
        return res.data
    } catch (err) {
        throw err
    }
}