import React from "react"
import {NavLink} from "react-router-dom";
import classes from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.dailyReports}>
                <NavLink to="/">Ежедневные отчёты</NavLink>
            </div>
            <div className={classes.addReport}>
                <NavLink to="/addReport">Создать отчет</NavLink>
            </div>
            <div className={classes.statistics}>
                <NavLink to="/statistics">Статистика</NavLink>
            </div>
        </div>
    )
}

export default Navbar;