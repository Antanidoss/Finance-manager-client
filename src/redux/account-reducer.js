import {accountApi} from "../api/accountApi";

const initialState = {
    isAuthenticated: false,
    userId: "",
    userName: "",
}

const SET_USER_DATA = "SET_USER_DATA";
const AUTH = "AUTH"

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userId: action.userId,
                userName: action.userName,
                isAuthenticated: true
            }
        case AUTH:
            debugger
            return {
                ...state,
                isAuthenticated: true,
                userEmailAuthForm: "",
                userPasswordAuthForm: "",
                isUserParsistentAuthForm: false
            }
        default:
            return state;
    }
}

export const setUserData = (userId, userName) =>
    ({type: SET_USER_DATA, userId: userId, userName: userName});

export const auth = () =>
    ({type: AUTH})

export const authThunkCreator = (userEmail, userPassword, isUserParsistent) => {
    return (dispatch) => {
        accountApi.auth(userEmail, userPassword, isUserParsistent)
            .then(res => {
                if(res.succeeded) {
                    dispatch(auth())
                }
            })
    }
}

export const authMeThunkCreator = () => {
    return (dispatch) => {
        accountApi.authMe()
            .then(res => {
                if(res.isAuthenticated) {
                    dispatch(setUserData(res.user.id, res.user.userName));
                }
            })
    }
}

export default accountReducer;