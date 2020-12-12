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

class ReportContainer extends React.Component {
    componentDidMount() {
        this.props.getReports(this.props.currentPage, this.props.pageSize, this.props.match.params.dailyReportId)
    }
    render() {
        return <Reports {...this.props}></Reports>
    }
}

let mapStateToProps = (state) => ({
    pageSize: state.reportPage.pageSize,
    pageNumber: state.reportPage.pageNumber,
    totalReportCount: state.reportPage.totalReportCount,
    currentPage: state.reportPage.currentPage,
    reports: state.reportPage.reports
})

let WithUrlDataContainerComponent = withRouter(ReportContainer);

export default connect(mapStateToProps,
    {updateCurrentPage, getReports: getReportsThunkCreator, removeReport: removeReportThunkCreator, updateReport: updateReportThunkCreator})
(WithUrlDataContainerComponent);