import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {authMeThunkCreator} from "../../redux/account-reducer";

class HeaderContainer extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidMount() {
       this.props.authMe();
    }
    render() {
        return (
            <Header {...this.props}></Header>
        )
    }
};

let mapStateToProps = (state) => {
    return {
    isAuthenticated: state.accountPage.isAuthenticated,
    userName: state.accountPage.userName,
}};

export default compose(
    connect(mapStateToProps, {authMe: authMeThunkCreator}),
)(HeaderContainer);

