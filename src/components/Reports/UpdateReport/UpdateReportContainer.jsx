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
        debugger
        return <UpdateReport {...this.props}></UpdateReport>
    }
}

let mapStateToProps = (state) => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state)
})

let mapDispatchToProps = (dispatch) => ({
    updateReport: (amountSpent, descriptionsOfExpenses, reportId) => {
        updateReportThunkCreator(amountSpent, descriptionsOfExpenses, reportId)(dispatch)
    },
    getReportById: (reportId) => {
        requestReportByIdThunkCreator(reportId)(dispatch);
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(UpdateReportContainer);
