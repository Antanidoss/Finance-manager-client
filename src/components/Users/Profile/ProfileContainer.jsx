import React from "react"
import {logoutThunkCreator} from "../../../redux/user-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import Profile from "./Profile";
import {getIsAuthenticated, getUserId, getUserName} from "../../../redux/users-selectors";

class ProfileContainer extends React.Component {
    render() {
        return <Profile {...this.props}></Profile>
    }
}

let mapStateToProps = (state) => ({
    userId: getUserId(state),
    userName: getUserName(state),
    isAuthenticated: getIsAuthenticated(state)
})

let mapDispatchToProps = (dispatch) => ({
    logout: () => {
        logoutThunkCreator()(dispatch)
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(ProfileContainer)