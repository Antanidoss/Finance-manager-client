import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getIsAuthenticated, getUserName} from "../../redux/users-selectors";

const HeaderContainer = (props) => {
    return (
        <Header {...props}></Header>
    )

};

const mapStateToProps = (state) => ({
    isAuthenticated: getIsAuthenticated(state),
    userName: getUserName(state),
});

export default connect(mapStateToProps, null)(HeaderContainer);

