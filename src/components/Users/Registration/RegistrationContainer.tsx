import React from "react"
import {registrationThunkCreator} from "../../../redux/user-reducer";
import {connect} from "react-redux";
import Registration from "./Registration";
import {AppStoreType} from "../../../redux/redux-store";

const RegistrationContainer = (props: PropsType) => {
    return <Registration {...props}></Registration>
}

type MapDispatchToPropsType = {
    registration: typeof registrationThunkCreator
}

type PropsType = MapDispatchToPropsType;

export default connect<null, MapDispatchToPropsType, null, AppStoreType>
(null, {registration: registrationThunkCreator})(RegistrationContainer);