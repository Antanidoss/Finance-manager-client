import React, {useEffect} from "react"
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
    getReports, getTotalPageCount,
    getTotalReportCount
} from "../../redux/reports-selectors";
import {getIsAuthenticated} from "../../redux/users-selectors";

const ReportContainer = (props) => {
    useEffect(() => {
        props.requestReports(props.currentPage, props.pageSize, props.match.params.dailyReportId)
    }, [])
    return <>
        {
            props.isFetching
                ? <Preloader></Preloader>
                : null
        }
        <Reports {...props}></Reports>
    </>

}

let mapStateToProps = (state) => ({
    pageSize: getPageSize(state),
    pageNumber: getPageNumber(state),
    totalReportCount: getTotalReportCount(state),
    currentPage: getCurrentPage(state),
    reports: getReports(state),
    isAuthenticated: getIsAuthenticated(state),
    isFetching: getIsFetching(state),
    totalPageCount: getTotalPageCount(state)
})

export default compose(
    connect(mapStateToProps,
    {updateCurrentPage, requestReports: requestReportsThunkCreator, removeReport: removeReportThunkCreator,
        updateReport: updateReportThunkCreator, toggleIsFetching: toggleIsFetching}),
    withRouter,
    withAuthRedirect
)(ReportContainer)
