import React from "react"
import Report from "./Report/Report";
import classes from "./Reports.module.css"

class Reports extends React.Component {
    render() {
        let reportElem = this.props.reports.map(r => {
            return <Report amountSpent={r.amountSpent} descriptionsOfExpenses={r.descriptionsOfExpenses} id={r.id}
                           timeOfCreate={r.timeOfCreate} removeReport={this.props.removeReport}/>
        })
        let totalPageCount = Math.ceil(this.props.totalReportCount / this.props.pageSize);
        let pages = [];
        for(let i = 1; i <= totalPageCount; i++){
            pages.push(i);
        }
        return (
            <div className={classes.reports}>
                {reportElem}
                <div className={classes.pagination}>
                {
                    pages.map(p => {
                        return <span>
                                <a href="#" className={this.props.currentPage === p && classes.selectPage} onClick={() => {this.props.updateCurrentPage(p)}}>
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

export default Reports;