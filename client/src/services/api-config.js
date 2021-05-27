import axios from "axios"

const getToken = async() => {
    let token = (await localStorage.getItem("token")) || null
    return `Bearer ${token}`
}

let apiUrl 

const apiUrls = {
    production: "",
    development: "http://localhost:4567/api"
}

if (window.location.hostname === "localhost") {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}

const api = axios.create({
    baseURL: apiUrl
})

api.interceptors.request.use(
    async(options) => {
        options.headers["Authorization"] = await getToken()
        return options
    },
    (error) => {
        console.log("request error", error)
        return Promise.reject(error)
    }
)
export default api