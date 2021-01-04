import instanceAxios from "./instanceAxios";

export const accountApi = {
    auth(email, password, isParsistent) {
        return instanceAxios.post(`/Account/auth`, {email: email, password: password, isParsistent: isParsistent})
            .then(res => res.data)
    },
    authMe() {
        return instanceAxios.get("/Account/auth/me")
            .then(res => res.data)
    },
    logout() {
        return instanceAxios.get("/Account/logout")
            .then(res => res.data)
    },
    registration(name, email, password) {
        return instanceAxios.post("/Account/reg", {name: name, email: email, password: password})
            .then(res => res.data)
    }
}