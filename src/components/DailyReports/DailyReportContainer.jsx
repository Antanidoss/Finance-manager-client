import React from "react"
import {connect} from "react-redux";
import {requestDailyReportsThunkCreator, toggleIsFetching, updateCurrentPage} from "../../redux/dailyReport-reducer";
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

class DailyReportContainer extends React.Component {
    componentDidMount() {
        this.props.getDailyReports(this.props.currentPage, this.props.pageSize);
    }
    render() {
        return <>
            {
                this.props.isFetching
                    ? <Preloader></Preloader>
                    : null
            }
                <DailyReports {...this.props}></DailyReports>;
            </>
    }
}

let mapStateToProps = (state) => ({
    pageSize: getPageSize(state),
    pageNumber: getPageNumber(state),
    totalDailyReportCount: getTotalDailyReportCount(state),
    currentPage: getCurrentPage(state),
    dailyReports: getDailyReports(state),
    isAuthenticated: getIsAuthenticated(state),
    isFetching: getIsFetching(state),
    totalPageCount: getTotalPageCount(state)
})

export default compose(
    connect(mapStateToProps, {toggleIsFetching, updateCurrentPage, getDailyReports: requestDailyReportsThunkCreator}),
    withAuthRedirect,
)(DailyReportContainer);