import React from "react"
import {logoutThunkCreator} from "../../../redux/user-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import Profile from "./Profile";
import {getIsAuthenticated, getUserId, getUserName} from "../../../redux/users-selectors";
import {AppStoreType} from "../../../redux/redux-store";

const ProfileContainer = (props: PropsType) => {
    return <Profile {...props}></Profile>
}

let mapStateToProps = (state: AppStoreType) => ({
    userId: getUserId(state),
    userName: getUserName(state),
    isAuthenticated: getIsAuthenticated(state)
})


type MapDispatchToPropsType = {
    logout: typeof logoutThunkCreator
}

type MapStateToPropsType = {
    userId: string | null,
    userName: string | null,
    isAuthenticated: boolean
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, {logout: logoutThunkCreator}),
    withAuthRedirect
)(ProfileContainer)