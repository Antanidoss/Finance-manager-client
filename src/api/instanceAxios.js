import * as axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44378/api"
})

export default instanceAxios;