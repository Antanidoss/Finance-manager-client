import React from "react"
import {NavLink} from "react-router-dom";
import classes from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.dailyReports}>
                <NavLink to="/dailyReports">Ежедневные отчёты</NavLink>
            </div>
        </div>
    )
}

export default Navbar;