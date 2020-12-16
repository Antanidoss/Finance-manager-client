import React from "react"
import UpdateReport from "./UpdateReport";
import {connect} from "react-redux";
import {
    getReportByIdThunkCreator,
    updateReportThunkCreator
} from "../../../redux/report-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

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
    report: state.reportPage.report,
    isAuthenticated: state.accountPage.isAuthenticated
})

let mapDispatchToProps = (dispatch) => ({
    updateReport: (amountSpent, descriptionsOfExpenses, reportId) => {
        updateReportThunkCreator(amountSpent, descriptionsOfExpenses, reportId)(dispatch)
    },
    getReportById: (reportId) => {
        getReportByIdThunkCreator(reportId)(dispatch);
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(UpdateReportContainer);
