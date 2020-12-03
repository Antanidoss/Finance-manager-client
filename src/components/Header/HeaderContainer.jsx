import React from "react";
import * as axios from "axios";
import Header from "./Header";
import {connect} from "react-redux";
import {setUserData} from "../../redux/account-reducer";

class HeaderContainer extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidMount() {
        axios.get("https://localhost:44378/api/Account/auth/me", {withCredentials:true})
            .then(res => {
                if (res.data.isAuthenticated === true) {
                    this.props.setUserData(res.data.user.id, res.data.user.userName);
                }
            })
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

export default connect(mapStateToProps, {setUserData})(HeaderContainer);

