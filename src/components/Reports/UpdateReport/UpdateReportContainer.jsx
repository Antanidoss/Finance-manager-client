import React from "react"
import UpdateReport from "./UpdateReport";
import {connect} from "react-redux";
import {
    requestReportByIdThunkCreator,
    updateReportThunkCreator
} from "../../../redux/report-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getReport} from "../../../redux/reports-selectors";
import {getIsAuthenticated} from "../../../redux/users-selectors";

class UpdateReportContainer extends React.Component {
    componentDidMount() {
        this.props.getReportById(this.props.match.params.reportId);
    }

    render() {
        return <UpdateReport {...this.props}></UpdateReport>
    }
}

let mapStateToProps = (state) => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state)
})

export default compose(
    connect(mapStateToProps, {updateReport: updateReportThunkCreator, getReportById: requestReportByIdThunkCreator}),
    withRouter,
    withAuthRedirect
)(UpdateReportContainer);
