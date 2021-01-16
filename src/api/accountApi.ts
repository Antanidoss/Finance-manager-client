import instanceAxios, {ResultType} from "./instanceAxios";

type AuthResultType = {
    result: ResultType
}

type RegistrationResultType = {
    result: ResultType
}

type AuthMeResultType = {
    user: {
        id: string,
        userName: string
    },
    isAuthenticated: boolean
}

export const accountApi = {
    auth(email: string, password: string, isParsistent: boolean) {
        return instanceAxios.post<AuthResultType>(`/Account/auth`, {email: email, password: password, isParsistent: isParsistent})
            .then(res => res.data.result)
    },
    authMe() {
        return instanceAxios.get<AuthMeResultType>("/Account/auth/me")
            .then(res => res.data)
    },
    logout() {
        return instanceAxios.get<void>("/Account/logout")
            .then(res => res.data)
    },
    registration(name: string, email: string, password: string) {
        return instanceAxios.post<RegistrationResultType>("/Account/reg", {name: name, email: email, password: password})
            .then(res => res.data.result)
    }
}