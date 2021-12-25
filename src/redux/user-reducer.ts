import {accountApi} from "../api/accountApi";
import {stopSubmit} from "redux-form";
import {AppStoreType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

export type InitialStateType = {
    isAuthenticated: boolean,
    userId: string | null,
    userName: string | null,
    isFetching: boolean,
    email: string | null,
    token: string | null
}

const initialState : InitialStateType = {
    isAuthenticated: false,
    userId: null,
    userName: null,
    isFetching: false,
    email: null,
    token: null
}

const SET_USER_DATA = "SET_USER_DATA";
const AUTH = "AUTH";
const LOGOUT = "LOGOUT";

const userReducer = (state = initialState, action: ActionsTypes) => {
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
                userId: action.userId,
                userName: action.userName,
                email: action.email,
                token: action.token,
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
    type: typeof AUTH, userId: string,  userName: string, email: string, token: string
}
export const auth = (userId: string,  userName: string, email: string, token: string): AuthType => ({
    type: AUTH, userId: userId,  userName: userName, email: email, token: token
});

type LogoutType = {
    type: typeof LOGOUT
}
export const logout = (): LogoutType =>({
    type: LOGOUT
});

type ActionsTypes = SetUserDataType | AuthType | LogoutType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;

export const authThunkCreator = (userEmail: string, userPassword: string, isUserParsistent: boolean): ThunkType => {
    return async (dispatch, getState) => {
        let response = await accountApi.auth(userEmail, userPassword, isUserParsistent);
        if (response.data != null) {
            let user = response;
            dispatch(auth(user.data.id, user.data.userName, user.data.email, user.data.token));
        } else {
            let action = stopSubmit("login", {_error: response.result?.errors});
            dispatch(action);
        }
    }
}

export const logoutThunkCreator = (): ThunkType => {
    return async (dispatch, getState) => {
        await accountApi.logout();
        dispatch(logout());
    }
}

export const registrationThunkCreator = (name: string, email: string, password: string): ThunkType => {
    return async (dispatch, getState) => {
        let response = await accountApi.registration(name, email, password)
        if (!response.succeeded) {
            let action = stopSubmit("registration", {_error: response.errors});
            dispatch(action);
        }
    }
}

export const getCurrentUserThunkCreator = (): ThunkType => {
    return async (dispatch, getState) => {
        let response = await accountApi.getCurrentUser();
        if (response != null) {
            dispatch(auth(response.id, response.name, response.email, response.token));
        }
        else {
            initialState.isAuthenticated = false;
        }
    }
} 

export default userReducer;