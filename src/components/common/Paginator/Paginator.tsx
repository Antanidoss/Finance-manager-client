import React from "react"
import {updateCurrentPage as updateCurrentReportPage} from "../../../redux/report-reducer"
import {updateCurrentPage as updateCurrentDailyReportPage} from "../../../redux/dailyReport-reducer"
import classes from "../../Reports/Reports.module.css";

type PropsType = {
    updateCurrentPage: typeof updateCurrentReportPage | typeof updateCurrentDailyReportPage
    totalPageCount: number
    currentPage: number
}

const Paginator: React.FC<PropsType> = (props) => {
    let pages = [];
    for (let i = 1; i <= props.totalPageCount; i++) {
        pages.push(i);
    }
    return (
        <div className={classes.pagination}>
            {
                pages.map(p => {
                    return <span>
                                <a href="#" className={(props.currentPage === p && classes.selectPage).toString()}
                                   onClick={() => {
                                       props.updateCurrentPage(p)
                                   }}>
                                    {p}
                                </a>
                            </span>
                })
            }
        </div>
    )
}

export default Paginator