import React from "react"
import DailyReport from "./DailyReport/DailyReport";
import classes from "./DailyReports.module.css"
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {DailyReportType} from "../../types/types";
import {updateCurrentPage} from "../../redux/report-reducer";

type PropsType = {
    pageSize: number,
    pageNumber: number,
    totalDailyReportCount: number,
    currentPage: number,
    dailyReports: Array<DailyReportType>,
    isAuthenticated: boolean,
    isFetching: boolean,
    totalPageCount: number
}

const DailyReports: React.FC<PropsType> = (props) => {
    let dailyReportElem = props.dailyReports.map(d => {
        return <DailyReport dailyReport={d}></DailyReport>
    });
    return (
        <div className={classes.dailyReports}>
            <div className={classes.addReport}>
                <NavLink to="/addReport">Создать отчет</NavLink>
            </div>
            {
                dailyReportElem.length === 0 ?
                    <h3>У вас нету ежедневных отчётов</h3> :
                    dailyReportElem
            }
            <Paginator {...props} updateCurrentPage={updateCurrentPage}></Paginator>
        </div>
    )

}

export default DailyReports;