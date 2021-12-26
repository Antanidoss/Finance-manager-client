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
    userName: string,
    email: string,
    token: string
}

const getCookie = (cookieName: string ): string => {
    var results = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );

    return results ? (unescape(results[2])) : '';
}

const deleteCookie = (cookieName: string) => {
    var cookieDate = new Date ();
    cookieDate.setTime ( cookieDate.getTime() - 1);
    document.cookie = cookieName += "=; expires=" + cookieDate.toUTCString();
}

const setAuthToken = (token: string) => {
    document.cookie += `Authorization=${token};`;
}

export const accountApi = {
    auth(email: string, password: string, isParsistent: boolean) {
        return instanceAxios.post<ResponseType<AuthResultType>>(`/Account/auth`, {email: email, password: password, isParsistent: isParsistent})
            .then(res => {
                deleteCookie('Authorization');
                setAuthToken(res.data.data.token)
                instanceAxios.defaults.headers.common["Authorization"] = res.data.data.token;
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
        instanceAxios.defaults.headers.common["Authorization"] = getCookie('Authorization');

        return instanceAxios.get<ResponseType<UserType>>("/Account/get")
        .then(res => {
            if (res.data.data != null) {
                deleteCookie('Authorization');
                setAuthToken(res.data.data.token);
            }
            return res.data.data
        })
    }
}