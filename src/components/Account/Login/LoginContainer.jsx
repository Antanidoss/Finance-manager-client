import React from "react"
import Login from "./Login";
import {
    authThunkCreator,
    updateIsUserParsistentForm,
    updateUserEmailForm,
    updateUserPasswordForm
} from "../../../redux/account-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

class LoginContainer extends React.Component {
    render() {
        return <Login {...this.props}></Login>
    }
}

let mapDispatchToProps = (dispatch) => ({
    updateUserEmailForm: (e) => {
        dispatch(updateUserEmailForm(e.target.value));
    },
    updateUserPasswordForm: (e) => {
        dispatch(updateUserPasswordForm(e.target.value));
    },
    updateIsUserParsistentForm: (e) => {
        debugger
        dispatch(updateIsUserParsistentForm(e.target.value));
    },
    auth: (userEmail, userPassword, isUserParsistent) => {
        authThunkCreator(userEmail, userPassword, isUserParsistent)(dispatch);
    }
});

let mapStateToProps = (state) => ({
    userEmailForm: state.accountPage.userEmailAuthForm,
    userPasswordForm: state.accountPage.userPasswordAuthForm,
    isUserParsistentForm: state.accountPage.isUserParsistentAuthForm
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer)

