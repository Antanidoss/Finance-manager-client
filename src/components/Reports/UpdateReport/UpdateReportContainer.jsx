import React from "react"
import UpdateReport from "./UpdateReport";
import {connect} from "react-redux";
import {
    changeAmountSpentUpdateForm,
    changeDescriptionsOfExpensesUpdateForm,
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
        return <UpdateReport {...this.props}></UpdateReport>
    }
}

let mapStateToProps = (state) => ({
    report: state.reportPage.report,
    amountSpentForm: state.reportPage.reportAmountSpentUpdateForm,
    descriptionsOfExpensesForm: state.reportPage.reportDescriptionsOfExpensesUpdateForm,
    isAuthenticated: state.accountPage.isAuthenticated
})

let mapDispatchToProps = (dispatch) => ({
    changeAmountSpennt: (e) => {
        dispatch(changeAmountSpentUpdateForm(e.target.value))
    },
    changeDescriptionsOfExpenses: (e) => {
        dispatch(changeDescriptionsOfExpensesUpdateForm(e.target.value))
    },
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
