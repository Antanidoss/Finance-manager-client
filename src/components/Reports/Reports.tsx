import React, {useEffect} from "react"
import Report from "./Report/Report";
import classes from "./Reports.module.css"
import Paginator from "../common/Paginator/Paginator";
import {ReportType} from "../../types/types";
import {
    removeReportThunkCreator,
    updateCurrentPage,
    updateReportThunkCreator
} from "../../redux/report-reducer";

type PropsType = {
    pageSize: number,
    pageNumber: number,
    totalReportCount: number,
    currentPage: number,
    reports: Array<ReportType>,
    totalPageCount: number
    updateCurrentPage: typeof updateCurrentPage,
    removeReport: typeof removeReportThunkCreator,
    updateReport: typeof updateReportThunkCreator,
}

const Reports: React.FC<PropsType> = (props) => {
    useEffect(() => {

    })
    let reportElem = props.reports.map(r => {
        return <Report amountSpent={r.amountSpent} descriptionsOfExpenses={r.descriptionsOfExpenses} id={r.id}
                       timeOfCreate={r.timeOfCreate} removeReport={props.removeReport}
                       updateReport={props.updateReport}/>
    })
    return (
        <div className={classes.reports}>
            {
                props.reports.length === 0 ?
                    <h3>У вас нет отчетов за эту дату</h3> :
                    reportElem
            }
            <Paginator {...props}></Paginator>
        </div>
    )
}

export default Reports;