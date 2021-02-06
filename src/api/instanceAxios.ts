import axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44378/api"
})

export type ResultType = {
    succeeded: boolean,
    errors: Array<string>
}

export type ResponseType<D = {}> = {
    data: D,
    result: ResultType | null
}

export default instanceAxios;