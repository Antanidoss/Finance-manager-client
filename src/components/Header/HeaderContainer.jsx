import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {compose} from "redux";
import {getIsAuthenticated, getUserName} from "../../redux/users-selectors";

class HeaderContainer extends React.Component{
    render() {
        return (
            <Header {...this.props}></Header>
        )
    }
};

const mapStateToProps = (state) => {
    return {
    isAuthenticated: getIsAuthenticated(state),
    userName: getUserName(state),
}};

export default compose(
    connect(mapStateToProps, null)
)(HeaderContainer);

