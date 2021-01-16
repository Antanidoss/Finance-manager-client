import React, {useEffect} from "react"
import {connect} from "react-redux";
import {
    DailyReportType,
    requestDailyReportsThunkCreator,
    toggleIsFetching,
    updateCurrentPage
} from "../../redux/dailyReport-reducer";
import DailyReports from "./DailyReports";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getDailyReports, getIsFetching,
    getPageNumber,
    getPageSize,
    getTotalDailyReportCount, getTotalPageCount
} from "../../redux/dailyReports-selectors";
import {getIsAuthenticated} from "../../redux/users-selectors";
import {AppStoreType} from "../../redux/redux-store";

const DailyReportContainer = (props: PropsType) => {
    useEffect(() => {
        props.getDailyReports(props.currentPage, props.pageSize);
    }, [])
        return <>
            {
                props.isFetching
                    ? <Preloader></Preloader>
                    : null
            }
                <DailyReports {...props}></DailyReports>;
            </>

}

let mapStateToProps = (state: AppStoreType) => ({
    pageSize: getPageSize(state),
    pageNumber: getPageNumber(state),
    totalDailyReportCount: getTotalDailyReportCount(state),
    currentPage: getCurrentPage(state),
    dailyReports: getDailyReports(state),
    isAuthenticated: getIsAuthenticated(state),
    isFetching: getIsFetching(state),
    totalPageCount: getTotalPageCount(state)
})

type MapStateToPropsType = {
    pageSize: number,
    pageNumber: number,
    totalDailyReportCount: number,
    currentPage: number,
    dailyReports: Array<DailyReportType> | null,
    isAuthenticated: boolean,
    isFetching: boolean,
    totalPageCount: number
}

type MapDispatchToPropsType = {
    toggleIsFetching: typeof toggleIsFetching,
    updateCurrentPage: typeof updateCurrentPage,
    getDailyReports: typeof requestDailyReportsThunkCreator
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>
    (mapStateToProps, {toggleIsFetching, updateCurrentPage, getDailyReports: requestDailyReportsThunkCreator}),
    withAuthRedirect,
)(DailyReportContainer);