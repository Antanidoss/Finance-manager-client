import {accountApi} from "../api/accountApi";

const initialState = {
    isAuthenticated: false,
    userId: "",
    userName: "",
    userPasswordAuthForm: "",
    userEmailAuthForm: "",
    userNameForm: "",
    isUserParsistentAuthForm: false,
}

const SET_USER_DATA = "SET_USER_DATA";
const UPDATE_USER_PASSWORD_FORM = "UPDATE_USER_PASSWORD_FORM";
const UPDATE_USER_NAME_FORM = "UPDATE_USER_NAME_FROM";
const UPDATE_USER_EMAIL_FORM = "USER_EMAIL_FROM";
const UPDATE_IS_USER_PARSISTENT_FORM = "UPDATE_IS_USER_PARSISTENT_FORM";
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
        case UPDATE_USER_NAME_FORM:
            return {
                ...state,
                userNameForm: action.newName
            }
        case UPDATE_USER_EMAIL_FORM:
            return {
                ...state,
                userEmailAuthForm: action.newEmail
            }
        case UPDATE_USER_PASSWORD_FORM:
            debugger
            return {
                ...state,
                userPasswordAuthForm: action.newPassword
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
        case UPDATE_IS_USER_PARSISTENT_FORM:
            return {
                ...state,
                isUserParsistentAuthForm: action.newIsUserParsistentForm
            }
        default:
            return state;
    }
}

export const setUserData = (userId, userName) =>
    ({type: SET_USER_DATA, userId: userId, userName: userName});

export const updateUserPasswordForm = (newPassword) =>
    ({type: UPDATE_USER_PASSWORD_FORM, newPassword: newPassword});

export const updateUserEmailForm = (newEmail) =>
    ({type: UPDATE_USER_EMAIL_FORM, newEmail: newEmail})

export const updateUserNameForm = (newName) =>
    ({type: UPDATE_USER_NAME_FORM, newName: newName})

export const updateIsUserParsistentForm = (newIsUserParsistentForm) =>
    ({type: UPDATE_IS_USER_PARSISTENT_FORM, newIsUserParsistentForm: newIsUserParsistentForm})

export const auth = () =>
    ({type: AUTH})

export const authThunkCreator = (userEmail, userPassword, isUserParsistent) => {
    return (dispatch) => {
        accountApi.auth(userEmail, userPassword, isUserParsistent)
            .then(res => {
                if(res.succeeded === true){
                    dispatch(auth())
                }
            })
    }
}

export default accountReducer;