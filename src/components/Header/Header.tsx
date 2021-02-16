import React from "react";
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {PropsType} from "./HeaderContainer";

const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.header}>
            <div className={classes.siteName}>Finance manager</div>
            <div className={classes.loginBlock}>
                {
                    props.isAuthenticated === true
                        ? <div className={classes.userName}><NavLink to="/profile">{props.userName}</NavLink></div>
                        : <div className={classes.login}><NavLink to="/auth">Войти</NavLink></div>
                }
            </div>
        </div>
    )
}

export default Header;