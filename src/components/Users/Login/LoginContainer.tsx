import React from "react"
import Login from "./Login";
import {
    authThunkCreator,
} from "../../../redux/user-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStoreType} from "../../../redux/redux-store";
import {getIsAuthenticated} from "../../../redux/users-selectors";

const LoginContainer: React.FC<PropsType> = (props) => {
    return <Login {...props}></Login>
}

type MapDispatchToPropsType = {
    auth: typeof authThunkCreator
}

type MapStateToPropsType = {
    isAuthenticated: boolean,
}

const mapStateToProps = (store: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(store),
})
export type PropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>
    (mapStateToProps, {auth: authThunkCreator}))
    (LoginContainer)

