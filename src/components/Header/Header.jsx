import React from "react";
import classes from "./Header.module.css"

class Header extends React.Component {
    render() {
        return (
            <div className={classes.header}>
                <div className={classes.siteName}>Finance manager</div>
                <div className={classes.loginBlock}>
                    {
                       this.props.isAuthenticated === true
                           ? <div className="userName">{this.props.userName}</div>
                           : <div className="login"><button>Войти</button></div>
                    }
                </div>
            </div>
        )
    }
}

export default  Header;