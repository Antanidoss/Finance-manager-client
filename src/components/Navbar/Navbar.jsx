import React from "react"
import {NavLink} from "react-router-dom";
import classes from "./Navbar.module.css"

class Navbar extends React.Component{
    render() {
        return (
            <div className={classes.navbar}>
                <div className={classes.dailyReports}>
                    <NavLink to="/dailyReports">Ежедневные отчёты</NavLink>
                </div>
            </div>
        )
    }
}

export default Navbar;