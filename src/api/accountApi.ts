import instanceAxios, {ResultType} from "./instanceAxios";
import {ResponseType} from "./instanceAxios";

type AuthMeResultType = {
    user: {
        id: string,
        userName: string
    },
    isAuthenticated: boolean
}

export const accountApi = {
    auth(email: string, password: string, isParsistent: boolean) {
        return instanceAxios.post<ResultType>(`/Account/auth`, {email: email, password: password, isParsistent: isParsistent})
            .then(res => res.data)
    },
    authMe() {
        return instanceAxios.get<ResponseType<AuthMeResultType>>("/Account/auth/me")
            .then(res => res.data)
    },
    logout() {
        return instanceAxios.get<void>("/Account/logout")
            .then(res => res.data)
    },
    registration(name: string, email: string, password: string) {
        return instanceAxios.post<ResultType>("/Account/reg", {name: name, email: email, password: password})
            .then(res => res.data)
    }
}