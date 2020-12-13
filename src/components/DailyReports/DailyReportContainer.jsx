import React from "react"
import {connect} from "react-redux";
import {getDailyReportsThunkCreator, updateCurrentPage} from "../../redux/dailyReport-reducer";
import DailyReports from "./DailyReports";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class DailyReportContainer extends React.Component {
    componentDidMount() {
        this.props.getDailyReports(this.props.currentPage, this.props.pageSize);
    }
    render() {
        return <DailyReports {...this.props}></DailyReports>;
    }
}

let mapStateToProps = (state) => ({
    pageSize: state.dailyReportPage.pageSize,
    pageNumber: state.dailyReportPage.pageNumber,
    totalDailyReportCount: state.dailyReportPage.totalDailyReportCount,
    currentPage: state.dailyReportPage.currentPage,
    dailyReports: state.dailyReportPage.dailyReports,
    isAuthenticated: state.accountPage.isAuthenticated
})

export default compose(
    connect(mapStateToProps, {updateCurrentPage, getDailyReports: getDailyReportsThunkCreator}),
    withAuthRedirect,
)(DailyReportContainer);