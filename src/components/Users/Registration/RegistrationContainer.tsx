import React from "react"
import {registrationThunkCreator} from "../../../redux/user-reducer";
import {connect} from "react-redux";
import Registration from "./Registration";
import {AppStoreType} from "../../../redux/redux-store";
import {compose} from "redux";
import {getIsAuthenticated} from "../../../redux/users-selectors";

const RegistrationContainer: React.FC<PropsType> = (props) => {
    return <Registration {...props}></Registration>
}

type MapDispatchToPropsType = {
    registration: typeof registrationThunkCreator
}

type MapStateToPropsType = {
    isAuthenticated: boolean
}

const mapStateToProps = (store: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(store)
})

export type PropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>
    (mapStateToProps, {registration: registrationThunkCreator}))
    (RegistrationContainer);