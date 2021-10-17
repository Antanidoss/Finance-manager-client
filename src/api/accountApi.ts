import instanceAxios, {ResultType} from "./instanceAxios";
import {ResponseType} from "./instanceAxios";


type AuthResultType = {
    id: string,
    userName: string,
    email: string,
    token: string
}

type UserType = {
    id: string,
    name: string,
    email: string,
    token: string
}

export const accountApi = {
    auth(email: string, password: string, isParsistent: boolean) {
        return instanceAxios.post<ResponseType<AuthResultType>>(`/Account/auth`, {email: email, password: password, isParsistent: isParsistent})
            .then(res => {
                instanceAxios.defaults.headers.common["Authorization"] = res.data.data.token
                return res.data;
            })
    },
    logout() {
        return instanceAxios.get<void>("/Account/logout")
            .then(res => res.data)
    },
    registration(name: string, email: string, password: string) {
        return instanceAxios.post<ResultType>("/Account/reg", {name: name, email: email, password: password})
            .then(res => res.data)
    },
    getCurrentUser() {
        return instanceAxios.get<ResponseType<UserType>>("/Account/get")
        .then(res => res.data.data)
    }
}