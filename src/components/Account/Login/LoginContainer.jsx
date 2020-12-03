import React from "react"
import Login from "./Login";
import {updateUserEmailForm, updateUserNameForm, updateUserPasswordForm} from "../../../redux/account-reducer";

class LoginContainer extends React.Component {
    render() {
        return <Login {...this.props}></Login>
    }
}

let mapDispatchToProps = (dispatch) => ({
    updateUserNameForm: (e) => {
        dispatch(updateUserNameForm(e.value));
    },
    updateUserEmailForm: (e) => {
        dispatch(updateUserEmailForm(e.value));
    },
    updateUserPasswordForm: (e) => {
        dispatch(updateUserPasswordForm(e.value));
    }
});

let mapStateToProps = (state) => ({
    userNameForm: state.accountPage.userNameForm,
    userEmailForm: state.accountPage.userEmailForm,
    userPasswordForm: state.accountPage.userPasswordForm
})
