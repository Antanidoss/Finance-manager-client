import React from "react"
import {Field, reduxForm} from "redux-form";
import classes from "./UpdateReport.module.css"

class UpdateReport extends React.Component {
    onSubmit = (formData) => {
        this.props.updateReport(formData.amountSpent, formData.descriptionsOfExpenses, this.props.report.id);
    }
    render() {
        return (
            <div>
                <div className={classes.updateReportText}>
                    <h2>Обновить отчёт</h2>
                </div>
                <UpdateReportReduxForm {...this.props} onSubmit={this.onSubmit}></UpdateReportReduxForm>
            </div>
        )
    }
}

const UpdateReportForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.updateReportForm}>
            <div className={classes.updateAmountSpentReport}>
                <label>Сумма траты</label>
                <Field placeholder={props.report.amountSpent} type="number" name="amountSpent" component="input"></Field>
            </div>
            <div className={classes.updateDescriptionsOfExpensesReport}>
                <label>Описания траты</label>
                <Field placeholder={props.report.descriptionsOfExpenses} name="descriptionsOfExpenses" component="textarea"></Field>
            </div>
            <div className={classes.updateReportButton}>
                <button type="reset">
                    Обновить
                </button>
            </div>
        </form>
    )
}

const UpdateReportReduxForm = reduxForm({
    form: "updateReport"
})(UpdateReportForm);

export default UpdateReport;