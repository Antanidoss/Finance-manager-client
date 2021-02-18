import React from "react"
import classes from "./DailyReport.module.css"
import {NavLink} from "react-router-dom";
import {DailyReportType} from "../../../types/types";

type PropsType = {
    dailyReport: DailyReportType
}

const DailyReport: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.dailyReport}>
            <div className={classes.timeOfCreate}>
                Отчет за <NavLink
                to={`/reports/${props.dailyReport.id}`}>{props.dailyReport.timeOfCreate}</NavLink>
            </div>
            <div className={classes.reportsCount}>
                Количество отчётов за этот день: {props.dailyReport.reportsCount}
            </div>
        </div>
    )
}

export default DailyReport;