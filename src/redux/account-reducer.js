const initialState = {
    isAuthenticated: false,
    userId: "",
    userName: "",
    userPasswordForm: "",
    userEmailForm: "",
    userNameForm: ""
}

const SET_USER_DATA = "SET_USER_DATA";
const UPDATE_USER_PASSWORD_FORM = "UPDATE_USER_PASSWORD_FORM";
const UPDATE_USER_NAME_FORM = "UPDATE_USER_NAME_FROM";
const UPDATE_USER_EMAIL_FORM = "USER_EMAIL_FROM";

const accountReducer = (state = initialState, action) => {
    let copyState = {...state};
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
                userEmailForm: action.newEmail
            }
        case UPDATE_USER_PASSWORD_FORM:
            return {
                ...state,
                userPasswordForm: action.newPassword
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

export default accountReducer;