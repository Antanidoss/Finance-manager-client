import {accountApi} from "../api/accountApi";
import {stopSubmit} from "redux-form";

const initialState = {
    isAuthenticated: false,
    userId: "",
    userName: "",
    isFetching: false
}

const SET_USER_DATA = "SET_USER_DATA";
const AUTH = "AUTH";
const LOGOUT = "LOGOUT";

const userReducer = (state = initialState, action) => {
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

export const setUserData = (userId, userName) => ({
    type: SET_USER_DATA, userId: userId, userName: userName
});

export const auth = () => ({
    type: AUTH
});

export const logout = () =>({
    type: LOGOUT
});

export const authThunkCreator = (userEmail, userPassword, isUserParsistent) => dispatch => {
    accountApi.auth(userEmail, userPassword, isUserParsistent)
        .then(res => {
            if(res.succeeded) {
                dispatch(auth())
            } else {
                let action = stopSubmit("login", {_error: res.errors});
                    dispatch(action);}
        })
}

export const authMeThunkCreator = () => dispatch => {
    return accountApi.authMe()
        .then(res => {
            debugger
            if(res.isAuthenticated) {
                dispatch(setUserData(res.user.id, res.user.userName));
            }
        })
}

export const logoutThunkCreator = () => dispatch => {
    accountApi.logout()
        .then(res => {
            dispatch(logout())
        })
}

export default userReducer;