import {accountApi} from "../api/accountApi";
import {stopSubmit} from "redux-form";

export type InitialStateType = {
    isAuthenticated: boolean,
    userId: string | null,
    userName: string | null,
    isFetching: boolean
}

const initialState : InitialStateType = {
    isAuthenticated: false,
    userId: null,
    userName: null,
    isFetching: false
}

const SET_USER_DATA: string = "SET_USER_DATA";
const AUTH: string = "AUTH";
const LOGOUT: string= "LOGOUT";

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userId: action.userId,
                userName: action.userName,
                isAuthenticated: true
            }
        case AUTH:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userId: "",
                userName: ""
            }
        default:
            return state;
    }
}

type SetUserDataType = {
    type: typeof SET_USER_DATA, userId: string, userName: string
}
export const setUserData = (userId: string, userName: string): SetUserDataType => ({
    type: SET_USER_DATA, userId: userId, userName: userName
});

type AuthType = {
    type: typeof AUTH
}
export const auth = (): AuthType => ({
    type: AUTH
});

type LogoutType = {
    type: typeof LOGOUT
}
export const logout = (): LogoutType =>({
    type: LOGOUT
});

export const authThunkCreator = (userEmail: string, userPassword: string, isUserParsistent: boolean) => (dispatch: any) => {
    accountApi.auth(userEmail, userPassword, isUserParsistent)
        .then((res : any) => {
            if(res.succeeded) {
                dispatch(auth())
            } else {
                let action = stopSubmit("login", {_error: res.errors});
                    dispatch(action);
            }
        })
}

export const authMeThunkCreator = () => (dispatch: any) => {
    return accountApi.authMe()
        .then((res: any) => {
            debugger
            if(res.isAuthenticated) {
                dispatch(setUserData(res.user.id, res.user.userName));
            }
        })
}

export const logoutThunkCreator = () => (dispatch: any) => {
    accountApi.logout()
        .then((res : any) => {
            dispatch(logout())
        })
}
export const registrationThunkCreator = (name: string, email: string, password: string) => (dispatch: any) => {
    accountApi.registration(name, email, password)
        .then((res: any) => {
            if(res.succeeded) {
                authMeThunkCreator()(dispatch)
            } else {
                let action = stopSubmit("registration", {_error: res.errors});
                dispatch(action);
            }
        })
}

export default userReducer;