import instanceAxios from "./instanceAxios";


export const accountApi = {
    auth(email, password, isParsistent) {
        debugger
        return instanceAxios.post(`/Account/auth`, {email: email, password: password, isParsistent: isParsistent})
            .then(res => res.data)
    }
}