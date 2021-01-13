import React, {useEffect} from "react"
import Reports from "./Reports";
import {connect} from "react-redux";
import {
    requestReportsThunkCreator,
    removeReportThunkCreator, toggleIsFetching,
    updateCurrentPage,
    updateReportThunkCreator, ReportType
} from "../../redux/report-reducer";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
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
import {AppStoreType} from "../../redux/redux-store";

type MapStateToPropsType = {
    pageSize: number,
    pageNumber: number,
    totalReportCount: number,
    currentPage: number,
    reports: ReportType | null,
    isAuthenticated: boolean,
    isFetching: boolean,
    totalPageCount: number
}

type MapDispatchToPropsType = {
    updateCurrentPage: typeof updateCurrentPage,
    requestReports: typeof requestReportsThunkCreator,
    removeReport: typeof removeReportThunkCreator,
    updateReport: typeof updateReportThunkCreator,
    toggleIsFetching: typeof toggleIsFetching
}

type PathParamsType = {
    dailyReportId: string
}

type OwnPropsType = RouteComponentProps<PathParamsType> & {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const ReportContainer = (props: PropsType) => {
    useEffect(() => {
        props.requestReports(props.currentPage, props.pageSize, Number(props.match.params.dailyReportId))
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

let mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
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
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>(mapStateToProps,
    {updateCurrentPage, requestReports: requestReportsThunkCreator, removeReport: removeReportThunkCreator,
        updateReport: updateReportThunkCreator, toggleIsFetching: toggleIsFetching}),
    withRouter,
    withAuthRedirect
)(ReportContainer)
