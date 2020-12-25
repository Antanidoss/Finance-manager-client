import React from "react"
import Login from "./Login";
import {
    authThunkCreator,
} from "../../../redux/user-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

class LoginContainer extends React.Component {
    render() {
        debugger
        return <Login {...this.props}></Login>
    }
}

let mapDispatchToProps = (dispatch) => ({
    auth: (userEmail, userPassword, isUserParsistent) => {
        authThunkCreator(userEmail, userPassword, isUserParsistent)(dispatch);
    }
});

export default compose(
    connect(null, mapDispatchToProps)
)(LoginContainer)

