import React from "react"
import {registrationThunkCreator} from "../../../redux/user-reducer";
import {connect} from "react-redux";
import Registration from "./Registration";

const RegistrationContainer = (props) => {
    return <Registration {...props}></Registration>
}

const mapDispatchToProps = (dispatch) => ({
    registration(name, email, password) {
        registrationThunkCreator(name, email, password)(dispatch);
    }
})

export default connect(null, mapDispatchToProps)(RegistrationContainer);