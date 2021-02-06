import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getIsAuthenticated, getUserName} from "../../redux/users-selectors";
import {AppStoreType} from "../../redux/redux-store";
import { compose } from "redux";

const HeaderContainer: React.FC<PropsType> = (props) => {
    return (
        <Header {...props}></Header>
    )

};

type MapStateToPropsType = {
    isAuthenticated: boolean,
    userName: string | null,
}

export type PropsType = MapStateToPropsType

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    isAuthenticated: getIsAuthenticated(state),
    userName: getUserName(state),
});

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, null, null, AppStoreType>(mapStateToProps, null))(HeaderContainer);