import {accountApi} from "../api/accountApi";
import {stopSubmit} from "redux-form";
import {AppStoreType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

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

type ActionsTypes = SetUserDataType | AuthType | LogoutType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;
type GetStateType = () => AppStoreType;

export const authThunkCreator = (userEmail: string, userPassword: string, isUserParsistent: boolean): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await accountApi.auth(userEmail, userPassword, isUserParsistent);
        if (response.succeeded) {
            dispatch(auth());
        } else {
            let action = stopSubmit("login", {_error: response.errors});
            dispatch(action);
        }
    }
}

export const authMeThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await accountApi.authMe();
        if (response.data.isAuthenticated) {
            dispatch(setUserData(response.data.user.id, response.data.user.userName));
        }
    }
}

export const logoutThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        await accountApi.logout();
        dispatch(logout());
    }
}

export const registrationThunkCreator = (name: string, email: string, password: string): ThunkType  => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await accountApi.registration(name, email, password)
        if (response.succeeded) {
            await authMeThunkCreator()
        } else {
            let action = stopSubmit("registration", {_error: response.errors});
            dispatch(action);
        }

    }
}

export default userReducer;