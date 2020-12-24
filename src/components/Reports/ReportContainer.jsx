import React from "react"
import Reports from "./Reports";
import {connect} from "react-redux";
import {
    getReportsThunkCreator,
    removeReportThunkCreator,
    updateCurrentPage,
    updateReportThunkCreator
} from "../../redux/report-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";

class ReportContainer extends React.Component {
    componentDidMount() {
        this.props.getReports(this.props.currentPage, this.props.pageSize, this.props.match.params.dailyReportId)
    }
    render() {
        return <>
            {
                this.props.isFetching
                    ? <Preloader></Preloader>
                    : null
            }
                <Reports {...this.props}></Reports>
            </>
    }
}

let mapStateToProps = (state) => ({
    pageSize: state.reportPage.pageSize,
    pageNumber: state.reportPage.pageNumber,
    totalReportCount: state.reportPage.totalReportCount,
    currentPage: state.reportPage.currentPage,
    reports: state.reportPage.reports,
    isAuthenticated: state.accountPage.isAuthenticated,
    isFetching: state.reportPage.isFetching
})

export default compose(
    connect(mapStateToProps,
    {updateCurrentPage, getReports: getReportsThunkCreator, removeReport: removeReportThunkCreator,
        updateReport: updateReportThunkCreator}),
    withRouter,
    withAuthRedirect
)(ReportContainer)
