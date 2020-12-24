import React from "react"
import DailyReport from "./DailyReport/DailyReport";
import classes from "./DailyReports.module.css"
import {NavLink} from "react-router-dom";

class DailyReports extends React.Component {
    render() {
        let dailyReportElem = this.props.dailyReports.map(d =>
        {
            return <DailyReport dailyReport={d}></DailyReport>
        });
        let totalPageCount = Math.ceil(this.props.totalDailyReportCount / this.props.pageSize);
        let pages = [];
        for(let i = 1; i <= totalPageCount; i++){
            pages.push(i);
        }
        return (
        <div className={classes.dailyReports}>
            <div className={classes.addReport}>
                <NavLink to="/addReport">Создать отчет</NavLink>
            </div>
            {dailyReportElem}
            <div className={classes.pagination}>
                {
                    pages.map(p => {
                        return <span>
                                <a href="#" className={this.props.currentPage === p && classes.selectPage}
                                   onClick={() => {
                                       this.props.updateCurrentPage(p)
                                   }}>
                                    {p}
                                </a>
                            </span>
                    })
                }
            </div>
        </div>
        )
    }
}

export default DailyReports;