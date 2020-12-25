import React from "react"
import Reports from "./Reports";
import {connect} from "react-redux";
import {
    requestReportsThunkCreator,
    removeReportThunkCreator, toggleIsFetching,
    updateCurrentPage,
    updateReportThunkCreator
} from "../../redux/report-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage, getIsFetching,
    getPageNumber,
    getPageSize,
    getReports,
    getTotalReportCount
} from "../../redux/reports-selectors";
import {getIsAuthenticated} from "../../redux/users-selectors";

class ReportContainer extends React.Component {
    componentDidMount() {
        this.props.requestReports(this.props.currentPage, this.props.pageSize, this.props.match.params.dailyReportId)
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
    pageSize: getPageSize(state),
    pageNumber: getPageNumber(state),
    totalReportCount: getTotalReportCount(state),
    currentPage: getCurrentPage(state),
    reports: getReports(state),
    isAuthenticated: getIsAuthenticated(state),
    isFetching: getIsFetching(state)
})

export default compose(
    connect(mapStateToProps,
    {updateCurrentPage, requestReports: requestReportsThunkCreator, removeReport: removeReportThunkCreator,
        updateReport: updateReportThunkCreator, toggleIsFetching: toggleIsFetching}),
    withRouter,
    withAuthRedirect
)(ReportContainer)
