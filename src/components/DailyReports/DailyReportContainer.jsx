import React from "react"
import {connect} from "react-redux";
import {getDailyReportsThunkCreator, toggleIsFetching, updateCurrentPage} from "../../redux/dailyReport-reducer";
import DailyReports from "./DailyReports";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";

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
    pageSize: state.dailyReportPage.pageSize,
    pageNumber: state.dailyReportPage.pageNumber,
    totalDailyReportCount: state.dailyReportPage.totalDailyReportCount,
    currentPage: state.dailyReportPage.currentPage,
    dailyReports: state.dailyReportPage.dailyReports,
    isAuthenticated: state.accountPage.isAuthenticated,
    isFetching: state.dailyReportPage.isFetching
})

export default compose(
    connect(mapStateToProps, {toggleIsFetching, updateCurrentPage, getDailyReports: getDailyReportsThunkCreator}),
    withAuthRedirect,
)(DailyReportContainer);