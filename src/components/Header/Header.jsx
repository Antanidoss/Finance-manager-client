import React from "react";
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className={classes.header}>
                <div className={classes.siteName}>Finance manager</div>
                <div className={classes.loginBlock}>
                    {
                       this.props.isAuthenticated === true
                           ? <div className={classes.userName}><NavLink to="/profile">{this.props.userName}</NavLink></div>
                           : <div className={classes.login}><NavLink to="/auth">Войти</NavLink></div>
                    }
                </div>
            </div>
        )
    }
}

export default  Header;