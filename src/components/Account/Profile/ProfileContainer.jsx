import React from "react"
import {logoutThunkCreator} from "../../../redux/account-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import Profile from "./Profile";

class ProfileContainer extends React.Component {
    render() {
        return <Profile {...this.props}></Profile>
    }
}

let mapStateToProps = (state) => ({
    userId: state.accountPage.userId,
    userName: state.accountPage.userName,
    isAuthenticated: state.accountPage.isAuthenticated
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