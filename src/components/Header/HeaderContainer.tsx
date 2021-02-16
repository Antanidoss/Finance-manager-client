import React, {useEffect} from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getIsAuthenticated, getUserName} from "../../redux/users-selectors";
import {AppStoreType} from "../../redux/redux-store";
import { compose } from "redux";
import {authMeThunkCreator} from "../../redux/user-reducer";

const HeaderContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.authMe();
    })
    return <Header {...props}></Header>
};

type MapStateToPropsType = {
    isAuthenticated: boolean,
    userName: string | null,
}

type MapDispatchToProps = {
    authMe: typeof authMeThunkCreator
}

export type PropsType = MapStateToPropsType & MapDispatchToProps

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state),
    userName: getUserName(state),
});

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToProps, null, AppStoreType>(mapStateToProps, {authMe: authMeThunkCreator}))
(HeaderContainer);