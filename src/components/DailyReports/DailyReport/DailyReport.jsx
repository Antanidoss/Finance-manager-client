import React from "react"
import classes from "./DailyReport.module.css"
import {NavLink} from "react-router-dom";

class DailyReport extends React.Component {
    render() {
        debugger
        return (
            <div className={classes.dailyReport}>
                <div className={classes.timeOfCreate}>
                    Отчет за <NavLink to={`/reports/${this.props.dailyReport.id}`}>{this.props.dailyReport.timeOfCreate}</NavLink>
                </div>
            </div>
        )
    }
}

export default DailyReport;