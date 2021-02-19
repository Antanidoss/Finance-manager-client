import React from "react"
import DailyReport from "./DailyReport/DailyReport";
import classes from "./DailyReports.module.css"
import Paginator from "../common/Paginator/Paginator";
import { PropsType } from "./DailyReportsContainer";

const DailyReports: React.FC<PropsType> = (props) => {
    let dailyReportElem = props.dailyReports.map(d => {
        return <DailyReport key={d.id} dailyReport={d}></DailyReport>
    });
    return (
        <div className={classes.dailyReports}>
            {
                dailyReportElem.length === 0
                    ? <h3>У вас нету ежедневных отчётов</h3>
                    : <div className={classes.dailyReportItems}>
                        {dailyReportElem}
                    </div>
            }
            <Paginator {...props}></Paginator>
        </div>
    )

}

export default DailyReports;