import React from "react"
import Login from "./Login";
import {
    authThunkCreator,
} from "../../../redux/user-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStoreType} from "../../../redux/redux-store";

const LoginContainer = (props: PropsType) => {
    return <Login {...props}></Login>
}

type MapDispatchToPropsType = {
    auth: typeof authThunkCreator
}

type PropsType = MapDispatchToPropsType;

export default compose(
    connect<null, MapDispatchToPropsType, null, AppStoreType>(null, {auth: authThunkCreator})
)(LoginContainer)

